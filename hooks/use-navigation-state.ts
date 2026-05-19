"use client"

import { usePathname } from "next/navigation"

/**
 * Hook to manage active navigation state.
 * Centralizes the logic for determining if a link or a category is active.
 */
export function useNavigationState() {
  const pathname = usePathname()

  /**
   * Checks if a specific href is the current active route.
   */
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  /**
   * Checks if any of the provided sub-items are active.
   * Useful for mega-menus or dropdown parents.
   */
  const isCategoryActive = (items: { href: string }[]) => {
    return items.some((item) => isActive(item.href))
  }

  return {
    pathname,
    isActive,
    isCategoryActive,
  }
}
