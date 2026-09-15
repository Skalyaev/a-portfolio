import type { ReactNode } from "react"

export interface FlexColProps {
  title: string
  subtitle: string
  errorMessage?: string
  children: ReactNode
}

/**
 * Page column with a title and subtitle, rendering the error message instead of its children when set.
 *
 * @param props - Title, subtitle, optional error message and content.
 * @returns The titled column.
 */
export function FlexCol({
  title,
  subtitle,
  errorMessage,
  children
}: FlexColProps) {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h2>{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      {errorMessage ? (
        <p className="text-muted whitespace-pre-line font-light">
          {errorMessage}
        </p>
      ) : (
        children
      )}
    </div>
  )
}
