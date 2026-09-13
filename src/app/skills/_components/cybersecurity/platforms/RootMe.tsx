import { RootMe as RootMeIcon } from "@/components/svg/RootMe"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useToggleList } from "@/lib/hooks/useToggleList"
import { formatFullDate, fullYearsSince } from "@/lib/utils/date"

import {
  rootMeActivityHorizon,
  rootMeData,
  rootMeProfile
} from "@/constants/skills/rootme"

import { toActivityItems } from "../../../_lib/cyberSecurity"
import { ProfileCard } from "../ProfileCard"
import { StatTile } from "../StatTile"
import { CategoryProgressList } from "../CategoryProgressList"
import { ActivityList } from "../ActivityList"

import type { HtbEntry } from "@/constants/skills/hackthebox"

const solvedChallenges: HtbEntry[] = rootMeData.categories.flatMap((category) =>
  category.solvedChallenges.map((challenge) => ({
    ...challenge,
    category: category.name
  }))
)

/**
 * Displays the Root-Me card: stats, category progress and solved challenges.
 *
 * Challenges without a date are labeled as older than the activity horizon.
 *
 * @returns The Root-Me profile card.
 */
export function RootMe() {
  const { t, locale } = useLanguage()
  const { items: selectedCategories, toggle: toggleCategory } =
    useToggleList<string>()

  const activityHorizonYears = fullYearsSince(rootMeActivityHorizon)
  const olderThanLabel = `${t("skills.cybersecurity.moreThan")} ${activityHorizonYears} ${
    activityHorizonYears === 1
      ? t("skills.cybersecurity.yearSingular")
      : t("skills.cybersecurity.yearPlural")
  }`

  return (
    <ProfileCard
      icon={
        <RootMeIcon
          width={20}
          height={20}
        />
      }
      title={rootMeProfile.name}
      href={rootMeProfile.profileUrl}
      className="-mt-2"
      viewProfileLabel={t("skills.cybersecurity.viewProfile")}
      description={t("skills.cybersecurity.rootme.description")}
      headerNote={`${t("skills.cybersecurity.lastUpdated")} ${formatFullDate(rootMeData.lastUpdated, locale)}`}
      left={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <StatTile
              label={t("skills.cybersecurity.rootme.solved")}
              value={`${rootMeData.challengesSolved} / ${rootMeData.challengesTotal}`}
            />
            <StatTile
              label={t("skills.cybersecurity.ctf")}
              value={`${rootMeData.machinesSolved} / ${rootMeData.machinesTotal}`}
            />
            <StatTile
              label={t("skills.cybersecurity.rank")}
              value={`#${rootMeData.rank}`}
            />
          </div>
          <CategoryProgressList
            categories={rootMeData.categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
        </div>
      }
      right={
        <ActivityList
          items={toActivityItems(
            solvedChallenges,
            selectedCategories,
            locale,
            olderThanLabel
          )}
        />
      }
    />
  )
}
