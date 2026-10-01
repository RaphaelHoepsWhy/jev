import { cn } from "@/app/lib/utils"
import type { Robot } from "@/lib/robots"

type AvailabilityBadgeProps = {
  availability: Robot["availability"]
  className?: string
}

export default function AvailabilityBadge({
  availability,
  className,
}: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1 rounded-xl border border-zinc-200 bg-white px-2 font-mono text-[10px] text-zinc-900 uppercase dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
        className,
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          availability === "In Stock" ? "bg-lime-400" : "bg-orange-400",
        )}
      />
      {availability}
    </div>
  )
}
