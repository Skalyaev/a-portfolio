import { getSkills } from "./_lib/getSkills"
import { SkillsView } from "./_components/SkillsView"

/**
 * Gathers the language statistics and renders the skills view; `loading.tsx` is shown meanwhile.
 *
 * @returns The skills page content.
 */
export default async function SkillsPage() {
  const { languages, otherLanguagesPercent, projectsByLanguage } =
    await getSkills()

  return (
    <SkillsView
      languages={languages}
      otherLanguagesPercent={otherLanguagesPercent}
      projectsByLanguage={projectsByLanguage}
    />
  )
}
