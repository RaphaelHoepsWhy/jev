import { cn } from "@/app/lib/utils"
import type { StockSort, StockSortKey } from "@/lib/stocks"

type SortableHeaderProps = {
  label: string
  sortKey: StockSortKey
  sort: StockSort
  // the match ranking overrides the column sort
  isLocked: boolean
  onSort: (sortKey: StockSortKey) => void
  className?: string
}

export default function SortableHeader({
  label,
  sortKey,
  sort,
  isLocked,
  onSort,
  className,
}: SortableHeaderProps) {
  const isActive = !isLocked && sort.key === sortKey

  function getAriaSort() {
    if (!isActive) return "none"
    if (sort.direction === "asc") return "ascending"
    return "descending"
  }

  return (
    <th aria-sort={getAriaSort()} className={cn("py-2 font-medium", className)}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        disabled={isLocked}
        className={cn(
          "inline-flex items-center gap-1 transition-colors enabled:hover:text-zinc-900 dark:enabled:hover:text-zinc-100",
          isActive && "text-zinc-900 dark:text-zinc-100",
        )}
      >
        {label}
        {isActive && (
          <span aria-hidden>{sort.direction === "asc" ? "↑" : "↓"}</span>
        )}
      </button>
    </th>
  )
}
