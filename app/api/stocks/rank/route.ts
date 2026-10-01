import type { NextRequest } from "next/server"
import { experimental_evaluate } from "ai"
import {
  formatDiffPercent,
  STOCKS,
  type Stock,
  type StockRanking,
} from "@/lib/stocks"

const MAX_SEARCH_LENGTH = 100
// parallel calls answer faster than one large call and stay below jev's input limit
const BATCH_SIZE = 250

const INSTRUCTIONS = `This is what an investor is typing to search a stock list, e.g. "german", "AI" or "high performing". It may be incomplete and cut off mid-word, e.g. "germ" for "german". Read it as the most likely completed text. Does this stock match the search? Searches about performance, gains or losses refer to the change today.`

function getQuestion({ ticker, name, sector, country, diffPercent }: Stock) {
  return {
    type: "boolean" as const,
    instructions: {
      name,
      ticker,
      sector,
      country,
      changeToday: formatDiffPercent(diffPercent),
    },
  }
}

// One question per stock. The task lives in the shared state, so each question only carries its stock.
const questionBatches = Array.from(
  { length: Math.ceil(STOCKS.length / BATCH_SIZE) },
  (_, index) =>
    Object.fromEntries(
      STOCKS.slice(index * BATCH_SIZE, (index + 1) * BATCH_SIZE).map(
        (stock) => [stock.ticker, getQuestion(stock)],
      ),
    ),
)

// Called while the user types, so the model is a fast evaluation model, not a language model.
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.trim() ?? ""
  if (!search || search.length > MAX_SEARCH_LENGTH) {
    return Response.json({ error: "Invalid search" }, { status: 400 })
  }

  const results = await Promise.all(
    questionBatches.map((questions) =>
      experimental_evaluate({
        model: "typesafe-ai/jev",
        state: { task: INSTRUCTIONS, search },
        questions,
        abortSignal: request.signal,
      }),
    ),
  )

  const ranking = Object.fromEntries(
    results.flatMap(({ answers }) =>
      Object.entries(answers).map(([ticker, { probability }]) => [
        ticker,
        probability,
      ]),
    ),
  )

  return Response.json(ranking satisfies StockRanking)
}
