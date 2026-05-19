import * as React from "react"

export interface NavLink {
  label: string
  href?: string
  subItems?: {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}
