"use client"

import { Loading } from "@/components/svg/Loading"
import { useLanguage } from "@/components/i18n/LanguageContext"

/**
 * Centered loading animation with a localized message.
 *
 * @returns The loader.
 */
export function Loader() {
  const { t } = useLanguage()

  return (
    <div className="grow flex flex-col items-center justify-center mb-44">
      <Loading
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center -mt-10 gap-1">
        <p className="font-medium text-lg">{t("common.loadingLine1")}</p>
        <p className="text-sm font-light text-muted">
          {t("common.loadingLine2")}
        </p>
      </div>
    </div>
  )
}
