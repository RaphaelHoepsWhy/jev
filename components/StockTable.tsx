import DiffPill from "@/components/DiffPill"
import SortableHeader from "@/components/SortableHeader"
import type {
  Stock,
  StockRanking,
  StockSort,
  StockSortKey,
  StockTicker,
} from "@/lib/stocks"

type StockTableProps = {
  stocks: readonly (Stock & { ticker: StockTicker })[]
  ranking: StockRanking | null
  sort: StockSort
  onSort: (sortKey: StockSortKey) => void
}

export default function StockTable({
  stocks,
  ranking,
  sort,
  onSort,
}: StockTableProps) {
  const headerProps = { sort, isLocked: ranking !== null, onSort }

  return (
    <table className="w-full min-w-2xl table-fixed text-left text-sm">
      <thead className="text-xs text-zinc-500">
        <tr className="border-b border-zinc-200 dark:border-zinc-800">
          <SortableHeader
            label="Company"
            sortKey="name"
            className="pr-4"
            {...headerProps}
          />
          <SortableHeader
            label="Sector"
            sortKey="sector"
            className="w-52 pr-4"
            {...headerProps}
          />
          <SortableHeader
            label="Country"
            sortKey="country"
            className="w-36 pr-4"
            {...headerProps}
          />
          <SortableHeader
            label="Diff in %"
            sortKey="diffPercent"
            className="w-24 pr-4 text-right"
            {...headerProps}
          />
          <th
            aria-sort={ranking ? "descending" : undefined}
            className="w-16 py-2 text-right font-medium text-zinc-900 dark:text-zinc-100"
          >
            {ranking && (
              <>
                Match <span aria-hidden>↓</span>
              </>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr
            key={stock.ticker}
            className="border-b border-zinc-100 dark:border-zinc-900"
          >
            <td className="py-2 pr-4">
              <span className="font-medium">{stock.name}</span>
              <span className="ml-2 font-mono text-xs text-zinc-400">
                {stock.ticker}
              </span>
            </td>
            <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">
              {stock.sector}
            </td>
            <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">
              {stock.country}
            </td>
            <td className="py-2 pr-4 text-right">
              <DiffPill diffPercent={stock.diffPercent} />
            </td>
            <td className="py-2 text-right font-mono text-xs text-zinc-500 tabular-nums">
              {ranking && `${Math.round((ranking[stock.ticker] ?? 0) * 100)}%`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
