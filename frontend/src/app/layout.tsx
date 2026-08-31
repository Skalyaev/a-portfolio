import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { LanguageProvider } from "@/components/i18n/LanguageProvider"
import { Sidebar } from "@/components/layout/Sidebar"
import {
  defaultLocale,
  locales,
  localeCookieName,
  type Locale
} from "@/constants/i18n/config"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio"
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(localeCookieName)?.value
  const initialLocale: Locale = locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : defaultLocale

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ThemeProvider>
          <LanguageProvider initialLocale={initialLocale}>
            <div className="flex min-h-full flex-col md:flex-row">
              <Sidebar />
              <main className="flex-1 md:pl-60">
                <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
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
