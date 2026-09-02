export interface TextAlignJustifyProps {
  className?: string
  width?: number | string
  height?: number | string
  fill?: boolean
}
export function TextAlignJustify({
  className,
  width = 24,
  height = 24,
  fill = false
}: TextAlignJustifyProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path d="M3 5h18" />
      <path d="M3 12h18" />
      <path d="M3 19h18" />
    </svg>
  )
}
