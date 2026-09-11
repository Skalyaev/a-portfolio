"use client"

import { useEffect, useMemo, useState } from "react"

import { FlexCol } from "@/components/layout/FlexCol"
import { Input } from "@/components/tag/Input"
import { Search } from "@/components/svg/Search"

import { useLanguage } from "@/lib/hooks/useLanguage"

import { languageOrder } from "@/constants/github/languages"
import { allProjectTags } from "@/constants/github/projects"

import { ProjectCard } from "./result/ProjectCard"
import { ProjectFilters } from "./search/ProjectFilters"

import type { Project } from "../_lib/getProjects"
import type { ProjectTag } from "@/constants/github/projects"
import type { AvailableLanguage } from "./search/ProjectFilters"

const cardCascadeStepMs = 80

export interface ProjectsBrowserProps {
  projects: Project[]
}

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [search, setSearch] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([])

  const [hasInteracted, setHasInteracted] = useState(false)

  const { t } = useLanguage()

  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 })
  }, [])

  const availableLanguages = useMemo(() => {
    const totals = new Map<string, AvailableLanguage>()
    for (const project of projects) {
      for (const language of project.languages) {
        const existing = totals.get(language.name)
        totals.set(language.name, {
          name: language.name,
          bytes: (existing?.bytes ?? 0) + language.bytes,
          color: language.color
        })
      }
    }
    return Array.from(totals.values()).sort(
      (a, b) => languageOrder.indexOf(a.name) - languageOrder.indexOf(b.name)
    )
  }, [projects])

  const availableTags = useMemo(
    () =>
      allProjectTags.filter((tag) =>
        projects.some((project) => project.tags.includes(tag))
      ),
    [projects]
  )

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesSearch =
        term.length === 0 ||
        project.name.toLowerCase().includes(term) ||
        (project.descriptionKey
          ? t(project.descriptionKey).toLowerCase().includes(term)
          : false) ||
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

  const [leftColumn, rightColumn] = useMemo(() => {
    const left: Array<{ project: Project; index: number }> = []
    const right: Array<{ project: Project; index: number }> = []

    filteredProjects.forEach((project, index) => {
      ;(index % 2 === 0 ? left : right).push({ project, index })
    })
    return [left, right]
  }, [filteredProjects])

  function handleSearch(value: string) {
    setHasInteracted(true)
    setSearch(value)
  }

  function toggleLanguage(name: string) {
    setHasInteracted(true)
    setSelectedLanguages((current) =>
      current.includes(name)
        ? current.filter((language) => language !== name)
        : [...current, name]
    )
  }

  function toggleTag(tag: ProjectTag) {
    setHasInteracted(true)
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((selected) => selected !== tag)
        : [...current, tag]
    )
  }

  function clearFilters() {
    setHasInteracted(true)
    setSelectedLanguages([])
    setSelectedTags([])
  }

  return (
    <FlexCol
      title={t("projects.title")}
      subtitle={t("projects.subtitle")}
      error={projects.length === 0}
      errorMessage={t("projects.loadError")}>
      <div className="flex flex-col gap-3">
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

      <div className="flex flex-col gap-4 pb-6 sm:hidden">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            animate={!hasInteracted}
            delayMs={index * cardCascadeStepMs}
          />
        ))}
      </div>
      <div className="hidden gap-4 pb-6 sm:flex">
        <div className="flex flex-1 flex-col gap-4">
          {leftColumn.map(({ project, index }) => (
            <ProjectCard
              key={project.name}
              project={project}
              animate={!hasInteracted}
              delayMs={index * cardCascadeStepMs}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rightColumn.map(({ project, index }) => (
            <ProjectCard
              key={project.name}
              project={project}
              animate={!hasInteracted}
              delayMs={index * cardCascadeStepMs}
            />
          ))}
        </div>
      </div>
    </FlexCol>
  )
}
