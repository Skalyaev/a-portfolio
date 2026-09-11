import { useLanguage } from "@/lib/hooks/useLanguage"

import { skillCategories } from "@/constants/skills/tools"
import { projectOverrides } from "@/constants/github/projects"

import { SkillsSection } from "../SkillsSection"
import { ToolCategory } from "./ToolCategory"

import type { LanguageProject } from "../../_lib/getSkills"

function repoNameFromUrl(htmlUrl: string): string {
  return htmlUrl.split("/").filter(Boolean).pop() ?? htmlUrl
}

const projectsByTechnology: Record<string, LanguageProject[]> = {}
for (const project of projectOverrides) {
  const name = repoNameFromUrl(project.htmlUrl)
  for (const technology of project.technologies ?? []) {
    const list = (projectsByTechnology[technology] ??= [])
    list.push({
      name,
      htmlUrl: project.htmlUrl,
      descriptionKey: `projects.descriptions.${name}`
    })
  }
}

export function ToolsSection() {
  const { t } = useLanguage()

  return (
    <SkillsSection
      title={t("skills.tools.title")}
      subtitle={t("skills.tools.subtitle")}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => (
          <ToolCategory
            key={category}
            category={category}
            projectsByTechnology={projectsByTechnology}
          />
        ))}
      </div>
    </SkillsSection>
  )
}
