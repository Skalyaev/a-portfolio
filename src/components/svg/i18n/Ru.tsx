import type { IconProps } from "@/constants/icons"

/**
 * Russian flag, used for the Russian locale.
 *
 * @param props - Size and classes.
 * @returns The SVG flag.
 */
export function Ru({ className, width = 24, height = 24 }: IconProps) {
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
        fill="#0039a6"
        d="M0 160h640v320H0z"
      />
      <path
        fill="#d52b1e"
        d="M0 320h640v160H0z"
      />
    </svg>
  )
}
