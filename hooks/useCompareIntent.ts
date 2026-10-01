import { useRef, useState } from "react"
import type { CompareIntent, RobotEvent } from "@/lib/robots"

const MAX_EVENTS = 20
const DEBOUNCE_MS = 250

async function fetchIntent(events: RobotEvent[], signal: AbortSignal) {
  const response = await fetch("/api/robots/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ events }),
    signal,
  })
  if (!response.ok)
    throw new Error(`Compare request failed (${response.status})`)
  return (await response.json()) as CompareIntent | null
}

// Guesses from the interactions on the grid whether the user compares two robots.
export default function useCompareIntent() {
  const [intent, setIntent] = useState<CompareIntent | null>(null)
  const eventsRef = useRef<RobotEvent[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const requestRef = useRef<AbortController>(null)

  async function requestIntent() {
    const request = new AbortController()
    requestRef.current = request

    try {
      setIntent(await fetchIntent(eventsRef.current, request.signal))
    } catch (error) {
      if (request.signal.aborted) return
      console.error(error)
    }
  }

  function cancelRequest() {
    clearTimeout(debounceRef.current)
    requestRef.current?.abort()
  }

  function recordEvent(event: RobotEvent) {
    cancelRequest()
    eventsRef.current = [...eventsRef.current, event].slice(-MAX_EVENTS)

    // a comparison needs two robots
    const robotIds = new Set(eventsRef.current.map(({ robotId }) => robotId))
    if (robotIds.size < 2) return

    debounceRef.current = setTimeout(requestIntent, DEBOUNCE_MS)
  }

  function resetIntent() {
    cancelRequest()
    eventsRef.current = []
    setIntent(null)
  }

  return { intent, recordEvent, resetIntent }
}
