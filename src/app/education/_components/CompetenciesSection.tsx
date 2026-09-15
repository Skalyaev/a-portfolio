import { Section } from "@/components/layout/Section"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useReveal } from "@/lib/hooks/useReveal"
import { cn, revealClassName } from "@/lib/utils/style"

import { diploma } from "@/constants/education/diploma"
import {
  revealCascadeStepMs,
  revealDurationMs,
  revealRootMargin
} from "@/constants/animation"
import { labelClassName } from "@/constants/style"

import type { CompetencyBlock } from "@/constants/education/diploma"

interface CompetencyBlockItemProps {
  block: CompetencyBlock
  delayMs: number
}

/**
 * Displays a collapsible competency block. Its code, kind, title and description stay visible
 * whether the block is collapsed or expanded; its full list of competencies only shows expanded.
 * Slides in the first time it enters the viewport.
 *
 * @param props - Component props.
 * @param props.block - Competency block to display.
 * @param props.delayMs - Entrance animation delay in milliseconds.
 * @returns The competency block.
 */
function CompetencyBlockItem({ block, delayMs }: CompetencyBlockItemProps) {
  const { t } = useLanguage()
  const { ref, entered, transitionDelay } = useReveal<HTMLDetailsElement>({
    enabled: true,
    delayMs,
    durationMs: revealDurationMs,
    rootMargin: revealRootMargin
  })

  const blockKey = `education.competencies.blocks.${block.id}`
  const kind = block.isOption
    ? t("education.competencies.option")
    : t("education.competencies.common")

  return (
    <details
      ref={ref}
      className={cn(
        "group border-2 border-border transition-[color,background-color,border-color,opacity,translate] duration-[400ms,400ms,200ms,400ms,400ms] has-[.block-trigger:hover]:border-foreground has-[:focus-visible]:border-foreground",
        revealClassName(entered)
      )}
      style={{ transitionDelay }}>
      <summary className="block-trigger flex cursor-pointer list-none items-stretch justify-between gap-4 px-4 py-3 select-none focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        <span className="flex flex-col gap-1">
          <span className="flex flex-col gap-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className={labelClassName}>{block.code}</span>
              <span className="border border-border px-2 py-0.5 text-2xs text-muted">
                {kind}
              </span>
            </span>
            <span className="text-sm font-semibold group-has-[.block-trigger:hover]:underline group-has-[:focus-visible]:underline">
              {t(`${blockKey}.title`)}
            </span>
          </span>
          <span className="text-xs text-muted">
            {t(`${blockKey}.description`)}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="relative flex w-4 shrink-0 items-center justify-center text-border group-has-[.block-trigger:hover]:text-foreground group-has-[:focus-visible]:text-foreground">
          <span className="absolute h-0.5 w-3 bg-current" />
          <span className="absolute h-3 w-0.5 bg-current group-open:scale-y-0" />
        </span>
      </summary>
      <ul className="mx-4 flex list-[square] flex-col gap-1.5 border-t border-border px-4 pt-3 pb-4 text-xs text-muted">
        {block.competencyKeys.map((key) => (
          <li key={key}>{t(`${blockKey}.items.${key}`)}</li>
        ))}
      </ul>
    </details>
  )
}

/**
 * Renders the certified skills section: one collapsible card per competency block.
 *
 * @returns The competencies section.
 */
export function CompetenciesSection() {
  const { t } = useLanguage()

  return (
    <Section
      title={t("education.competencies.title")}
      subtitle={t("education.competencies.subtitle")}>
      <ul className="flex flex-col gap-2 pb-6 md:pb-10">
        {diploma.blocks.map((block, index) => (
          <li key={block.id}>
            <CompetencyBlockItem
              block={block}
              delayMs={index * revealCascadeStepMs}
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
