"use client"

import { locales } from "@/constants/i18n/config"
import { useLanguage } from "@/lib/hooks/useLanguage"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex border border-border">
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-label={option}
          className={cn(
            "flex-1 px-2 py-1.5 text-xs uppercase tracking-wide transition-colors",
            locale === option
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          )}>
          {option}
        </button>
      ))}
    </div>
  )
}
