import { useLanguage } from "@/components/i18n/LanguageContext"

import { useReveal } from "@/lib/hooks/useReveal"
import { cn } from "@/lib/utils/style"

import { revealRootMargin } from "@/constants/animation"
import {
  skillCategoryIcons,
  skillDescriptionKeys,
  skillsByCategory
} from "@/constants/skills/tools"

import { HoverProjects } from "../HoverProjects"

import type { Technology } from "@/constants/github/projects"
import type { SkillCategory } from "@/constants/skills/tools"
import type { LanguageProject } from "../../_lib/getSkills"

const transitionDurationMs = 400

export interface ToolCategoryProps {
  category: SkillCategory
  projectsByTechnology: Partial<Record<Technology, LanguageProject[]>>
  delayMs: number
}

/**
 * Displays a tool category card listing its technologies with their related projects.
 *
 * @param props - Category, projects by technology and entrance animation delay.
 * @returns The tool category card.
 */
export function ToolCategory({
  category,
  projectsByTechnology,
  delayMs
}: ToolCategoryProps) {
  const { t } = useLanguage()
  const Icon = skillCategoryIcons[category]

  const { ref, entered, transitionDelay } = useReveal<HTMLDivElement>({
    enabled: true,
    delayMs,
    durationMs: transitionDurationMs,
    rootMargin: revealRootMargin
  })

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 border-2 border-border px-4 py-3 cursor-default transition-[opacity,translate] duration-400",
        entered
          ? "translate-y-0 opacity-100 ease-out"
          : "translate-y-8 opacity-0 ease-in"
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
            <HoverProjects
              key={item}
              placement="side"
              projects={projectsByTechnology[item] ?? []}>
              <div
                tabIndex={0}
                className="group flex flex-col gap-0.5 px-2 py-1.5 focus:outline-none">
                <span className="text-xs font-medium text-foreground group-hover:underline group-focus:underline">
                  {t(`skills.tools.names.${key}`)}
                </span>
                <span className="text-2xs text-muted">
                  {t(`skills.tools.descriptions.${key}`)}
                </span>
              </div>
            </HoverProjects>
          )
        })}
      </div>
    </div>
  )
}
