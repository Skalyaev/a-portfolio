"use client"

import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/tag/Button"
import { Options } from "@/components/tag/Options"
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { TextAlignJustify } from "@/components/svg/TextAlignJustify"

import { useClickOutside } from "@/lib/hooks/useClickOutside"
import { useLanguage } from "@/lib/hooks/useLanguage"
import { cn } from "@/lib/utils"

import { navItems } from "@/constants/nav"

export interface SidebarProps {
  className?: string
}
export function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [navEntered, setNavEntered] = useState(false)
  const [mobileNavEntered, setMobileNavEntered] = useState(false)

  const pathname = usePathname()
  const { t } = useLanguage()

  const mobileNavbarRef = useRef<HTMLDivElement>(null)
  useClickOutside(mobileNavbarRef, () => setOpen(false), open)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!visible) return
    const timeout = setTimeout(
      () => setNavEntered(true),
      (navItems.length - 1) * 60 + 300
    )
    return () => clearTimeout(timeout)
  }, [visible])

  useEffect(() => {
    if (!open) return
    const timeout = setTimeout(
      () => setMobileNavEntered(true),
      (navItems.length - 1) * 60 + 400
    )
    return () => {
      clearTimeout(timeout)
      setMobileNavEntered(false)
    }
  }, [open])

  const fullTitle = t("metadata.title").split(" - ")
  const title = fullTitle[0]
  const subtitle = fullTitle[1]

  return (
    <>
      <div className="flex flex-col md:hidden">
        <header
          className={cn(
            "flex items-center border-b-2 border-border transition duration-400 gap-4 shadow-2xs z-10 justify-between relative",
            visible
              ? "translate-y-0 opacity-100 ease-out"
              : "-translate-y-4 opacity-0 ease-in pointer-events-none",
            className
          )}>
          <div className="flex items-center gap-3 px-4 py-3 shrink-0">
            <span className="text-lg font-semibold tracking-wide mb-0.5">
              {title}
            </span>
            {subtitle && (
              <span className="text-xs uppercase text-muted font-light tracking-wider">
                {subtitle}
              </span>
            )}
          </div>
          <div
            ref={mobileNavbarRef}
            className="h-full">
            <Button
              onClick={() => setOpen((value) => !value)}
              ariaExpanded={open}
              ariaLabel={t("nav.menu")}
              title={t("nav.menu")}
              className="h-full aspect-square">
              <TextAlignJustify
                width={16}
                height={16}
                className="shrink-0 transition-colors"
              />
            </Button>
            <Options
              open={open}
              from="bottom"
              className="py-0 mx-4 left-0 right-0">
              <nav className="flex flex-col py-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Button
                      key={item.href}
                      href={item.href}
                      selected={isActive}
                      onClick={() => setOpen(false)}
                      className="justify-start py-2.5 shrink-0">
                      <span
                        className={cn(
                          "inline-block transition-[opacity,translate] duration-400",
                          open
                            ? "translate-x-0 opacity-100 ease-out"
                            : "translate-x-4 opacity-0 ease-in"
                        )}
                        style={{
                          transitionDelay:
                            open && !mobileNavEntered
                              ? `${index * 60}ms`
                              : "0ms"
                        }}>
                        {t(item.labelKey)}
                      </span>
                    </Button>
                  )
                })}
              </nav>
              <div className="flex items-center justify-between border-t border-border transition-colors">
                <ThemeSwitcher className="h-10" />
                <LanguageSwitcher
                  className="h-10"
                  optionsFrom="left"
                  optionsClassName="right-0 top-[calc(100%+1rem)] bottom-auto left-auto"
                />
              </div>
            </Options>
          </div>
        </header>
      </div>

      <aside
        className={cn(
          "hidden md:flex flex-col md:w-60 md:border-r-2 border-border transition duration-400 shadow-xs z-10 relative",
          visible
            ? "translate-x-0 opacity-100 ease-out"
            : "-translate-x-4 opacity-0 ease-in pointer-events-none",
          className
        )}>
        <div className="flex py-6 pl-6 pr-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-semibold tracking-wide">{title}</span>
            {subtitle && (
              <span className="text-xs uppercase text-muted font-light tracking-wider">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <nav className="flex flex-1 flex-col px-4 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                href={item.href}
                selected={isActive}
                className="justify-start py-2.5 shrink-0">
                <span
                  className={cn(
                    "inline-block transition-[opacity,translate] duration-400",
                    visible
                      ? "translate-x-0 opacity-100 ease-out"
                      : "translate-x-4 opacity-0 ease-in"
                  )}
                  style={{
                    transitionDelay:
                      visible && !navEntered ? `${index * 60}ms` : "0ms"
                  }}>
                  {t(item.labelKey)}
                </span>
              </Button>
            )
          })}
        </nav>

        <div className="flex gap-2 border-t border-border px-4 py-3 items-center justify-between transition-colors">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </aside>
    </>
  )
}
