import { Suspense } from "react"

import { Loader } from "@/components/status/Loader"

import { getSkills } from "./_lib/getSkills"
import { getCyberSecurity } from "./_lib/getCyberSecurity"
import { SkillsView } from "./_components/SkillsView"

async function SkillsData() {
  const [{ languages, otherLanguagesPercent, projectsByLanguage }, cyberSecurity] =
    await Promise.all([getSkills(), getCyberSecurity()])

  return (
    <SkillsView
      languages={languages}
      otherLanguagesPercent={otherLanguagesPercent}
      projectsByLanguage={projectsByLanguage}
      cyberSecurity={cyberSecurity}
    />
  )
}

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex flex-col">
          <Loader />
        </div>
      }>
      <SkillsData />
    </Suspense>
  )
}
