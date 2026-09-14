"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils/style"

export interface ButtonProps {
  children?: React.ReactNode
  selected?: boolean
  onClick?: (event: React.MouseEvent) => void
  href?: string
  target?: string
  rel?: string
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  suppressHydrationWarning?: boolean
  tabIndex?: number
  title?: string
  ariaLabel?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  animateBackground?: "fromLeft" | "fromRight" | "fromTop" | "fromBottom"
}

/**
 * Styled button rendered as a Next.js `Link` when `href` is set, or a native `button` otherwise.
 * A disabled link is rendered as a disabled `button` so it can neither be focused nor followed.
 *
 * @param props - Content, selected/disabled state, link attributes and background animation.
 * @returns The link or button element.
 */
export function Button({
  children,
  selected,
  onClick,
  href,
  target,
  rel,
  className,
  style,
  disabled,
  suppressHydrationWarning,
  tabIndex,
  title,
  ariaLabel,
  ariaExpanded,
  ariaPressed,
  animateBackground
}: ButtonProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!animateBackground) return
    const frame = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [animateBackground])

  const backgroundGrown = isMounted && selected
  const isHorizontalAnimation =
    animateBackground === "fromLeft" || animateBackground === "fromRight"

  const styles = cn(
    "relative cursor-pointer bg-background text-muted text-sm font-medium inline-flex gap-1 items-center justify-center focus-visible:outline-none px-3 py-2 hover:text-foreground focus-visible:text-foreground transition hover:bg-accent focus-visible:bg-accent overflow-hidden select-none",
    disabled &&
      "cursor-not-allowed opacity-50 hover:bg-background focus-visible:bg-background hover:text-muted focus-visible:text-muted",
    selected &&
      (animateBackground
        ? "text-background hover:text-background focus-visible:text-background"
        : "bg-foreground text-background hover:text-background focus-visible:text-background hover:bg-foreground focus-visible:bg-foreground"),
    className
  )

  const backgroundLayer = animateBackground && (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bg-foreground pointer-events-none",
        isHorizontalAnimation
          ? "top-0 h-full transition-[width] duration-300 ease-out"
          : "left-0 w-full transition-[height] duration-300 ease-out",
        animateBackground === "fromLeft" && "left-0",
        animateBackground === "fromRight" && "right-0",
        animateBackground === "fromTop" && "top-0",
        animateBackground === "fromBottom" && "bottom-0",
        isHorizontalAnimation
          ? backgroundGrown
            ? "w-full"
            : "w-0"
          : backgroundGrown
            ? "h-full"
            : "h-0"
      )}
    />
  )

  const content = animateBackground ? (
    <span className="relative z-10 inline-flex gap-1 items-center">
      {children}
    </span>
  ) : (
    children
  )

  if (href && !disabled) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={styles}
        style={style}
        tabIndex={tabIndex}
        title={title}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        suppressHydrationWarning={suppressHydrationWarning}>
        {backgroundLayer}
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles}
      style={style}
      disabled={disabled}
      suppressHydrationWarning={suppressHydrationWarning}
      tabIndex={tabIndex}
      title={title}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}>
      {backgroundLayer}
      {content}
    </button>
  )
}
