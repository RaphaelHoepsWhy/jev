import ToneDemo from "@/components/ToneDemo"
import UseCase from "@/components/UseCase"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-16 p-6 font-sans">
      <UseCase title="Pick colors matching user input">
        <ToneDemo />
      </UseCase>
    </main>
  )
}
