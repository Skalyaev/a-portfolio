"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/tag/Button"
import { Sun } from "@/components/svg/Sun"
import { Moon } from "@/components/svg/Moon"

import { useLanguage } from "@/lib/hooks/useLanguage"
import { useHasMounted } from "@/lib/hooks/useHasMounted"
import { cn } from "@/lib/utils/style"

const options = [
  { value: "light", Icon: Sun, animateBackground: "fromRight" },
  { value: "dark", Icon: Moon, animateBackground: "fromLeft" }
] as const

export interface ThemeSwitcherProps {
  className?: string
}
export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const mounted = useHasMounted()
  const { t } = useLanguage()

  return (
    <div className={cn("flex h-8", className)}>
      {options.map(({ value, Icon, animateBackground }) => {
        const isSelected = mounted && resolvedTheme === value
        return (
          <Button
            key={value}
            onClick={() => setTheme(value)}
            className="w-max h-full px-4"
            disabled={!mounted}
            suppressHydrationWarning
            selected={isSelected}
            animateBackground={animateBackground}
            ariaLabel={t(`theme.${value}`)}
            title={t(`theme.${value}`)}>
            <Icon
              width={16}
              height={16}
              fill={isSelected}
              className="transition-colors"
            />
          </Button>
        )
      })}
    </div>
  )
}
