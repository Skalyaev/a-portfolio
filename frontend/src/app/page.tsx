"use client"

import { useLanguage } from "@/lib/hooks/useLanguage"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">{t("home.title")}</h1>
      <p className="max-w-xl text-muted">{t("home.description")}</p>
    </div>
  )
}
