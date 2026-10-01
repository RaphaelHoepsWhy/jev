import type { RobotSpec } from "@/lib/robots"

type SpecIconProps = {
  spec: RobotSpec
}

function getSpecIconPaths(spec: RobotSpec) {
  switch (spec) {
    case "payload":
      return (
        <>
          <circle cx="12" cy="5" r="3" />
          <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
        </>
      )
    case "reach":
      return (
        <>
          <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
          <path d="m14.5 12.5 2-2" />
          <path d="m11.5 9.5 2-2" />
          <path d="m8.5 6.5 2-2" />
          <path d="m17.5 15.5 2-2" />
        </>
      )
    case "axes":
      return (
        <>
          <path d="M4 4v16h16" />
          <path d="m4 20 7-7" />
        </>
      )
    case "controller":
      return (
        <>
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
        </>
      )
  }
}

// Lucide icons, as on icrservices.com.
export default function SpecIcon({ spec }: SpecIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0 text-zinc-500"
    >
      {getSpecIconPaths(spec)}
    </svg>
  )
}
