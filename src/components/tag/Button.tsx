import Link from "next/link"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils/style"

import type { ReactNode } from "react"
import type { CssVariablesStyle } from "@/lib/utils/style"

export interface ButtonProps {
  children: ReactNode
  type?: "button" | "submit"
  selected?: boolean
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  className?: string
  style?: CssVariablesStyle
  disabled?: boolean
  suppressHydrationWarning?: boolean
  title?: string
  ariaLabel?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  animateBackground?: "fromLeft" | "fromRight"
}

const interactiveVariants: string[] = ["hover", "focus-visible"]

/**
 * Removes the classes applied on hover or keyboard focus, whatever their other variants.
 *
 * @param classNames - Space-separated class list.
 * @returns The class list without any class carrying a `hover` or `focus-visible` variant.
 */
function withoutInteractiveClasses(classNames: string): string {
  return classNames
    .split(" ")
    .filter(
      (token) =>
        !token
          .split(":")
          .slice(0, -1)
          .some((variant) => interactiveVariants.includes(variant))
    )
    .join(" ")
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
  type = "button",
  selected,
  onClick,
  href,
  target,
  rel,
  className,
  style,
  disabled,
  suppressHydrationWarning,
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

  const mergedStyles = cn(
    "relative cursor-pointer bg-background text-muted text-sm font-medium inline-flex gap-1 items-center justify-center focus-visible:outline-none px-3 py-2 hover:text-foreground focus-visible:text-foreground transition hover:bg-accent focus-visible:bg-accent overflow-hidden select-none",
    disabled && "cursor-not-allowed opacity-50",
    selected &&
      (animateBackground
        ? "text-background hover:text-background focus-visible:text-background"
        : "bg-foreground text-background hover:text-background focus-visible:text-background hover:bg-foreground focus-visible:bg-foreground"),
    className
  )
  const styles = disabled
    ? withoutInteractiveClasses(mergedStyles)
    : mergedStyles

  const backgroundLayer = animateBackground && (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-0 h-full bg-foreground pointer-events-none transition-[width] duration-300 ease-out",
        animateBackground === "fromLeft" ? "left-0" : "right-0",
        isMounted && selected ? "w-full" : "w-0"
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
      type={type}
      onClick={onClick}
      className={styles}
      style={style}
      disabled={disabled}
      suppressHydrationWarning={suppressHydrationWarning}
      title={title}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}>
      {backgroundLayer}
      {content}
    </button>
  )
}
