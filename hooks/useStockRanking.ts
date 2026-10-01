import { useRef, useState } from "react"
import type { StockRanking } from "@/lib/stocks"

const MIN_SEARCH_LENGTH = 2
const DEBOUNCE_MS = 300

const rankings = new Map<string, StockRanking>()

async function fetchRanking(search: string, signal: AbortSignal) {
  const response = await fetch(
    `/api/stocks/rank?search=${encodeURIComponent(search)}`,
    { signal },
  )
  if (!response.ok)
    throw new Error(`Ranking request failed (${response.status})`)
  return (await response.json()) as StockRanking
}

// Ranks the stocks by how well they match a search while it is typed.
export default function useStockRanking() {
  const [ranking, setRanking] = useState<StockRanking | null>(null)
  const [isRanking, setIsRanking] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const requestRef = useRef<AbortController>(null)

  function showRanking(nextRanking: StockRanking | null) {
    setRanking(nextRanking)
    setIsRanking(false)
  }

  async function requestRanking(search: string) {
    const request = new AbortController()
    requestRef.current = request

    try {
      const nextRanking = await fetchRanking(search, request.signal)
      rankings.set(search, nextRanking)
      showRanking(nextRanking)
    } catch (error) {
      if (request.signal.aborted) return
      console.error(error)
      setIsRanking(false)
    }
  }

  function rankStocks(search: string) {
    clearTimeout(debounceRef.current)
    requestRef.current?.abort()
    const trimmedSearch = search.trim()

    if (trimmedSearch.length < MIN_SEARCH_LENGTH) {
      showRanking(null)
      return
    }

    const cached = rankings.get(trimmedSearch)
    if (cached) {
      showRanking(cached)
      return
    }

    setIsRanking(true)
    debounceRef.current = setTimeout(
      () => requestRanking(trimmedSearch),
      DEBOUNCE_MS,
    )
  }

  return { ranking, isRanking, rankStocks }
}
