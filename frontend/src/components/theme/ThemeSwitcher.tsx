"use client"

import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/hooks/useLanguage"
import { useHasMounted } from "@/lib/hooks/useHasMounted"
import { cn } from "@/lib/utils"

const options = [
  { value: "light", icon: "☀" },
  { value: "dark", icon: "☾" },
  { value: "system", icon: "◐" }
] as const

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const mounted = useHasMounted()

  return (
    <div className="flex border border-border">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setTheme(option.value)}
          disabled={!mounted}
          aria-label={t(`theme.${option.value}`)}
          title={t(`theme.${option.value}`)}
          className={cn(
            "flex-1 px-2 py-1.5 text-sm transition-colors",
            mounted && theme === option.value
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          )}>
          {option.icon}
        </button>
      ))}
    </div>
  )
}
