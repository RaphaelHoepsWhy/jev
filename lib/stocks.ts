import stocks from "@/lib/stocks.json"

export type Stock = {
  ticker: string
  name: string
  sector: string
  country: string
  // change since the previous close
  diffPercent: number
}

// Curated stocks with dummy changes, then the largest listings from a Nasdaq screener snapshot.
export const STOCKS = stocks satisfies readonly Stock[]

export type StockTicker = Stock["ticker"]

// How well each stock matches a search, from 0 to 1.
export type StockRanking = Partial<Record<StockTicker, number>>

// below this, a stock is more likely no match than a match
const MIN_MATCH_PROBABILITY = 0.5

const diffFormat = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "exceptZero",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatDiffPercent(diffPercent: number) {
  return diffFormat.format(diffPercent / 100)
}

export type StockSortKey = "name" | "sector" | "country" | "diffPercent"

export type StockSort = {
  key: StockSortKey
  direction: "asc" | "desc"
}

function compareStocks(a: Stock, b: Stock, sort: StockSort) {
  const order = sort.direction === "asc" ? 1 : -1
  if (sort.key === "diffPercent") return (a.diffPercent - b.diffPercent) * order
  return a[sort.key].localeCompare(b[sort.key]) * order
}

// Only the matches while there is a ranking, all stocks otherwise.
export function filterStocks(ranking: StockRanking | null) {
  if (!ranking) return STOCKS
  return STOCKS.filter(
    ({ ticker }) => (ranking[ticker] ?? 0) >= MIN_MATCH_PROBABILITY,
  )
}

// Best match first while there is a ranking, by the chosen column otherwise.
export function sortStocks(
  stocks: readonly Stock[],
  ranking: StockRanking | null,
  sort: StockSort,
) {
  return [...stocks].sort((a, b) => {
    const rankDiff = (ranking?.[b.ticker] ?? 0) - (ranking?.[a.ticker] ?? 0)
    if (rankDiff !== 0) return rankDiff
    const sortDiff = compareStocks(a, b, sort)
    if (sortDiff !== 0) return sortDiff
    return a.name.localeCompare(b.name)
  })
}
