import { cn } from "@/app/lib/utils"

type PaginationProps = {
  pageIndex: number
  pageCount: number
  onChange: (pageIndex: number) => void
}

// pages shown on each side of the current one
const SIBLING_COUNT = 1

const BUTTON_CLASS_NAME =
  "min-w-8 rounded-md px-2 py-1 font-mono text-xs tabular-nums transition-colors enabled:hover:bg-zinc-100 disabled:opacity-30 dark:enabled:hover:bg-zinc-800"

// The first, the last and the pages around the current one, with gaps in between.
function getPageItems(pageIndex: number, pageCount: number) {
  const items: (number | "gap")[] = []
  for (let index = 0; index < pageCount; index++) {
    const isEdge = index === 0 || index === pageCount - 1
    const isNear = Math.abs(index - pageIndex) <= SIBLING_COUNT
    if (isEdge || isNear) {
      items.push(index)
      continue
    }
    if (items.at(-1) !== "gap") items.push("gap")
  }
  return items
}

export default function Pagination({
  pageIndex,
  pageCount,
  onChange,
}: PaginationProps) {
  if (pageCount <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(pageIndex - 1)}
        disabled={pageIndex === 0}
        aria-label="Previous page"
        className={BUTTON_CLASS_NAME}
      >
        ‹
      </button>

      {getPageItems(pageIndex, pageCount).map((item, itemIndex) => {
        if (item === "gap") {
          return (
            <span
              key={`gap-${itemIndex}`}
              className="min-w-8 text-center font-mono text-xs text-zinc-400"
            >
              …
            </span>
          )
        }

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === pageIndex ? "page" : undefined}
            className={cn(
              BUTTON_CLASS_NAME,
              item === pageIndex
                ? "bg-zinc-900 text-white enabled:hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:enabled:hover:bg-zinc-100"
                : "text-zinc-500",
            )}
          >
            {item + 1}
          </button>
        )
      })}

      <button
        type="button"
        onClick={() => onChange(pageIndex + 1)}
        disabled={pageIndex === pageCount - 1}
        aria-label="Next page"
        className={BUTTON_CLASS_NAME}
      >
        ›
      </button>
    </nav>
  )
}
