"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * Wraps `next-themes` with the site configuration (class attribute, light/dark, system default).
 *
 * @param props - Children to provide the theme to.
 * @returns The theme provider.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark"]}>
      {children}
    </NextThemesProvider>
  )
}
