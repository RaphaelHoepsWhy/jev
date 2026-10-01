"use client"

import { useState } from "react"
import ToneShape from "@/components/ToneShape"
import useTone from "@/hooks/useTone"

export default function ToneDemo() {
  const [name, setName] = useState("")
  const { tone, guessTone } = useTone()

  function changeName(text: string) {
    setName(text)
    guessTone(text)
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-10">
      <ToneShape colors={tone?.colors} className="w-64" />

      <div className="w-full">
        <input
          autoFocus
          value={name}
          onChange={(event) => changeName(event.target.value)}
          placeholder="e.g. scary halloween"
          aria-label="Tone"
          autoCorrect="off"
          spellCheck={false}
          className="w-full bg-transparent text-center text-2xl font-medium outline-none placeholder:text-zinc-400"
        />
        <div className="h-px w-full bg-zinc-300 dark:bg-zinc-700" />
        <p className="mt-3 h-5 text-center font-mono text-xs text-zinc-500">
          {tone && `${tone.tone} · ${Math.round(tone.probability * 100)}%`}
        </p>
      </div>
    </div>
  )
}
