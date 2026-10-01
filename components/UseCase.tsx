import type { ReactNode } from "react"

type UseCaseProps = {
  title: string
  description?: string
  children: ReactNode
}

export default function UseCase({
  title,
  description,
  children,
}: UseCaseProps) {
  return (
    <section className="flex flex-col items-center gap-6">
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
        <h2 className="text-4xl font-semibold">{title}</h2>
        {description && <p className="text-zinc-500">{description}</p>}
      </div>
      {children}
    </section>
  )
}
