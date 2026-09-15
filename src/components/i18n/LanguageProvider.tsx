"use client"

import { useCallback, useMemo, useState } from "react"

import { LanguageContext } from "@/components/i18n/LanguageContext"

import { localeCookieName, messages } from "@/constants/i18n/config"

import type { ReactNode } from "react"
import type { LanguageContextValue } from "@/components/i18n/LanguageContext"
import type { Locale } from "@/constants/i18n/config"

/**
 * Tells whether a value is a non-null object whose keys can be read.
 *
 * @param value - Value to check.
 * @returns `true` when `value` is a non-null object.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

/**
 * Resolves a dot-separated translation key in a messages dictionary.
 *
 * @param dict - Messages dictionary of a locale.
 * @param key - Dot-separated path, e.g. `"nav.menu"`.
 * @returns The translated string, or the key itself when missing or not a string.
 */
function resolve(dict: unknown, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        isRecord(acc) && Object.hasOwn(acc, part) ? acc[part] : undefined,
      dict
    )
  return typeof value === "string" ? value : key
}

export interface LanguageProviderProps {
  children: ReactNode
  initialLocale: Locale
}

/**
 * Provides the current locale, a setter and a translation function to its subtree.
 *
 * @param props - Children and the locale resolved on the server.
 * @returns The language context provider.
 */
export function LanguageProvider({
  children,
  initialLocale
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  /**
   * Changes the locale, persists it in a cookie and updates the document `lang` attribute.
   *
   * @param next - Locale to switch to.
   */
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
  }, [])

  /**
   * Translates a key with the current locale.
   *
   * @param key - Dot-separated translation key.
   * @returns The translated string, or the key when missing.
   */
  const t = useCallback(
    (key: string) => resolve(messages[locale], key),
    [locale]
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
