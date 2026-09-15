import type { IconProps } from "@/constants/icons"

/**
 * French flag, used for the French locale.
 *
 * @param props - Size and classes.
 * @returns The SVG flag.
 */
export function Fr({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 640 480"
      className={className}>
      <path
        fill="#fff"
        d="M0 0h640v480H0z"
      />
      <path
        fill="#000091"
        d="M0 0h213.3v480H0z"
      />
      <path
        fill="#e1000f"
        d="M426.7 0H640v480H426.7z"
      />
    </svg>
  )
}
