import type { ReactNode } from "react"

export interface FlexColProps {
  title: string
  subtitle: string
  error?: boolean
  errorMessage?: string
  children: ReactNode
}

export function FlexCol({
  title,
  subtitle,
  error,
  errorMessage,
  children
}: FlexColProps) {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2>{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      {error ? (
        <p className="text-muted whitespace-pre-line font-light">
          {errorMessage}
        </p>
      ) : (
        children
      )}
    </div>
  )
}
