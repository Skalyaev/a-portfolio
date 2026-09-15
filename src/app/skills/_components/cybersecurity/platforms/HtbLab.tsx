import { useMemo } from "react"

import { HackTheBox } from "@/components/svg/HackTheBox"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useToggleList } from "@/lib/hooks/useToggleList"
import { formatFullDate } from "@/lib/utils/date"

import { hackTheBoxLab, hackTheBoxLabData } from "@/constants/skills/hackthebox"

import { toActivityItems } from "../../../_lib/cyberSecurity"
import { ProfileCard } from "../ProfileCard"
import { StatTile } from "../StatTile"
import { CategoryProgressList } from "../CategoryProgressList"
import { ActivityList } from "../ActivityList"

import type { ActivityEntry } from "@/constants/skills/profile"

const unknownRankLabel = "—"

/**
 * Displays the HackTheBox Lab card: stats, challenge category progress and solved challenges.
 *
 * @returns The HTB Lab profile card.
 */
export function HtbLab() {
  const { t, locale } = useLanguage()
  const { items: selectedCategories, toggle: toggleCategory } =
    useToggleList<string>()

  const {
    lastUpdated,
    rank,
    challengesSolved,
    challengesTotal,
    machinesSolved,
    machinesTotal,
    challengeCategories,
    solvedChallenges
  } = hackTheBoxLabData
  const activityItems = useMemo<ActivityEntry[]>(
    () => toActivityItems(solvedChallenges, selectedCategories, locale),
    [solvedChallenges, selectedCategories, locale]
  )

  return (
    <ProfileCard
      icon={
        <HackTheBox
          width={20}
          height={20}
        />
      }
      title={hackTheBoxLab.name}
      href={hackTheBoxLab.profileUrl}
      viewProfileLabel={t("skills.cybersecurity.viewProfile")}
      description={t("skills.cybersecurity.htb.description")}
      headerNote={`${t("skills.cybersecurity.lastUpdated")} ${formatFullDate(lastUpdated, locale)}`}
      left={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <StatTile
              label={t("skills.cybersecurity.htb.challengesSolved")}
              value={`${challengesSolved} / ${challengesTotal}`}
            />
            <StatTile
              label={t("skills.cybersecurity.ctf")}
              value={`${machinesSolved} / ${machinesTotal}`}
            />
            <StatTile
              label={t("skills.cybersecurity.rank")}
              value={rank !== null ? `#${rank}` : unknownRankLabel}
            />
          </div>
          <CategoryProgressList
            categories={challengeCategories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
        </div>
      }
      right={<ActivityList items={activityItems} />}
    />
  )
}
