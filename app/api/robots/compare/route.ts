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

const INSTRUCTIONS = `A buyer is browsing used industrial robots. The activity lists the robots they looked at, oldest first. Are they comparing two robots right now? Comparing means going back and forth between the same two. One look at each, a single robot or scanning many is not comparing.`

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
