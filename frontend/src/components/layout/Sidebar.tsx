"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { navItems } from "@/constants/nav"
import { useLanguage } from "@/lib/hooks/useLanguage"
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <span className="font-semibold">Portfolio</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="border border-border px-3 py-1.5 text-sm">
          {open ? "✕" : "☰"}
        </button>
      </header>

      <aside
        className={cn(
          "flex-col border-border md:fixed md:inset-y-0 md:left-0 md:flex md:w-60 md:border-r",
          open ? "flex" : "hidden md:flex"
        )}>
        <div className="hidden px-6 py-6 md:block">
          <span className="font-semibold">Portfolio</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground"
                )}>
                {t(item.labelKey)}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-2 border-t border-border px-4 py-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </aside>
    </>
  )
}
