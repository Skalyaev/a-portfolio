import { cn } from "@/lib/utils/style"

import type { ReactNode } from "react"

export interface SkillsSectionProps {
  title: string
  subtitle: string
  className?: string
  children: ReactNode
}

/**
 * Renders a skills page section with a title and subtitle.
 *
 * @param props - Section heading, extra classes and content.
 * @returns The section.
 */
export function SkillsSection({
  title,
  subtitle,
  className,
  children
}: SkillsSectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <h5>{title}</h5>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
