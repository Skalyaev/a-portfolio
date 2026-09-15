import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { cn } from "@/lib/utils/style"

import { experiences } from "@/constants/experience/experiences"
import { availabilityStatus } from "@/constants/home/availability"

/**
 * Displays whether I am open to work, linking to the contact form, or employed, linking to the
 * current experience.
 *
 * @returns The availability badge.
 */
export function AvailabilityBadge() {
  const { t } = useLanguage()

  const isOpenToWork = availabilityStatus === "openToWork"
  const currentExperience = experiences.at(0)
  const label =
    isOpenToWork || !currentExperience
      ? t(`home.availability.${availabilityStatus}`)
      : `${t("home.availability.employed")} ${currentExperience.company}`
  const href =
    isOpenToWork || !currentExperience
      ? "/contact"
      : `/experience#${currentExperience.id}`

  return (
    <Button
      href={href}
      className="gap-2.5 border-2 border-border px-3 py-1.5 text-xs shadow-xs hover:border-foreground hover:bg-background focus-visible:border-foreground focus-visible:bg-background">
      <span className="relative flex size-2">
        {isOpenToWork && (
          <span className="absolute inline-flex size-full animate-ping bg-emerald-500 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2",
            isOpenToWork ? "bg-emerald-500" : "bg-amber-500"
          )}
        />
      </span>
      <span>{label}</span>
    </Button>
  )
}
