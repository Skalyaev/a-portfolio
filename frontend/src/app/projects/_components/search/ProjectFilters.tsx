import { Button } from "@/components/tag/Button"
import { X } from "@/components/svg/X"

import { cn } from "@/lib/utils/style"
import { useLanguage } from "@/lib/hooks/useLanguage"

import { languageLightColors } from "@/constants/github/languages"
import { projectTagIcons } from "@/constants/github/projects"

import type { CSSProperties } from "react"
import type { ProjectTag } from "@/constants/github/projects"

export interface AvailableLanguage {
  name: string
  bytes: number
  color: string
}

export interface ProjectFiltersProps {
  availableTags: ProjectTag[]
  selectedTags: ProjectTag[]
  onToggleTag: (tag: ProjectTag) => void
  availableLanguages: AvailableLanguage[]
  selectedLanguages: string[]
  onToggleLanguage: (name: string) => void
  onClearFilters: () => void
}

export function ProjectFilters({
  availableTags,
  selectedTags,
  onToggleTag,
  availableLanguages,
  selectedLanguages,
  onToggleLanguage,
  onClearFilters
}: ProjectFiltersProps) {
  const { t } = useLanguage()
  const hasActiveFilters =
    selectedTags.length > 0 || selectedLanguages.length > 0

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted select-none">
        {t("projects.applyFilters")}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          const Icon = projectTagIcons[tag]
          return (
            <Button
              key={tag}
              onClick={() => onToggleTag(tag)}
              selected={isSelected}
              ariaPressed={isSelected}
              className={cn(
                "border-2 border-border py-1.5",
                !isSelected &&
                  "hover:border-foreground hover:bg-background focus-visible:border-foreground focus-visible:bg-background"
              )}>
              <Icon
                width={16}
                height={16}
                fill={isSelected}
              />
              <span className="text-xs">{t(`projects.tags.${tag}`)}</span>
            </Button>
          )
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {availableLanguages.map((language) => {
          const isSelected = selectedLanguages.includes(language.name)
          return (
            <span
              key={language.name}
              className="contents"
              style={
                {
                  "--lang-color": language.color,
                  "--lang-bg":
                    languageLightColors[language.name] ?? language.color
                } as CSSProperties
              }>
              <Button
                onClick={() => onToggleLanguage(language.name)}
                selected={isSelected}
                ariaPressed={isSelected}
                className={cn(
                  "border-2 py-1.5",
                  isSelected
                    ? "border-[var(--lang-color)] bg-[var(--lang-bg)] text-zinc-800 hover:border-[var(--lang-color)] hover:bg-[var(--lang-bg)] hover:text-zinc-800 focus-visible:border-[var(--lang-color)] focus-visible:bg-[var(--lang-bg)] focus-visible:text-zinc-800"
                    : "border-border hover:border-[var(--lang-color)] hover:bg-background focus-visible:border-[var(--lang-color)] focus-visible:bg-background"
                )}>
                <span
                  className="h-2 w-2"
                  style={{ backgroundColor: language.color }}
                />
                <span className="text-xs">{language.name}</span>
              </Button>
            </span>
          )
        })}
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            ariaLabel={t("projects.clearFilters")}
            title={t("projects.clearFilters")}
            className="animate-fade-in-slide-left border-2 border-border p-1.5 hover:border-foreground hover:bg-background focus-visible:border-foreground focus-visible:bg-background">
            <X
              width={14}
              height={14}
            />
          </Button>
        )}
      </div>
    </div>
  )
}
