"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import type { ReactNode } from "react"

export interface MainProps {
  children: ReactNode
}

/**
 * Scrollable main area, scrolled back to the top on every navigation without a hash.
 *
 * @param props - Component props.
 * @param props.children - Active route content.
 * @returns The main area.
 */
export function Main({ children }: MainProps) {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // The router has already scrolled to the hash anchor; resetting would undo it.
    if (window.location.hash) return
    ref.current?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <main
      ref={ref}
      className="flex-1 overflow-y-auto">
      <div className="h-full w-full mx-auto max-w-4xl p-6 md:p-10">
        {children}
      </div>
    </main>
  )
}
