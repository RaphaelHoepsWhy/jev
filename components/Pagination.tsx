import { cn } from "@/app/lib/utils"

type PaginationProps = {
  pageIndex: number
  pageCount: number
  onChange: (pageIndex: number) => void
}

const BUTTON_CLASS_NAME =
  "min-w-8 rounded-md px-2 py-1 font-mono text-xs tabular-nums transition-colors enabled:hover:bg-zinc-100 disabled:opacity-30 dark:enabled:hover:bg-zinc-800"

export default function Pagination({
  pageIndex,
  pageCount,
  onChange,
}: PaginationProps) {
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

      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index)}
          aria-current={index === pageIndex ? "page" : undefined}
          className={cn(
            BUTTON_CLASS_NAME,
            index === pageIndex
              ? "bg-zinc-900 text-white enabled:hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:enabled:hover:bg-zinc-100"
              : "text-zinc-500",
          )}
        >
          {index + 1}
        </button>
      ))}

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
