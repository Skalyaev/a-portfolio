import type { IconProps } from "@/constants/icons"

/**
 * Cross (close) icon (outline).
 *
 * @param props - Size and classes.
 * @returns The SVG icon.
 */
export function X({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  )
}
