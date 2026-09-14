import { RevealSection } from "./RevealSection"

import type { ReactNode } from "react"

export interface EducationSectionProps {
  title: string
  subtitle: string
  children: ReactNode
}

/**
 * Renders an education page section with a title and subtitle.
 *
 * @param props - Section heading and content.
 * @returns The section.
 */
export function EducationSection({
  title,
  subtitle,
  children
}: EducationSectionProps) {
  return (
    <RevealSection>
      <div className="flex flex-col gap-1">
        <h5>{title}</h5>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
      {children}
    </RevealSection>
  )
}
