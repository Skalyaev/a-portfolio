"use client"

import { useMemo, useState } from "react"

import { FlexCol } from "@/components/layout/FlexCol"
import { Input } from "@/components/tag/Input"
import { Search } from "@/components/svg/Search"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useMasonryLayout } from "@/lib/hooks/useMasonryLayout"
import { useToggleList } from "@/lib/hooks/useToggleList"

import { revealCascadeStepMs } from "@/constants/animation"
import { languageOrder } from "@/constants/github/languages"
import { projectTags } from "@/constants/github/projects"

import { ProjectCard } from "./result/ProjectCard"
import { ProjectFilters } from "./search/ProjectFilters"

import type { Project } from "../_lib/getProjects"
import type { ProjectTag } from "@/constants/github/projects"
import type { AvailableLanguage } from "./search/ProjectFilters"

const cardCascadeBatchSize = 4
const cardGridGapPx = 16
const cardGridBreakpointPx = 640

/**
 * Returns the number of project card columns for a viewport width.
 *
 * @param viewportWidth - Window width in pixels.
 * @returns 2 columns from the breakpoint upward, 1 otherwise.
 */
function getCardColumnCount(viewportWidth: number): number {
  return viewportWidth >= cardGridBreakpointPx ? 2 : 1
}

export interface ProjectsBrowserProps {
  projects: Project[]
}

/**
 * Displays the projects in a masonry grid with search, language and tag filters.
 *
 * @param props - Component props.
 * @param props.projects - Projects to display.
 * @returns The projects browser.
 */
export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [search, setSearch] = useState("")
  const {
    items: selectedLanguages,
    toggle: toggleSelectedLanguage,
    clear: clearSelectedLanguages
  } = useToggleList<string>()
  const {
    items: selectedTags,
    toggle: toggleSelectedTag,
    clear: clearSelectedTags
  } = useToggleList<ProjectTag>()

  const [hasInteracted, setHasInteracted] = useState(false)

  const { t } = useLanguage()

  const availableLanguages = useMemo<AvailableLanguage[]>(() => {
    const languagesByName = new Map<string, AvailableLanguage>()
    for (const project of projects) {
      for (const language of project.languages) {
        languagesByName.set(language.name, {
          name: language.name,
          color: language.color
        })
      }
    }
    return Array.from(languagesByName.values()).sort(
      (a, b) => languageOrder.indexOf(a.name) - languageOrder.indexOf(b.name)
    )
  }, [projects])

  const availableTags = useMemo<ProjectTag[]>(
    () =>
      projectTags.filter((tag) =>
        projects.some((project) => project.tags.includes(tag))
      ),
    [projects]
  )

  const filteredProjects = useMemo<Project[]>(() => {
    const term = search.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesSearch =
        term.length === 0 ||
        project.name.toLowerCase().includes(term) ||
        t(project.descriptionKey).toLowerCase().includes(term) ||
        project.tags.some((tag) =>
          t(`projects.tags.${tag}`).toLowerCase().includes(term)
        ) ||
        project.languages.some((language) =>
          language.name.toLowerCase().includes(term)
        )

      const matchesLanguages =
        selectedLanguages.length === 0 ||
        project.languages.some((language) =>
          selectedLanguages.includes(language.name)
        )

      const matchesTags =
        selectedTags.length === 0 ||
        project.tags.some((tag) => selectedTags.includes(tag))

      return matchesSearch && matchesLanguages && matchesTags
    })
  }, [projects, search, selectedLanguages, selectedTags, t])

  const { containerRef, containerHeight, getItemProps } = useMasonryLayout(
    filteredProjects.length,
    getCardColumnCount,
    cardGridGapPx
  )

  /**
   * Updates the search term and disables the entrance animation.
   *
   * @param value - New search term.
   */
  function handleSearch(value: string): void {
    setHasInteracted(true)
    setSearch(value)
  }

  /**
   * Adds or removes a language from the selected filters.
   *
   * @param name - Language name.
   */
  function toggleLanguage(name: string): void {
    setHasInteracted(true)
    toggleSelectedLanguage(name)
  }

  /**
   * Adds or removes a tag from the selected filters.
   *
   * @param tag - Project tag.
   */
  function toggleTag(tag: ProjectTag): void {
    setHasInteracted(true)
    toggleSelectedTag(tag)
  }

  /** Clears the selected languages and tags, keeping the search term. */
  function clearFilters(): void {
    setHasInteracted(true)
    clearSelectedLanguages()
    clearSelectedTags()
  }

  return (
    <FlexCol
      title={t("projects.title")}
      subtitle={t("projects.subtitle")}
      errorMessage={
        projects.length === 0 ? t("projects.loadError") : undefined
      }>
      <div className="flex flex-col gap-3 -mt-2">
        <Input
          value={search}
          onChange={handleSearch}
          placeholder={t("projects.searchPlaceholder")}
          ariaLabel={t("projects.searchPlaceholder")}
          clearAriaLabel={t("projects.clearSearch")}
          clearTitle={t("projects.clearSearch")}
          icon={
            <Search
              width={16}
              height={16}
            />
          }
        />
        <ProjectFilters
          availableTags={availableTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          availableLanguages={availableLanguages}
          selectedLanguages={selectedLanguages}
          onToggleLanguage={toggleLanguage}
          onClearFilters={clearFilters}
        />

        <p className="text-xs text-muted">
          {filteredProjects.length}{" "}
          {filteredProjects.length <= 1
            ? t("projects.resultCountSingular")
            : t("projects.resultCountPlural")}
        </p>
      </div>

      <div className="pb-6 md:pb-10">
        <div
          ref={containerRef}
          className="relative shrink-0 -mt-3"
          style={{ height: containerHeight }}>
          {filteredProjects.map((project, index) => {
            const { ref, style } = getItemProps(index)
            return (
              <div
                key={project.name}
                ref={ref}
                style={style}
                className="w-full">
                <ProjectCard
                  project={project}
                  animate={!hasInteracted}
                  delayMs={(index % cardCascadeBatchSize) * revealCascadeStepMs}
                />
              </div>
            )
          })}
        </div>
      </div>
    </FlexCol>
  )
}
