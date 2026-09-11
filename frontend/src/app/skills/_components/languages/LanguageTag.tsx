export interface LanguageTagProps {
  name: string
  color: string
  percent: number
  highlighted: boolean
}
export function LanguageTag({
  name,
  color,
  percent,
  highlighted
}: LanguageTagProps) {
  return (
    <div
      className="flex items-center gap-2 border border-border px-3 py-1.5 transition-colors cursor-default"
      style={highlighted ? { borderColor: color } : undefined}>
      <span
        className="h-2 w-2 shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="flex-1 truncate text-xs">{name}</span>
      <span className="text-2xs text-muted">{percent.toFixed(1)}%</span>
    </div>
  )
}
