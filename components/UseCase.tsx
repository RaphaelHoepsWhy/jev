import type { ReactNode } from "react"

type UseCaseProps = {
  title: string
  children: ReactNode
}

export default function UseCase({ title, children }: UseCaseProps) {
  return (
    <section className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}
