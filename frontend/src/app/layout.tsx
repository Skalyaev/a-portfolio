import { cookies } from "next/headers"
import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { LanguageProvider } from "@/components/i18n/LanguageProvider"
import { Sidebar } from "@/components/layout/Sidebar"

import {
  defaultLocale,
  locales,
  localeCookieName
} from "@/constants/i18n/config"

import en from "@/constants/i18n/messages/en.json"
import fr from "@/constants/i18n/messages/fr.json"

import type { Metadata } from "next"
import type { Messages, Locale } from "@/constants/i18n/config"

import "./globals.css"

const messages: Messages = { en, fr }

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(localeCookieName)?.value as Locale

  const locale: Locale = locales.includes(localeCookie)
    ? localeCookie
    : defaultLocale

  const { title, description } = messages[locale].metadata
  return {
    title,
    description,
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] }
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(localeCookieName)?.value as Locale

  const locale: Locale = locales.includes(localeCookie)
    ? localeCookie
    : defaultLocale

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
              <main className="flex-1 overflow-y-auto">
                <div className="h-full w-full mx-auto max-w-4xl p-6 md:p-10">
                  {children}
                </div>
              </main>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
