import { HackTheBox } from "@/components/svg/HackTheBox"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useToggleList } from "@/lib/hooks/useToggleList"
import { formatFullDate } from "@/lib/utils/date"

import {
  hackTheBoxAcademy,
  hackTheBoxAcademyData
} from "@/constants/skills/hackthebox"

import { toActivityItems } from "../../../_lib/cyberSecurity"
import { ProfileCard } from "../ProfileCard"
import { StatTile } from "../StatTile"
import { CategoryProgressList } from "../CategoryProgressList"
import { ActivityList } from "../ActivityList"

const totalModules = hackTheBoxAcademyData.categories.reduce(
  (sum, category) => sum + category.total,
  0
)

/**
 * Displays the HackTheBox Academy card: module count, category progress and completed modules.
 *
 * @returns The HTB Academy profile card.
 */
export function HtbAcademy() {
  const { t, locale } = useLanguage()
  const { items: selectedCategories, toggle: toggleCategory } =
    useToggleList<string>()

  const { lastUpdated, categories, modules } = hackTheBoxAcademyData

  return (
    <ProfileCard
      icon={
        <HackTheBox
          width={20}
          height={20}
        />
      }
      title={hackTheBoxAcademy.name}
      href={hackTheBoxAcademy.profileUrl}
      viewProfileLabel={t("skills.cybersecurity.viewProfile")}
      description={t("skills.cybersecurity.academy.description")}
      headerNote={`${t("skills.cybersecurity.lastUpdated")} ${formatFullDate(lastUpdated, locale)}`}
      left={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <StatTile
              label={t("skills.cybersecurity.academy.modules")}
              value={`${modules.length} / ${totalModules}`}
            />
          </div>
          <CategoryProgressList
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
        </div>
      }
      right={
        <ActivityList
          items={toActivityItems(modules, selectedCategories, locale)}
        />
      }
    />
  )
}
