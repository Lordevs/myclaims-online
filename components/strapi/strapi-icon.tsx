import { Icon } from "@iconify/react"
import type { IconhubField } from "@/lib/strapi/types/shared"

interface StrapiIconProps {
  icon: IconhubField | { name: string; selectIcon?: string } | null | undefined
  size?: number
  className?: string
}

/**
 * Renders an iconhub icon stored in Strapi using @iconify/react.
 * Strapi stores both `iconName` (e.g. "mdi:home") and `iconData` (raw SVG).
 * We use `iconName` for clean rendering via Iconify.
 * Fallback to Lucide Iconify set if a raw icon name is passed.
 *
 * Usage:
 *   <StrapiIcon icon={card.icon} size={24} className="text-primary" />
 */
export function StrapiIcon({ icon, size = 24, className }: StrapiIconProps) {
  if (!icon) return null

  let name =
    ("iconName" in icon ? icon.iconName : null) ||
    ("name" in icon ? icon.name : null)
  if (!name) return null

  // Prefix simple names with lucide for Iconify compatibility
  if (!name.includes(":")) {
    name = `lucide:${name}`
  }

  return <Icon icon={name} width={size} height={size} className={className} />
}
