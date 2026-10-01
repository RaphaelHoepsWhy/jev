import type { NextRequest } from "next/server"
import { experimental_evaluate } from "ai"
import { TONES, type Tone, type ToneSuggestion } from "@/lib/tones"

const MAX_NAME_LENGTH = 100

const INSTRUCTIONS = `This is a tone a user is typing for a movie/series genre or collection, e.g. "scary halloween". It may be incomplete and cut off mid-word, e.g. "horr" for "horror" or "Christm" for "Christmas". Read it as the most likely completed text. Which mood or theme does it evoke?`

const criteria = Object.fromEntries(
  Object.entries(TONES).map(([tone, { description }]) => [tone, description]),
) as Record<Tone, string>

// Called while the user types, so the model is a fast evaluation model, not a language model.
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name")?.trim() ?? ""
  if (!name || name.length > MAX_NAME_LENGTH) {
    return Response.json({ error: "Invalid name" }, { status: 400 })
  }

  const { answers } = await experimental_evaluate({
    model: "typesafe-ai/jev",
    state: name,
    questions: {
      tone: { type: "choice", instructions: INSTRUCTIONS, criteria },
    },
    abortSignal: request.signal,
  })
  const { choice, probabilities } = answers.tone

  return Response.json({
    tone: choice,
    colors: TONES[choice].colors,
    probability: probabilities?.[choice] ?? 0,
  } satisfies ToneSuggestion)
}
