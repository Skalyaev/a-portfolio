import type { ComponentType } from "react"

export interface IconProps {
  className?: string
  width?: number | string
  height?: number | string
  fill?: boolean
}

export type IconComponent = ComponentType<IconProps>
