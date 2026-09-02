"use client"

import { useState } from "react"

import { Loader } from "@/components/status/Loader"

import { useLanguage } from "@/lib/hooks/useLanguage"

export default function Home() {
  const [loading, setLoading] = useState(true)

  const { t } = useLanguage()

  return (
    <div className="h-full w-full flex flex-col">
      {loading ? <Loader /> : <h1>{t("home.title")}</h1>}
    </div>
  )
}
