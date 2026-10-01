import { cn } from "@/app/lib/utils"
import { formatDiffPercent } from "@/lib/stocks"

type DiffPillProps = {
  diffPercent: number
}

export default function DiffPill({ diffPercent }: DiffPillProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 font-mono text-xs font-medium tabular-nums",
        diffPercent > 0
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
          : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
      )}
    >
      {formatDiffPercent(diffPercent)}
    </span>
  )
}
