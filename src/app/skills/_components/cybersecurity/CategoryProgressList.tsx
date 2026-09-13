import { useLanguage } from "@/components/i18n/LanguageContext"

import { translateCategory } from "../../_lib/cyberSecurity"
import { ProgressBar } from "./ProgressBar"

export interface CategoryProgress {
  name: string
  solved: number
  total: number
}

export interface CategoryProgressListProps {
  categories: CategoryProgress[]
  selectedCategories: string[]
  onToggleCategory: (name: string) => void
}

/**
 * Computes the completion percentage of a category.
 *
 * @param category - Category progress.
 * @returns The solved share in percent, or 0 for an empty category.
 */
function getCompletionPercent(category: CategoryProgress): number {
  return category.total > 0 ? (category.solved / category.total) * 100 : 0
}

/**
 * Lists toggleable category progress bars, most completed first.
 *
 * While a filter is active, unselected categories are dimmed.
 *
 * @param props - Categories, selected categories and toggle handler.
 * @returns The progress bar list.
 */
export function CategoryProgressList({
  categories,
  selectedCategories,
  onToggleCategory
}: CategoryProgressListProps) {
  const { t } = useLanguage()

  const sortedCategories: CategoryProgress[] = categories.toSorted(
    (a, b) => getCompletionPercent(b) - getCompletionPercent(a)
  )

  return (
    <div className="flex flex-col">
      {sortedCategories.map((category) => {
        const isSelected = selectedCategories.includes(category.name)
        return (
          <ProgressBar
            key={category.name}
            name={translateCategory(t, category.name)}
            solved={category.solved}
            total={category.total}
            percent={getCompletionPercent(category)}
            selected={isSelected}
            dimmed={selectedCategories.length > 0 && !isSelected}
            onToggle={() => onToggleCategory(category.name)}
          />
        )
      })}
    </div>
  )
}
