import { useRef, useState } from "react"
import type { ToneSuggestion } from "@/lib/tones"

const MIN_NAME_LENGTH = 3
// below this, a guess (often from a half-typed word) keeps the previous tones
const MIN_PROBABILITY = 0.6

const toneRequests = new Map<string, Promise<ToneSuggestion[]>>()

// Shares one request per name, so retyping a name never asks twice.
function fetchTone(name: string) {
  const cached = toneRequests.get(name)
  if (cached) return cached

  const request = fetch(`/api/tone?name=${encodeURIComponent(name)}`).then(
    async (response) => {
      if (!response.ok)
        throw new Error(`Tone request failed (${response.status})`)
      return (await response.json()) as ToneSuggestion[]
    },
  )
  request.catch(() => toneRequests.delete(name))
  toneRequests.set(name, request)
  return request
}

// Guesses the most likely tones of a name while it is typed, best first.
export default function useTone() {
  const [tones, setTones] = useState<ToneSuggestion[]>([])
  // order of the guesses, so a slow older guess never replaces a newer one
  const lastRequestRef = useRef(0)
  const renderedRequestRef = useRef(0)

  function guessTones(name: string) {
    const request = ++lastRequestRef.current
    const trimmedName = name.trim()

    if (trimmedName.length < MIN_NAME_LENGTH) {
      renderedRequestRef.current = request
      setTones([])
      return
    }

    fetchTone(trimmedName)
      .then((suggestions) => {
        if (request < renderedRequestRef.current) return

        // a newer guess wins even when it is not confident enough to show
        renderedRequestRef.current = request
        if ((suggestions[0]?.probability ?? 0) >= MIN_PROBABILITY)
          setTones(suggestions)
      })
      .catch(console.error)
  }

  return { tones, guessTones }
}
