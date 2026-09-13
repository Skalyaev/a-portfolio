"use client"

import { useState, useRef } from "react"

import { Button } from "@/components/tag/Button"
import { Options } from "@/components/tag/Options"
import { En } from "@/components/svg/i18n/En"
import { Fr } from "@/components/svg/i18n/Fr"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useClickOutside } from "@/lib/hooks/useClickOutside"
import { cn } from "@/lib/utils/style"

import { locales } from "@/constants/i18n/config"

import type { OptionsFrom } from "@/components/tag/Options"
import type { Locale } from "@/constants/i18n/config"

const flags: Record<Locale, typeof En> = { en: En, fr: Fr }

export interface LanguageSwitcherProps {
  className?: string
  optionsFrom?: OptionsFrom
  optionsClassName?: string
}

/**
 * Button showing the current locale that opens a dropdown to pick another one.
 *
 * @param props - Container classes and dropdown direction/classes.
 * @returns The language switcher.
 */
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
  const flagClassName = "h-3.5 w-5 shrink-0"

  return (
    <div
      ref={containerRef}
      className={cn("h-8", className)}>
      <Button
        onClick={() => setOpen((value) => !value)}
        ariaExpanded={open}
        ariaLabel={t("language.select")}
        title={t("language.select")}
        className="h-full gap-2 font-normal">
        <span>{locale.toUpperCase()}</span>
        <Flag className={flagClassName} />
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
              ariaLabel={t(`language.${option}`)}
              className="justify-start">
              <OptionFlag className={flagClassName} />
              <span>{t(`language.${option}`)}</span>
            </Button>
          )
        })}
      </Options>
    </div>
  )
}
