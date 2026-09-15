import en from "@/constants/i18n/messages/en.json"
import fr from "@/constants/i18n/messages/fr.json"

export const locales = ["en", "fr"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"
export const localeCookieName = "locale"

export type Messages = Record<Locale, typeof en>

export const messages: Messages = { en, fr }
