"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

import type { ReactNode } from "react"

export interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Wraps `next-themes`, toggling the theme through a class on the root element.
 *
 * @param props - Children to provide the theme to.
 * @returns The theme provider.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>
}
