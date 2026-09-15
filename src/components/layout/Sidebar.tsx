"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/tag/Button"
import { Options } from "@/components/tag/Options"
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { Bars } from "@/components/svg/Bars"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useClickOutside } from "@/lib/hooks/useClickOutside"
import { cn } from "@/lib/utils/style"

import { navItems } from "@/constants/nav"

import type { ButtonProps } from "@/components/tag/Button"

const cascadeStepMs = 60

interface BrandProps {
  className: string
  titleClassName: string
}

/**
 * Site title and optional subtitle, split from the localized `metadata.title` on `" - "`.
 *
 * @param props - Classes of the wrapper and of the title.
 * @returns The brand block.
 */
function Brand({ className, titleClassName }: BrandProps) {
  const { t } = useLanguage()
  const [title, subtitle] = t("metadata.title").split(" - ")

  return (
    <div className={className}>
      <span className={titleClassName}>{title}</span>
      {subtitle && (
        <span className="text-xs uppercase text-muted font-light tracking-wider">
          {subtitle}
        </span>
      )}
    </div>
  )
}

interface NavItemsProps {
  shown: boolean
  cascading: boolean
  className: string
  animateBackground?: ButtonProps["animateBackground"]
  onNavigate?: () => void
}

/**
 * Navigation links sliding in one after another when they become visible.
 *
 * @param props - Visibility, whether the staggered delay applies, classes, background animation and click handler.
 * @returns The navigation list.
 */
function NavItems({
  shown,
  cascading,
  className,
  animateBackground,
  onNavigate
}: NavItemsProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <nav className={cn("flex flex-col", className)}>
      {navItems.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <Button
            key={item.href}
            href={item.href}
            selected={isActive}
            onClick={onNavigate}
            animateBackground={animateBackground}
            className="justify-start py-2.5 shrink-0 group">
            <span
              className={cn(
                "inline-block transition-[opacity,translate] duration-400",
                shown
                  ? "translate-x-0 opacity-100 ease-out"
                  : "translate-x-4 opacity-0 ease-in"
              )}
              style={{
                transitionDelay:
                  shown && cascading ? `${index * cascadeStepMs}ms` : "0ms"
              }}>
              {animateBackground ? (
                <span
                  className={cn(
                    isActive
                      ? "text-background"
                      : "text-muted group-hover:transition-colors group-hover:text-foreground"
                  )}>
                  {t(item.labelKey)}
                </span>
              ) : (
                t(item.labelKey)
              )}
            </span>
          </Button>
        )
      })}
    </nav>
  )
}

/**
 * Site navigation: a top header with a dropdown menu on mobile and a side panel on desktop.
 *
 * @returns The responsive navigation.
 */
export function Sidebar() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [navEntered, setNavEntered] = useState(false)
  const [mobileNavEntered, setMobileNavEntered] = useState(false)

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
      (navItems.length - 1) * cascadeStepMs + 300
    )
    return () => clearTimeout(timeout)
  }, [visible])

  useEffect(() => {
    if (!open) return
    const timeout = setTimeout(
      () => setMobileNavEntered(true),
      (navItems.length - 1) * cascadeStepMs + 400
    )
    return () => {
      clearTimeout(timeout)
      setMobileNavEntered(false)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "flex md:hidden items-center border-b-2 border-border transition duration-400 gap-4 shadow-2xs z-10 justify-between relative",
          visible
            ? "translate-y-0 opacity-100 ease-out"
            : "-translate-y-4 opacity-0 ease-in pointer-events-none"
        )}>
        <Brand
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          titleClassName="text-lg font-semibold tracking-wide mb-0.5"
        />
        <div
          ref={mobileNavbarRef}
          className="h-full">
          <Button
            onClick={() => setOpen((value) => !value)}
            ariaExpanded={open}
            ariaLabel={t("nav.menu")}
            title={t("nav.menu")}
            className="h-full aspect-square">
            <Bars
              width={16}
              height={16}
              className="shrink-0 transition-colors"
            />
          </Button>
          <Options
            open={open}
            from="bottom"
            className="py-0 mx-4 left-0 right-0">
            <NavItems
              shown={open}
              cascading={!mobileNavEntered}
              onNavigate={() => setOpen(false)}
              className="py-1"
            />
            <div className="flex items-center justify-between border-t border-border transition-colors">
              <ThemeSwitcher className="h-10" />
              <LanguageSwitcher
                className="h-10"
                optionsFrom="bottom"
                optionsClassName="right-0 bottom-auto"
              />
            </div>
          </Options>
        </div>
      </header>

      <aside
        className={cn(
          "hidden md:flex flex-col md:w-60 md:border-r-2 border-border transition duration-400 shadow-xs z-10 relative",
          visible
            ? "translate-x-0 opacity-100 ease-out"
            : "-translate-x-4 opacity-0 ease-in pointer-events-none"
        )}>
        <Brand
          className="flex flex-col gap-0.5 p-6"
          titleClassName="text-xl font-semibold tracking-wide"
        />

        <NavItems
          shown={visible}
          cascading={!navEntered}
          animateBackground="fromLeft"
          className="flex-1 px-4 overflow-y-auto"
        />

        <div className="flex gap-2 border-t border-border px-4 py-3 items-center justify-between transition-colors">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </aside>
    </>
  )
}
