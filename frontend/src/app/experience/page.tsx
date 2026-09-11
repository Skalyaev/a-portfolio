"use client"

import { useState } from "react"

import { Loader } from "@/components/status/Loader"

import { useLanguage } from "@/lib/hooks/useLanguage"

export default function ExperiencePage() {
  const [loading] = useState(true)

  const { t } = useLanguage()

  return (
    <div className="h-full w-full flex flex-col">
      {loading ? <Loader /> : <h1>{t("experience.title")}</h1>}
    </div>
  )
}
