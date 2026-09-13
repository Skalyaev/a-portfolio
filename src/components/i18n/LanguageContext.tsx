import { createContext, useContext } from "react"

import type { Locale } from "@/constants/i18n/config"

export type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * Returns the current locale, its setter and the translation function.
 *
 * @returns The language context value.
 * @throws If called outside a `LanguageProvider`.
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
