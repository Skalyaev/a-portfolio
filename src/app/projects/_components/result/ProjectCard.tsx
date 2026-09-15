import { LanguageBar } from "@/components/chart/LanguageBar"
import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useReveal } from "@/lib/hooks/useReveal"
import { cn, revealClassName } from "@/lib/utils/style"
import { formatMonthYear } from "@/lib/utils/date"

import { revealDurationMs, revealRootMargin } from "@/constants/animation"
import { otherLanguageColor } from "@/constants/github/languages"

import type { Project } from "../../_lib/getProjects"

export interface ProjectCardProps {
  project: Project
  animate: boolean
  delayMs: number
}

/**
 * Displays a project as an external link card with its tags, description and languages.
 *
 * @param props - Component props.
 * @param props.project - Project to display.
 * @param props.animate - Whether the card slides in when it enters the viewport.
 * @param props.delayMs - Entrance animation delay in milliseconds.
 * @returns The project card.
 */
export function ProjectCard({ project, animate, delayMs }: ProjectCardProps) {
  const { t, locale } = useLanguage()
  const { ref, entered, transitionDelay } = useReveal<HTMLDivElement>({
    enabled: animate,
    delayMs,
    durationMs: revealDurationMs,
    rootMargin: revealRootMargin
  })

  return (
    <div
      ref={ref}
      className="w-full">
      <Button
        href={project.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex w-full select-text flex-col items-stretch justify-start gap-3 border-2 border-border px-4 py-3 text-left shadow-xs transition-[color,background-color,border-color,opacity,translate] duration-[400ms,400ms,200ms,400ms,400ms] hover:border-foreground focus-visible:border-foreground focus-visible:outline-none hover:bg-transparent focus-visible:bg-transparent",
          revealClassName(entered)
        )}
        style={{ transitionDelay }}>
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h6 className="group-hover:underline group-focus-visible:underline text-foreground">
              {project.name}
            </h6>
            <span className="shrink-0 text-right text-2xs text-muted leading-tight font-light">
              {formatMonthYear(project.lastModified, locale)}
            </span>
          </div>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2 py-0.5 text-2xs text-muted font-normal">
                  {t(`projects.tags.${tag}`)}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted font-normal">
            {t(project.descriptionKey)}
          </p>
        </div>

        {(project.languages.length > 0 ||
          project.otherLanguagesPercent > 0) && (
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
                  <span className="font-normal">{language.name}</span>
                </span>
              ))}
              {project.otherLanguagesPercent > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <span
                    className="h-2 w-2 shrink-0"
                    style={{ backgroundColor: otherLanguageColor }}
                  />
                  <span className="font-normal">
                    {t("projects.otherLanguage")}
                  </span>
                </span>
              )}
            </div>
          </div>
        )}
      </Button>
    </div>
  )
}
