"use client"

import { Loading } from "@/components/svg/Loading"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { cn } from "@/lib/utils/style"

export interface LoaderProps {
  className?: string
}

/**
 * Centered loading animation with a localized message.
 *
 * @param props - Extra container classes.
 * @returns The loader.
 */
export function Loader({ className }: LoaderProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        "grow flex flex-col items-center justify-center mb-44",
        className
      )}>
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
