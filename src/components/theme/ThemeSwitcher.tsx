import { useTheme } from "next-themes"

import { Button } from "@/components/tag/Button"
import { Sun } from "@/components/svg/Sun"
import { Moon } from "@/components/svg/Moon"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useHasMounted } from "@/lib/hooks/useHasMounted"
import { cn } from "@/lib/utils/style"

import type { ButtonProps } from "@/components/tag/Button"
import type { IconComponent } from "@/constants/icons"

interface ThemeOption {
  value: "light" | "dark"
  Icon: IconComponent
  animateBackground: NonNullable<ButtonProps["animateBackground"]>
}

const options: ThemeOption[] = [
  { value: "light", Icon: Sun, animateBackground: "fromRight" },
  { value: "dark", Icon: Moon, animateBackground: "fromLeft" }
]

export interface ThemeSwitcherProps {
  className?: string
}

/**
 * Pair of buttons to switch between light and dark themes.
 *
 * @param props - Extra container classes.
 * @returns The theme switcher.
 */
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
