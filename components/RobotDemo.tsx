"use client"

import { useState } from "react"
import { cn } from "@/app/lib/utils"
import RobotCard from "@/components/RobotCard"
import RobotCompare from "@/components/RobotCompare"
import useCompareIntent from "@/hooks/useCompareIntent"
import { ROBOTS, type RobotPair } from "@/lib/robots"

// below this, browsing two robots does not count as comparing them
const MIN_PROBABILITY = 0.5

export default function RobotDemo() {
  const [comparedPair, setComparedPair] = useState<RobotPair | null>(null)
  const { intent, recordEvent, resetIntent } = useCompareIntent()

  const suggestedPair =
    intent && intent.probability >= MIN_PROBABILITY ? intent.pair : null

  function closeCompare() {
    setComparedPair(null)
    resetIntent()
  }

  if (comparedPair) {
    return (
      <div className="w-full max-w-5xl rounded-2xl bg-stone-100 p-4 sm:p-6 dark:bg-zinc-900">
        <RobotCompare pair={comparedPair} onBack={closeCompare} />
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <p className="h-4 font-mono text-xs text-zinc-500">
        {`compare intent · ${Math.round((intent?.probability ?? 0) * 100)}%`}
      </p>

      <div className="grid w-full grid-cols-1 items-start gap-4 rounded-2xl bg-stone-100 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 dark:bg-zinc-900">
        {ROBOTS.map((robot) => (
          <RobotCard
            key={robot.id}
            robot={robot}
            isHighlighted={suggestedPair?.includes(robot.id) ?? false}
            onEvent={recordEvent}
          />
        ))}
      </div>

      <div
        inert={!suggestedPair}
        className={cn(
          "sticky bottom-6 transition duration-300",
          suggestedPair ? "opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setComparedPair(suggestedPair)}
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-700"
        >
          Compare
        </button>
      </div>
    </div>
  )
}
