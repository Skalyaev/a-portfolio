import { Button } from "@/components/tag/Button"
import { GitHub } from "@/components/svg/GitHub"
import { HackTheBox } from "@/components/svg/HackTheBox"
import { LinkedIn } from "@/components/svg/LinkedIn"
import { RootMe } from "@/components/svg/RootMe"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { linkedinProfileUrl } from "@/constants/home/profiles"
import { hackTheBoxLab } from "@/constants/skills/hackthebox"
import { rootMeProfile } from "@/constants/skills/rootme"
import { labelClassName } from "@/constants/style"

import type { IconComponent } from "@/constants/icons"

interface ProfileLink {
  name: string
  href: string
  Icon: IconComponent
}

export interface ProfileLinksProps {
  githubProfileUrl: string
}

/**
 * Lists my public profiles as external links: LinkedIn, GitHub, Root-Me and HackTheBox.
 *
 * @param props - Component props.
 * @param props.githubProfileUrl - URL of the GitHub profile, resolved on the server.
 * @returns The profile links.
 */
export function ProfileLinks({ githubProfileUrl }: ProfileLinksProps) {
  const { t } = useLanguage()

  const links: ProfileLink[] = [
    { name: "LinkedIn", href: linkedinProfileUrl, Icon: LinkedIn },
    { name: "GitHub", href: githubProfileUrl, Icon: GitHub },
    { name: rootMeProfile.name, href: rootMeProfile.profileUrl, Icon: RootMe },
    { name: "HackTheBox", href: hackTheBoxLab.profileUrl, Icon: HackTheBox }
  ]

  return (
    <div className="flex flex-col gap-2 select-none">
      <span className={labelClassName}>{t("home.profiles")}</span>
      <ul className="grid grid-cols-2 gap-2">
        {links.map(({ name, href, Icon }) => (
          <li key={name}>
            <Button
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-start gap-2 border-2 border-border px-3 py-1.5 text-xs shadow-xs hover:border-foreground hover:bg-background focus-visible:border-foreground focus-visible:bg-background">
              <Icon
                width={14}
                height={14}
                className="shrink-0"
              />
              <span className="truncate">{name}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
