import type { IconProps } from "@/constants/icons"

interface Dot {
  x: number
  animationClass: string
}

const dots: Dot[] = [
  { x: 233, animationClass: "dot-bounce-0" },
  { x: 341, animationClass: "dot-bounce-1" },
  { x: 449, animationClass: "dot-bounce-2" },
  { x: 557, animationClass: "dot-bounce-3" }
]

/**
 * Animated four bouncing dots loading indicator, drawn with the current text color.
 *
 * @param props - Size and classes.
 * @returns The SVG animation.
 */
export function Loading({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 800 800"
      className={className}>
      {dots.map((dot) => (
        <g
          key={dot.x}
          transform={`translate(${dot.x},355)`}>
          <g className={dot.animationClass}>
            <g transform="matrix(1,0,0,1,2,36)">
              <ellipse
                ry="24"
                rx="24"
                cy="0"
                cx="0"
                fill="currentColor"
              />
            </g>
          </g>
        </g>
      ))}
    </svg>
  )
}
