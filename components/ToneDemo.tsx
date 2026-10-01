"use client"

import { useState } from "react"
import ToneShape from "@/components/ToneShape"
import useTone from "@/hooks/useTone"
import { TONE_SUGGESTION_COUNT } from "@/lib/tones"

export default function ToneDemo() {
  const [name, setName] = useState("")
  const { tones, guessTones } = useTone()

  function changeName(text: string) {
    setName(text)
    guessTones(text)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <ToneShape colors={tones[0]?.colors} className="w-64" />

      <input
        autoFocus
        value={name}
        onChange={(event) => changeName(event.target.value)}
        placeholder="movie collection name"
        aria-label="Tone"
        autoCorrect="off"
        spellCheck={false}
        className="w-full max-w-sm rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700"
      />

      <ol className="flex flex-col items-center gap-1 font-mono text-xs text-zinc-500">
        {Array.from({ length: TONE_SUGGESTION_COUNT }, (_, index) => {
          const tone = tones[index]
          const percentage = Math.round((tone?.probability ?? 0) * 100)
          return (
            <li key={index} className="h-4">
              {percentage > 0 && `${tone.tone} · ${percentage}%`}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
