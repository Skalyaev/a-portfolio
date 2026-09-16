import { useLanguage } from "@/components/i18n/LanguageContext"

import { useReveal } from "@/lib/hooks/useReveal"
import { cn, revealClassName } from "@/lib/utils/style"

import { revealDurationMs, revealRootMargin } from "@/constants/animation"
import {
  skillCategoryIcons,
  skillDescriptionKeys,
  skillsByCategory
} from "@/constants/skills/tools"

import { HoverRelated } from "../HoverRelated"

import type { Technology } from "@/constants/github/projects"
import type { Experience } from "@/constants/experience/experiences"
import type { SkillCategory } from "@/constants/skills/tools"
import type { LanguageProject } from "../../_lib/getSkills"

export interface ToolCategoryProps {
  category: SkillCategory
  projectsByTechnology: Partial<Record<Technology, LanguageProject[]>>
  experiencesByTechnology: Partial<Record<Technology, Experience[]>>
  delayMs: number
}

/**
 * Displays a tool category card listing its technologies with their related projects and experiences.
 *
 * @param props - Category, projects and experiences by technology, and entrance animation delay.
 * @returns The tool category card.
 */
export function ToolCategory({
  category,
  projectsByTechnology,
  experiencesByTechnology,
  delayMs
}: ToolCategoryProps) {
  const { t } = useLanguage()
  const Icon = skillCategoryIcons[category]

  const { ref, entered, transitionDelay } = useReveal<HTMLDivElement>({
    enabled: true,
    delayMs,
    durationMs: revealDurationMs,
    rootMargin: revealRootMargin
  })

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 border-2 border-border px-4 py-3 cursor-default transition-[opacity,translate] duration-400",
        revealClassName(entered)
      )}
      style={{ transitionDelay }}>
      <div className="flex items-center gap-1 text-foreground">
        <Icon
          width={14}
          height={14}
          fill
        />
        <span className="text-xs font-semibold">
          {t(`skills.tools.categories.${category}`)}
        </span>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {skillsByCategory[category].map((item) => {
          const key = skillDescriptionKeys[item]
          return (
            <HoverRelated
              key={item}
              placement="side"
              projects={projectsByTechnology[item] ?? []}
              experiences={experiencesByTechnology[item] ?? []}>
              <div
                tabIndex={0}
                className="group flex flex-col gap-0.5 px-2 py-3 focus:outline-none">
                <span className="text-xs font-medium text-foreground group-hover:underline group-focus:underline">
                  {t(`skills.tools.names.${key}`)}
                </span>
                <span className="text-2xs text-muted">
                  {t(`skills.tools.descriptions.${key}`)}
                </span>
              </div>
            </HoverRelated>
          )
        })}
      </div>
    </div>
  )
}
