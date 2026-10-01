import { experimental_evaluate } from "ai"
import {
  formatRobotSpec,
  getRobot,
  isRobotId,
  ROBOT_SPEC_LABELS,
  ROBOT_SPECS,
  ROBOTS,
  type CompareIntent,
  type RobotEvent,
  type RobotPair,
} from "@/lib/robots"

const MAX_EVENTS = 20
const MAX_HOVER_SECONDS = 600
const NO_COMPARISON = "none"

// const INSTRUCTIONS = `A buyer is browsing a grid of used industrial robots. Each card shows the robot's name and image, hovering a card shows its specs in a tooltip. The activity lists what the buyer did, oldest first, so the latest actions matter most. Is the buyer weighing two specific robots against each other, and which two? Comparing looks like returning to the same two robots after looking at each. Looking at two robots once each is not comparing yet, and neither is looking at a single robot or scanning across many.`

const INSTRUCTIONS = `A buyer is hovering a grid of items, each identified by a robotId. While they are hovering, they see specifig data for the item.Look at the recorded hover events. Is the buyer comparing two specific items? An indicator for comparing is that they keep hovering on two specific items for a significant amount of time. Decide if they are currently comparing and which of the items they are currently comparing.`

const robots = ROBOTS.map((robot) => ({
  name: robot.name,
  availability: robot.availability,
  ...Object.fromEntries(
    ROBOT_SPECS.map((spec) => [
      ROBOT_SPEC_LABELS[spec],
      formatRobotSpec(robot, spec),
    ]),
  ),
}))

const pairs = new Map<string, RobotPair>(
  ROBOTS.flatMap((a, index) =>
    ROBOTS.slice(index + 1).map(
      (b) => [`${a.id}|${b.id}`, [a.id, b.id]] as const,
    ),
  ),
)

const criteria: Record<string, string> = {
  [NO_COMPARISON]:
    "not comparing two specific robots, just browsing or looking at one",
  ...Object.fromEntries(
    [...pairs].map(([key, [a, b]]) => [
      key,
      `comparing ${getRobot(a).name} with ${getRobot(b).name}`,
    ]),
  ),
}

function parseEvent(event: unknown): RobotEvent | null {
  if (typeof event !== "object" || event === null) return null
  const { type, robotId, seconds } = event as Record<string, unknown>
  if (!isRobotId(robotId)) return null
  if (type !== "hover" || typeof seconds !== "number") return null
  if (!(seconds > 0 && seconds <= MAX_HOVER_SECONDS)) return null
  return { type, robotId, seconds }
}

function describeEvent(event: RobotEvent) {
  const { name } = getRobot(event.robotId)
  return `looked at ${name} for ${event.seconds.toFixed(1)}s`
}

// Called on every interaction, so the model is a fast evaluation model, not a language model.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const rawEvents: unknown[] = Array.isArray(body?.events) ? body.events : []
  const events = rawEvents.slice(-MAX_EVENTS).map(parseEvent)
  if (events.length === 0 || events.includes(null)) {
    return Response.json({ error: "Invalid events" }, { status: 400 })
  }

  console.log(events)
  const { answers } = await experimental_evaluate({
    model: "typesafe-ai/jev",
    state: {
      robots,
      activity: (events as RobotEvent[]).map(describeEvent),
    },
    questions: {
      comparison: { type: "choice", instructions: INSTRUCTIONS, criteria },
    },
    abortSignal: request.signal,
  })
  const { choice, probabilities } = answers.comparison

  return Response.json(getCompareIntent(choice, probabilities))
}

// The most likely pair, even when "none" wins, so the client picks the threshold.
function getCompareIntent(
  choice: string,
  probabilities: Record<string, number> | undefined,
): CompareIntent | null {
  if (!probabilities) {
    const pair = pairs.get(choice)
    return pair ? { pair, probability: 1 } : null
  }

  const best = Object.entries(probabilities)
    .filter(([key]) => pairs.has(key))
    .sort(([, a], [, b]) => b - a)[0]
  if (!best) return null

  const [pairKey, probability] = best
  return { pair: pairs.get(pairKey)!, probability }
}
