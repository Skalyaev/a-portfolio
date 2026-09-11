"use client"

import { useEffect, useState } from "react"

import { LanguageBar } from "@/components/chart/LanguageBar"

import { useLanguage } from "@/lib/hooks/useLanguage"
import { cn } from "@/lib/utils/style"
import { formatShortDate } from "@/lib/utils/date"

import { otherLanguageColor } from "@/constants/github/languages"

import type { Project } from "../../_lib/getProjects"

const transitionDurationMs = 400

export interface ProjectCardProps {
  project: Project
  animate: boolean
  delayMs: number
}
export function ProjectCard({ project, animate, delayMs }: ProjectCardProps) {
  const { t } = useLanguage()
  const [entered, setEntered] = useState(!animate)
  const [settled, setSettled] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [animate])

  useEffect(() => {
    if (!animate || !entered) return
    const timeout = setTimeout(
      () => setSettled(true),
      delayMs + transitionDurationMs
    )
    return () => clearTimeout(timeout)
  }, [animate, entered, delayMs])

  const description = project.descriptionKey
    ? t(project.descriptionKey)
    : undefined

  return (
    <a
      href={project.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col gap-3 border-2 border-border px-4 py-3 shadow-xs transition-[color,background-color,border-color,opacity,translate] duration-400 hover:border-foreground focus-visible:border-foreground focus-visible:outline-none",
        entered
          ? "translate-y-0 opacity-100 ease-out"
          : "translate-y-8 opacity-0 ease-in"
      )}
      style={{ transitionDelay: entered && !settled ? `${delayMs}ms` : "0ms" }}>
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h6 className="group-hover:underline group-focus-visible:underline">
            {project.name}
          </h6>
          <span className="shrink-0 text-right text-2xs text-muted leading-tight font-light">
            {formatShortDate(project.lastModified)}
          </span>
        </div>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2 py-0.5 text-2xs text-muted">
                {t(`projects.tags.${tag}`)}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-muted">
          {description ?? t("projects.noDescription")}
        </p>
      </div>

      {(project.languages.length > 0 || project.otherLanguagesPercent > 0) && (
        <div className="flex flex-col gap-2">
          <LanguageBar
            languages={project.languages}
            otherPercent={project.otherLanguagesPercent}
            otherLabel={t("projects.otherLanguage")}
          />
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.languages.map((language) => (
              <span
                key={language.name}
                className="inline-flex items-center gap-1 text-xs text-muted">
                <span
                  className="h-2 w-2 shrink-0"
                  style={{ backgroundColor: language.color }}
                />
                <span>{language.name}</span>
              </span>
            ))}
            {project.otherLanguagesPercent > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <span
                  className="h-2 w-2 shrink-0"
                  style={{ backgroundColor: otherLanguageColor }}
                />
                <span>{t("projects.otherLanguage")}</span>
              </span>
            )}
          </div>
        </div>
      )}
    </a>
  )
}
