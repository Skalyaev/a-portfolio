import type { IconProps } from "@/constants/icons"

/**
 * Vue.js logo.
 *
 * @param props - Size and classes.
 * @returns The SVG icon.
 */
export function VueJs({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}>
      <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" />
    </svg>
  )
}
