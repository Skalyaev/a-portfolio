import { cn } from "@/lib/utils/style"

import type { ReactNode } from "react"

export interface SkillsSectionProps {
  title: ReactNode
  subtitle: ReactNode
  className?: string
  children: ReactNode
}
export function SkillsSection({
  title,
  subtitle,
  className,
  children
}: SkillsSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1">
        <h5>{title}</h5>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
