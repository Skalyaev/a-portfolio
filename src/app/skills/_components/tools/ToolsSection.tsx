import { useLanguage } from "@/components/i18n/LanguageContext"

import { useMasonryLayout } from "@/lib/hooks/useMasonryLayout"
import { groupByKeys } from "@/lib/utils/collection"

import { skillCategories } from "@/constants/skills/tools"
import { projectOverrides } from "@/constants/github/projects"
import { experiences } from "@/constants/experience/experiences"

import { SkillsSection } from "../SkillsSection"
import { ToolCategory } from "./ToolCategory"

import type { Technology } from "@/constants/github/projects"
import type { Experience } from "@/constants/experience/experiences"
import type { LanguageProject } from "../../_lib/getSkills"

/**
 * Extracts the repository name from a GitHub repository URL.
 *
 * @param htmlUrl - Repository URL, e.g. `https://github.com/owner/repo`.
 * @returns The last path segment, or the URL itself when none is found.
 */
function repoNameFromUrl(htmlUrl: string): string {
  return htmlUrl.split("/").filter(Boolean).pop() ?? htmlUrl
}

const projectsByTechnology: Partial<Record<Technology, LanguageProject[]>> = {}
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

const experiencesByTechnology: Partial<Record<Technology, Experience[]>> =
  groupByKeys(experiences, (experience) => experience.technologies)

const toolCategoryCascadeStepMs = 80
const toolCategoryCascadeBatchSize = 3
const toolGridGapPx = 16
const toolGridSmBreakpointPx = 640
const toolGridXlBreakpointPx = 1280

/**
 * Returns the number of tool category columns for a viewport width.
 *
 * @param viewportWidth - Window width in pixels.
 * @returns 3, 2 or 1 columns depending on the breakpoints.
 */
function getToolColumnCount(viewportWidth: number) {
  if (viewportWidth >= toolGridXlBreakpointPx) return 3
  if (viewportWidth >= toolGridSmBreakpointPx) return 2
  return 1
}

/**
 * Renders the tools section as a masonry grid of tool categories.
 *
 * @returns The tools section.
 */
export function ToolsSection() {
  const { t } = useLanguage()

  const { containerRef, containerHeight, getItemProps } = useMasonryLayout(
    skillCategories.length,
    getToolColumnCount,
    toolGridGapPx
  )

  return (
    <SkillsSection
      title={t("skills.tools.title")}
      subtitle={t("skills.tools.subtitle")}>
      <div
        ref={containerRef}
        className="relative shrink-0"
        style={{ height: containerHeight }}>
        {skillCategories.map((category, index) => {
          const { ref, style } = getItemProps(index)
          return (
            <div
              key={category}
              ref={ref}
              style={style}
              className="relative z-0 w-full hover:z-10 focus-within:z-10">
              <ToolCategory
                category={category}
                projectsByTechnology={projectsByTechnology}
                experiencesByTechnology={experiencesByTechnology}
                delayMs={
                  (index % toolCategoryCascadeBatchSize) *
                  toolCategoryCascadeStepMs
                }
              />
            </div>
          )
        })}
      </div>
    </SkillsSection>
  )
}
