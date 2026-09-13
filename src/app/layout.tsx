import { cookies } from "next/headers"
import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { LanguageProvider } from "@/components/i18n/LanguageProvider"
import { Sidebar } from "@/components/layout/Sidebar"
import { Main } from "@/components/layout/Main"

import {
  defaultLocale,
  locales,
  localeCookieName
} from "@/constants/i18n/config"
import en from "@/constants/i18n/messages/en.json"
import fr from "@/constants/i18n/messages/fr.json"

import "./globals.css"

import type { Metadata } from "next"
import type { Messages, Locale } from "@/constants/i18n/config"

const messages: Messages = { en, fr }

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

/**
 * Reads the locale from the request cookie.
 *
 * @returns The cookie locale when supported, the default locale otherwise.
 */
async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(localeCookieName)?.value
  return locales.find((locale) => locale === value) ?? defaultLocale
}

/**
 * Builds the page metadata (title, description, favicons) in the locale stored in the cookie.
 *
 * @returns The localized metadata, falling back to the default locale.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const { title, description } = messages[locale].metadata

  return {
    title,
    description,
    icons: {
      icon: [
        {
          url: "/favicon-light.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: light)"
        },
        {
          url: "/favicon-dark.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: dark)"
        }
      ]
    }
  }
}

/**
 * Renders the root HTML shell with fonts, theme and language providers, and the sidebar.
 *
 * @param props - Layout props.
 * @param props.children - Active route content.
 * @returns The root layout.
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} text-foreground antialiased h-screen w-screen min-w-[320px]`}>
      <body className="h-full w-full bg-background transition-colors">
        <ThemeProvider>
          <LanguageProvider initialLocale={locale}>
            <div className="h-full w-full flex flex-col md:flex-row">
              <Sidebar />
              <Main>{children}</Main>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
