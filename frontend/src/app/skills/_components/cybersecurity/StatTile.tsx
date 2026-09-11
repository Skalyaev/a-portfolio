export interface StatTileProps {
  label: string
  value: string
}
export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="flex flex-col gap-0.5 border border-border px-3 py-2">
      <span className="text-2xs text-muted uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}
