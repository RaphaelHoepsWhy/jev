"use client"

import Image from "next/image"
import { useRef, type PointerEvent } from "react"
import { cn } from "@/app/lib/utils"
import AvailabilityBadge from "@/components/AvailabilityBadge"
import SpecIcon from "@/components/SpecIcon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  formatRobotSpec,
  ROBOT_SPEC_LABELS,
  ROBOT_SPECS,
  type Robot,
  type RobotEvent,
  type RobotId,
} from "@/lib/robots"

// shorter hovers are the cursor passing by
const MIN_HOVER_MS = 600
// keeps the tooltip from flashing while the cursor scans across the grid
const TOOLTIP_DELAY_MS = 200

type RobotCardProps = {
  robot: Robot & { id: RobotId }
  isHighlighted: boolean
  onEvent: (event: RobotEvent) => void
}

export default function RobotCard({
  robot,
  isHighlighted,
  onEvent,
}: RobotCardProps) {
  const hoverStartRef = useRef<number>(null)

  function startHover(event: PointerEvent) {
    if (event.pointerType !== "mouse") return
    hoverStartRef.current = performance.now()
  }

  function endHover() {
    const hoverStart = hoverStartRef.current
    hoverStartRef.current = null
    if (hoverStart === null) return

    const hoverMs = performance.now() - hoverStart
    if (hoverMs < MIN_HOVER_MS) return
    onEvent({ type: "hover", robotId: robot.id, seconds: hoverMs / 1000 })
  }

  return (
    <Tooltip trackCursorAxis="both" disableHoverablePopup>
      <TooltipTrigger
        delay={TOOLTIP_DELAY_MS}
        closeDelay={0}
        onPointerEnter={startHover}
        onPointerLeave={endHover}
        render={
          <article
            className={cn(
              "flex flex-col overflow-hidden rounded-xl bg-white ring-2 ring-transparent transition-shadow duration-300 hover:shadow-md dark:bg-zinc-950",
              isHighlighted && "ring-blue-600 dark:ring-blue-500",
            )}
          />
        }
      >
        <div className="relative aspect-video overflow-hidden">
          <AvailabilityBadge
            availability={robot.availability}
            className="absolute top-4 left-4 z-10"
          />
          <Image
            src={robot.image}
            alt={robot.name}
            fill
            sizes="(min-width: 1024px) 256px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="m-5 flex flex-col gap-1">
          <div className="font-mono text-xs text-zinc-500">{robot.brand}</div>
          <div>{robot.name}</div>
          <div className="text-[10px] text-zinc-500">{robot.category}</div>
        </div>
      </TooltipTrigger>

      <TooltipContent
        side="right"
        align="start"
        sideOffset={16}
        className="w-60 max-w-none rounded-lg bg-white px-4 py-1 text-zinc-900 shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-800"
      >
        <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {ROBOT_SPECS.map((spec) => (
            <div key={spec} className="flex items-center gap-2 py-2">
              <SpecIcon spec={spec} />
              <dt className="text-[13px] text-zinc-500">
                {ROBOT_SPEC_LABELS[spec]}
              </dt>
              <dd className="ml-auto min-w-0 truncate text-[13px] font-bold">
                {formatRobotSpec(robot, spec)}
              </dd>
            </div>
          ))}
        </dl>
      </TooltipContent>
    </Tooltip>
  )
}
