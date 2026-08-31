"use client"

import { useCallback, useMemo, useState } from "react"
import { localeCookieName, type Locale } from "@/constants/i18n/config"
import en from "@/constants/i18n/messages/en.json"
import fr from "@/constants/i18n/messages/fr.json"
import { LanguageContext } from "@/components/i18n/LanguageContext"

type Messages = typeof en
const messages: Record<Locale, Messages> = { en, fr }

function resolve(dict: unknown, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object" && part in acc
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      dict
    )
  return typeof value === "string" ? value : key
}

export function LanguageProvider({
  children,
  initialLocale
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
  }, [])

  const t = useCallback(
    (key: string) => resolve(messages[locale], key),
    [locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
