import Image from "next/image"
import { cn } from "@/app/lib/utils"
import AvailabilityBadge from "@/components/AvailabilityBadge"
import SpecIcon from "@/components/SpecIcon"
import {
  formatRobotSpec,
  getRobot,
  ROBOT_SPEC_LABELS,
  ROBOT_SPECS,
  type RobotPair,
} from "@/lib/robots"

type RobotCompareProps = {
  pair: RobotPair
  onBack: () => void
}

export default function RobotCompare({ pair, onBack }: RobotCompareProps) {
  const robots = pair.map(getRobot)

  return (
    <div className="flex flex-col gap-6 transition-opacity duration-300 starting:opacity-0">
      <button
        type="button"
        onClick={onBack}
        className="w-fit text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← All robots
      </button>

      <table className="w-full table-fixed text-left text-[13px]">
        <thead>
          <tr>
            <th className="w-32" />
            {robots.map((robot) => (
              <th key={robot.id} className="px-3 pb-4 align-top font-normal">
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={robot.image}
                    alt={robot.name}
                    fill
                    sizes="(min-width: 1024px) 400px, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="font-mono text-xs text-zinc-500">
                  {robot.brand}
                </div>
                <div className="text-base">{robot.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          <tr>
            <th className="py-3 font-normal text-zinc-500">Availability</th>
            {robots.map((robot) => (
              <td key={robot.id} className="px-3 py-3">
                <AvailabilityBadge availability={robot.availability} />
              </td>
            ))}
          </tr>
          {ROBOT_SPECS.map((spec) => {
            const values = robots.map((robot) => formatRobotSpec(robot, spec))
            const isSame = values[0] === values[1]
            return (
              <tr key={spec}>
                <th className="py-3 font-normal text-zinc-500">
                  <span className="flex items-center gap-2">
                    <SpecIcon spec={spec} />
                    {ROBOT_SPEC_LABELS[spec]}
                  </span>
                </th>
                {values.map((value, index) => (
                  <td
                    key={robots[index].id}
                    className={cn(
                      "px-3 py-3",
                      isSame ? "text-zinc-400" : "font-bold",
                    )}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
