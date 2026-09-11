import type { ReactNode } from "react"

export interface ProfileCardProps {
  icon: ReactNode
  title: string
  href: string
  viewProfileLabel: string
  description: string
  left?: ReactNode
  right?: ReactNode
}
export function ProfileCard({
  icon,
  title,
  href,
  viewProfileLabel,
  description,
  left,
  right
}: ProfileCardProps) {
  return (
    <div className="flex flex-col gap-3 border-2 border-border p-4">
      <div className="flex items-start justify-between gap-2">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2">
          {icon}
          <h6 className="group-hover:underline group-focus-visible:underline">
            {title}
          </h6>
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xs text-muted hover:text-foreground">
          {viewProfileLabel}
        </a>
      </div>
      <p className="text-xs text-muted">{description}</p>

      {(left || right) && (
        <div className="grid gap-4 lg:grid-cols-2">
          {left}
          {right}
        </div>
      )}
    </div>
  )
}
