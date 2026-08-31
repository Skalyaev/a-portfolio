"use client"

import { useLanguage } from "@/lib/hooks/useLanguage"

export function Heading({ translationKey }: { translationKey: string }) {
  const { t } = useLanguage()
  return <h1 className="text-3xl font-semibold">{t(translationKey)}</h1>
}
