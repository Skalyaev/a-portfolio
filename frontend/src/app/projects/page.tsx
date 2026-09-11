import { Suspense } from "react"

import { Loader } from "@/components/status/Loader"

import { getProjects } from "./_lib/getProjects"
import { ProjectsBrowser } from "./_components/ProjectsBrowser"

async function ProjectsData() {
  const projects = await getProjects()
  return <ProjectsBrowser projects={projects} />
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex flex-col">
          <Loader />
        </div>
      }>
      <ProjectsData />
    </Suspense>
  )
}
