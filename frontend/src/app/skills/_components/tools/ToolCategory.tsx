import { useLanguage } from "@/lib/hooks/useLanguage"

import {
  skillCategoryIcons,
  skillDescriptionKeys,
  skillsByCategory
} from "@/constants/skills/tools"

import { HoverProjects } from "../HoverProjects"

import type { SkillCategory } from "@/constants/skills/tools"
import type { LanguageProject } from "../../_lib/getSkills"

export interface ToolCategoryProps {
  category: SkillCategory
  projectsByTechnology: Record<string, LanguageProject[]>
}
export function ToolCategory({
  category,
  projectsByTechnology
}: ToolCategoryProps) {
  const { t } = useLanguage()
  const Icon = skillCategoryIcons[category]

  return (
    <div className="flex flex-col gap-3 border border-border px-4 py-3 hover:border-foreground cursor-default transition-colors">
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
          const key = skillDescriptionKeys[item] ?? item
          return (
            <HoverProjects
              key={item}
              className="block"
              placement="side"
              projects={projectsByTechnology[item] ?? []}>
              <div className="group flex flex-col gap-0.5 px-2 py-1.5 group">
                <span className="text-xs font-medium text-foreground group-hover:underline">
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
