import { Loading } from "@/components/svg/Loading"

import { useLanguage } from "@/lib/hooks/useLanguage"
import { cn } from "@/lib/utils"

export interface LoaderProps {
  className?: string
}

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
        <p className="font-medium">{t("common.loadingLine1")}</p>
        <p className="text-xs font-light text-muted">
          {t("common.loadingLine2")}
        </p>
      </div>
    </div>
  )
}
