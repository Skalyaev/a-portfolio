"use client"

import { useState, useRef } from "react"

import { Button } from "@/components/tag/Button"
import { Options } from "@/components/tag/Options"
import { En } from "@/components/svg/i18n/En"
import { Fr } from "@/components/svg/i18n/Fr"

import { useClickOutside } from "@/lib/hooks/useClickOutside"
import { useLanguage } from "@/lib/hooks/useLanguage"
import { cn } from "@/lib/utils"

import { locales } from "@/constants/i18n/config"

import type { OptionsFrom } from "@/components/tag/Options"
import type { Locale } from "@/constants/i18n/config"

const flags: Record<Locale, typeof En> = { en: En, fr: Fr }

export interface LanguageSwitcherProps {
  className?: string
  optionsFrom?: OptionsFrom
  optionsClassName?: string
}
export function LanguageSwitcher({
  className,
  optionsClassName,
  optionsFrom = "right"
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)

  const { locale, setLocale, t } = useLanguage()

  const containerRef = useRef<HTMLDivElement>(null)
  useClickOutside(containerRef, () => setOpen(false), open)

  const Flag = flags[locale]
  const flagClassname = "h-3.5 w-5 shrink-0"

  return (
    <div
      ref={containerRef}
      className={cn("h-8", className)}>
      <Button
        onClick={() => setOpen((value) => !value)}
        ariaExpanded={open}
        ariaLabel={t("language.select")}
        title={t("language.select")}
        className="h-full font-normal">
        <span>{locale.toUpperCase()}</span>
        <Flag className={flagClassname} />
      </Button>

      <Options
        open={open}
        from={optionsFrom}
        className={cn("bottom-3", optionsClassName)}>
        {locales.map((option) => {
          const OptionFlag = flags[option]
          return (
            <Button
              key={option}
              selected={locale === option}
              onClick={() => {
                setLocale(option)
                setOpen(false)
              }}
              tabIndex={open ? 0 : -1}
              ariaLabel={t(`language.${option}`)}
              className="justify-start">
              <OptionFlag className={flagClassname} />
              <span>{t(`language.${option}`)}</span>
            </Button>
          )
        })}
      </Options>
    </div>
  )
}
