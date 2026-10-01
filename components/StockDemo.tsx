"use client"

import { useState } from "react"
import { cn } from "@/app/lib/utils"
import Pagination from "@/components/Pagination"
import StockTable from "@/components/StockTable"
import useStockRanking from "@/hooks/useStockRanking"
import {
  filterStocks,
  sortStocks,
  STOCKS,
  type StockSort,
  type StockSortKey,
} from "@/lib/stocks"

const PAGE_SIZE = 10

export default function StockDemo() {
  const [search, setSearch] = useState("")
  const [pageIndex, setPageIndex] = useState(0)
  const [sort, setSort] = useState<StockSort>({ key: "name", direction: "asc" })
  const { ranking, isRanking, rankStocks } = useStockRanking()

  const stocks = sortStocks(filterStocks(ranking), ranking, sort)
  const pageCount = Math.ceil(stocks.length / PAGE_SIZE)
  const pageStocks = stocks.slice(
    pageIndex * PAGE_SIZE,
    (pageIndex + 1) * PAGE_SIZE,
  )

  function changeSearch(text: string) {
    setSearch(text)
    setPageIndex(0)
    rankStocks(text)
  }

  function changeSort(key: StockSortKey) {
    const isSameKey = sort.key === key
    setSort({
      key,
      direction: isSameKey && sort.direction === "asc" ? "desc" : "asc",
    })
    setPageIndex(0)
  }

  return (
    <div className="flex w-4xl max-w-full flex-col items-center gap-4">
      <input
        value={search}
        onChange={(event) => changeSearch(event.target.value)}
        placeholder='try "german", "AI" or "high performing"'
        aria-label="Search stocks"
        autoCorrect="off"
        spellCheck={false}
        className="w-full max-w-sm rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700"
      />

      <div className="flex w-full flex-col gap-2">
        <p className="h-4 font-mono text-xs text-zinc-500">
          {ranking
            ? `${stocks.length} of ${STOCKS.length} match`
            : `${STOCKS.length} stocks`}
        </p>
        <div
          className={cn(
            "overflow-x-auto transition-opacity",
            isRanking && "opacity-50",
          )}
        >
          <StockTable
            stocks={pageStocks}
            ranking={ranking}
            sort={sort}
            onSort={changeSort}
          />
        </div>
      </div>

      <Pagination
        pageIndex={pageIndex}
        pageCount={pageCount}
        onChange={setPageIndex}
      />
    </div>
  )
}
