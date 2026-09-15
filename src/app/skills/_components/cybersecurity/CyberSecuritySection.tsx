import { Section } from "@/components/layout/Section"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { RootMe } from "./platforms/RootMe"
import { HtbAcademy } from "./platforms/HtbAcademy"
import { HtbLab } from "./platforms/HtbLab"

/**
 * Renders the cybersecurity section with the Root-Me, HTB Academy and HTB Lab cards.
 *
 * @returns The cybersecurity section.
 */
export function CyberSecuritySection() {
  const { t } = useLanguage()

  return (
    <Section
      className="gap-8 pb-6 md:pb-10"
      title={t("skills.cybersecurity.title")}
      subtitle={t("skills.cybersecurity.subtitle")}>
      <RootMe />
      <HtbAcademy />
      <HtbLab />
    </Section>
  )
}
