export interface LoadingProps {
  className?: string
  width?: number | string
  height?: number | string
}

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

export function Loading({
  className,
  width = "100%",
  height = "100%"
}: LoadingProps) {
  return (
    <svg
      fill="none"
      height={height}
      width={width}
      viewBox="0 0 800 800"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
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
                fill="#3b3b3b"
              />
            </g>
          </g>
        </g>
      ))}
    </svg>
  )
}
