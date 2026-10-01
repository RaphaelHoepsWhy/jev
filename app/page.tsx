import RobotDemo from "@/components/RobotDemo"
import StockDemo from "@/components/StockDemo"
import ToneDemo from "@/components/ToneDemo"
import UseCase from "@/components/UseCase"

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-16 p-6 font-sans">
      <UseCase title="Pick colors matching user input">
        <ToneDemo />
      </UseCase>
      <UseCase title="Fast AI search in lists">
        <StockDemo />
      </UseCase>
      <UseCase
        title="Interpret user behavior"
        description="Hover over a card to display detail data for this robot. If you keep moving between two specific cards, this behavior is interpreted as an intent to compare those two items. The UI picks this up and offers the comparison."
      >
        <RobotDemo />
      </UseCase>
    </main>
  )
}
