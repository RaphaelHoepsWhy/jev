import type { NextRequest } from "next/server"
import { experimental_evaluate } from "ai"
import {
  formatDiffPercent,
  STOCKS,
  type StockRanking,
  type StockTicker,
} from "@/lib/stocks"

const MAX_SEARCH_LENGTH = 100

const INSTRUCTIONS = `This is what an investor is typing to search a stock list, e.g. "german", "AI" or "high performing". It may be incomplete and cut off mid-word, e.g. "germ" for "german". Read it as the most likely completed text. Does this stock match the search? Searches about performance, gains or losses refer to the change today.`

// One question per stock, so a single call ranks the whole list.
const questions = Object.fromEntries(
  STOCKS.map(({ ticker, name, sector, country, diffPercent }) => [
    ticker,
    {
      type: "boolean" as const,
      instructions: {
        task: INSTRUCTIONS,
        stock: {
          name,
          ticker,
          sector,
          country,
          changeToday: formatDiffPercent(diffPercent),
        },
      },
    },
  ]),
)

// Called while the user types, so the model is a fast evaluation model, not a language model.
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.trim() ?? ""
  if (!search || search.length > MAX_SEARCH_LENGTH) {
    return Response.json({ error: "Invalid search" }, { status: 400 })
  }

  const { answers } = await experimental_evaluate({
    model: "typesafe-ai/jev",
    state: search,
    questions,
    abortSignal: request.signal,
  })

  const ranking = Object.fromEntries(
    Object.entries(answers).map(([ticker, { probability }]) => [
      ticker as StockTicker,
      probability,
    ]),
  )

  return Response.json(ranking satisfies StockRanking)
}
