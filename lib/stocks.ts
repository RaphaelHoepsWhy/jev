export type Stock = {
  ticker: string
  name: string
  sector: string
  country: string
  // change since the previous close
  diffPercent: number
}

// Dummy market data.
export const STOCKS = [
  {
    ticker: "SAP",
    name: "SAP",
    sector: "Software",
    country: "Germany",
    diffPercent: 2.4,
  },
  {
    ticker: "SIE",
    name: "Siemens",
    sector: "Industrials",
    country: "Germany",
    diffPercent: 1.1,
  },
  {
    ticker: "ALV",
    name: "Allianz",
    sector: "Insurance",
    country: "Germany",
    diffPercent: -0.6,
  },
  {
    ticker: "DTE",
    name: "Deutsche Telekom",
    sector: "Telecommunications",
    country: "Germany",
    diffPercent: 0.4,
  },
  {
    ticker: "BAS",
    name: "BASF",
    sector: "Chemicals",
    country: "Germany",
    diffPercent: -2.3,
  },
  {
    ticker: "BMW",
    name: "BMW",
    sector: "Automotive",
    country: "Germany",
    diffPercent: -1.8,
  },
  {
    ticker: "MBG",
    name: "Mercedes-Benz Group",
    sector: "Automotive",
    country: "Germany",
    diffPercent: -2.9,
  },
  {
    ticker: "VOW3",
    name: "Volkswagen",
    sector: "Automotive",
    country: "Germany",
    diffPercent: -3.4,
  },
  {
    ticker: "BAYN",
    name: "Bayer",
    sector: "Pharmaceuticals",
    country: "Germany",
    diffPercent: -4.7,
  },
  {
    ticker: "IFX",
    name: "Infineon Technologies",
    sector: "Semiconductors",
    country: "Germany",
    diffPercent: 3.8,
  },
  {
    ticker: "DBK",
    name: "Deutsche Bank",
    sector: "Banking",
    country: "Germany",
    diffPercent: 1.6,
  },
  {
    ticker: "ADS",
    name: "adidas",
    sector: "Apparel",
    country: "Germany",
    diffPercent: -1.2,
  },
  {
    ticker: "RHM",
    name: "Rheinmetall",
    sector: "Defense",
    country: "Germany",
    diffPercent: 6.3,
  },
  {
    ticker: "MUV2",
    name: "Munich Re",
    sector: "Insurance",
    country: "Germany",
    diffPercent: 0.8,
  },
  {
    ticker: "DHL",
    name: "DHL Group",
    sector: "Logistics",
    country: "Germany",
    diffPercent: -0.9,
  },
  {
    ticker: "EOAN",
    name: "E.ON",
    sector: "Utilities",
    country: "Germany",
    diffPercent: 0.3,
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    sector: "Semiconductors",
    country: "United States",
    diffPercent: 7.9,
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    sector: "Software",
    country: "United States",
    diffPercent: 2.1,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    sector: "Internet Services",
    country: "United States",
    diffPercent: 1.4,
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    sector: "Social Media",
    country: "United States",
    diffPercent: -1.5,
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    sector: "Semiconductors",
    country: "United States",
    diffPercent: 4.6,
  },
  {
    ticker: "PLTR",
    name: "Palantir Technologies",
    sector: "Software",
    country: "United States",
    diffPercent: 5.2,
  },
  {
    ticker: "AVGO",
    name: "Broadcom",
    sector: "Semiconductors",
    country: "United States",
    diffPercent: 3.1,
  },
  {
    ticker: "AI",
    name: "C3.ai",
    sector: "Software",
    country: "United States",
    diffPercent: -5.8,
  },
  {
    ticker: "AAPL",
    name: "Apple",
    sector: "Consumer Electronics",
    country: "United States",
    diffPercent: -0.7,
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    sector: "E-Commerce",
    country: "United States",
    diffPercent: 0.9,
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    sector: "Automotive",
    country: "United States",
    diffPercent: -6.1,
  },
  {
    ticker: "JPM",
    name: "JPMorgan Chase",
    sector: "Banking",
    country: "United States",
    diffPercent: 0.5,
  },
  {
    ticker: "KO",
    name: "Coca-Cola",
    sector: "Beverages",
    country: "United States",
    diffPercent: 0.2,
  },
  {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    sector: "Pharmaceuticals",
    country: "United States",
    diffPercent: -0.4,
  },
  {
    ticker: "XOM",
    name: "ExxonMobil",
    sector: "Oil & Gas",
    country: "United States",
    diffPercent: -2.6,
  },
  {
    ticker: "WMT",
    name: "Walmart",
    sector: "Retail",
    country: "United States",
    diffPercent: 1.3,
  },
  {
    ticker: "V",
    name: "Visa",
    sector: "Payments",
    country: "United States",
    diffPercent: 0.7,
  },
  {
    ticker: "PFE",
    name: "Pfizer",
    sector: "Pharmaceuticals",
    country: "United States",
    diffPercent: -3.1,
  },
  {
    ticker: "MCD",
    name: "McDonald's",
    sector: "Restaurants",
    country: "United States",
    diffPercent: -0.3,
  },
  {
    ticker: "NKE",
    name: "Nike",
    sector: "Apparel",
    country: "United States",
    diffPercent: -4.2,
  },
  {
    ticker: "NFLX",
    name: "Netflix",
    sector: "Streaming",
    country: "United States",
    diffPercent: 2.8,
  },
  {
    ticker: "TSM",
    name: "TSMC",
    sector: "Semiconductors",
    country: "Taiwan",
    diffPercent: 4.1,
  },
  {
    ticker: "ASML",
    name: "ASML Holding",
    sector: "Semiconductor Equipment",
    country: "Netherlands",
    diffPercent: 3.5,
  },
  {
    ticker: "ARM",
    name: "Arm Holdings",
    sector: "Semiconductors",
    country: "United Kingdom",
    diffPercent: 5.7,
  },
  {
    ticker: "SHEL",
    name: "Shell",
    sector: "Oil & Gas",
    country: "United Kingdom",
    diffPercent: -1.9,
  },
  {
    ticker: "ULVR",
    name: "Unilever",
    sector: "Consumer Goods",
    country: "United Kingdom",
    diffPercent: 0.1,
  },
  {
    ticker: "NESN",
    name: "Nestlé",
    sector: "Food",
    country: "Switzerland",
    diffPercent: -0.8,
  },
  {
    ticker: "NOVN",
    name: "Novartis",
    sector: "Pharmaceuticals",
    country: "Switzerland",
    diffPercent: 1.0,
  },
  {
    ticker: "ROG",
    name: "Roche",
    sector: "Pharmaceuticals",
    country: "Switzerland",
    diffPercent: -1.4,
  },
  {
    ticker: "MC",
    name: "LVMH",
    sector: "Luxury Goods",
    country: "France",
    diffPercent: -2.2,
  },
  {
    ticker: "TTE",
    name: "TotalEnergies",
    sector: "Oil & Gas",
    country: "France",
    diffPercent: -1.1,
  },
  {
    ticker: "AIR",
    name: "Airbus",
    sector: "Aerospace",
    country: "Netherlands",
    diffPercent: 2.0,
  },
  {
    ticker: "NOVO-B",
    name: "Novo Nordisk",
    sector: "Pharmaceuticals",
    country: "Denmark",
    diffPercent: -5.1,
  },
  {
    ticker: "7203",
    name: "Toyota",
    sector: "Automotive",
    country: "Japan",
    diffPercent: 0.6,
  },
  {
    ticker: "6758",
    name: "Sony Group",
    sector: "Consumer Electronics",
    country: "Japan",
    diffPercent: 1.7,
  },
  {
    ticker: "005930",
    name: "Samsung Electronics",
    sector: "Semiconductors",
    country: "South Korea",
    diffPercent: 2.5,
  },
] as const satisfies readonly Stock[]

export type StockTicker = (typeof STOCKS)[number]["ticker"]

// How well each stock matches a search, from 0 to 1.
export type StockRanking = Partial<Record<StockTicker, number>>

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

// Best match first while there is a ranking, by the chosen column otherwise.
export function sortStocks(ranking: StockRanking | null, sort: StockSort) {
  return [...STOCKS].sort((a, b) => {
    const rankDiff = (ranking?.[b.ticker] ?? 0) - (ranking?.[a.ticker] ?? 0)
    if (rankDiff !== 0) return rankDiff
    const sortDiff = compareStocks(a, b, sort)
    if (sortDiff !== 0) return sortDiff
    return a.name.localeCompare(b.name)
  })
}
