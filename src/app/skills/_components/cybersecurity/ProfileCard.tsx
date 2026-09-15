import { Button } from "@/components/tag/Button"

import { useMatchHeight } from "@/lib/hooks/useMatchHeight"
import { cn } from "@/lib/utils/style"

import type { ReactNode } from "react"

export interface ProfileCardProps {
  icon: ReactNode
  title: string
  href: string
  viewProfileLabel: string
  description: string
  headerNote: string
  left: ReactNode
  right: ReactNode
  className?: string
}

/**
 * Displays a platform profile header and a two-column body.
 *
 * On large screens the right column is capped to the height of the left one.
 *
 * @param props - Header content and column contents.
 * @returns The profile card.
 */
export function ProfileCard({
  icon,
  title,
  href,
  viewProfileLabel,
  description,
  headerNote,
  left,
  right,
  className
}: ProfileCardProps) {
  const { ref: leftRef, height: matchedHeight } =
    useMatchHeight<HTMLDivElement>("(min-width: 1024px)")

  return (
    <div className={cn("flex flex-col gap-2 px-4", className)}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <h6>{title}</h6>
        </div>
        <Button
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xs text-muted hover:text-foreground">
          <span>{viewProfileLabel}</span>
        </Button>
        <span className="ml-auto flex shrink-0 items-center gap-2 text-2xs text-muted">
          {headerNote}
        </span>
      </div>
      <p className="text-xs text-muted">{description}</p>

      <div className="grid gap-3 lg:grid-cols-[minmax(22rem,1fr)_minmax(0,1.15fr)] mt-2">
        <div
          ref={leftRef}
          className="min-h-0 self-start">
          {left}
        </div>
        <div
          className="flex min-h-0 flex-col border-2 border-border max-h-96"
          style={matchedHeight ? { maxHeight: matchedHeight } : undefined}>
          {right}
        </div>
      </div>
    </div>
  )
}
