import { useLanguage } from "@/components/i18n/LanguageContext"

import { splitTitle } from "@/lib/utils/i18n"

import { AvailabilityBadge } from "./AvailabilityBadge"
import { ProfileLinks } from "./ProfileLinks"
import { RevealBlock } from "./RevealBlock"

const stepMs = 200

export interface HeroProps {
  githubProfileUrl: string
}

/**
 * Displays the introduction: name and role, then pitch and availability, then profile links.
 *
 * Each group slides in from the right after the previous one. From `md` upward, the profile links
 * sit at the bottom of the column.
 *
 * @param props - Component props.
 * @param props.githubProfileUrl - URL of the GitHub profile, resolved on the server.
 * @returns The hero section.
 */
export function Hero({ githubProfileUrl }: HeroProps) {
  const { t } = useLanguage()
  const { title: name, subtitle: role } = splitTitle(t("metadata.title"))

  return (
    <section className="flex flex-col gap-6 md:flex-1">
      <RevealBlock
        step={0}
        stepMs={stepMs}
        direction="left"
        className="flex flex-col gap-2">
        <p className="text-sm text-muted">{t("home.greeting")}</p>
        <h1 className="text-5xl tracking-tight md:text-6xl">{name}</h1>
        {role && (
          <p className="text-lg font-light text-muted md:text-xl">{role}</p>
        )}
      </RevealBlock>

      <RevealBlock
        step={1}
        stepMs={stepMs}
        direction="left"
        className="flex flex-col items-start gap-5">
        <p className="max-w-md text-sm leading-6">{t("home.pitch")}</p>
        <AvailabilityBadge />
      </RevealBlock>

      <RevealBlock
        step={2}
        stepMs={stepMs}
        direction="left"
        className="md:mt-auto">
        <ProfileLinks githubProfileUrl={githubProfileUrl} />
      </RevealBlock>
    </section>
  )
}
