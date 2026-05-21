import Link from "next/link"
import { cn } from "@/lib/utils"
import { useNavigationState } from "@/hooks/use-navigation-state"
import { ChevronRight } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import { resolveStrapiLink } from "@/lib/strapi/utils"
import type { NavbarItem } from "@/lib/strapi/types/global"

interface DesktopNavProps {
  className?: string
  itemClassName?: string
  onClick?: () => void
  /** Strapi nav items */
  navItems?: NavbarItem[]
}

export function DesktopNav({
  className,
  itemClassName,
  onClick,
  navItems,
}: DesktopNavProps) {
  const { isActive } = useNavigationState()

  if (!navItems || navItems.length === 0) return null

  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className="gap-8 space-x-0">
        {navItems.map((item) => {
          // ── shared.dropdown → dropdown with menu items ──
          if (item.__component === "shared.dropdown") {
            const isDropdownActive = item.items.some(
              (sub) => sub.page && isActive(`/${sub.page.slug === "home" ? "" : sub.page.slug}`)
            )
            return (
              <NavigationMenuItem key={`dropdown-${item.id}`}>
                <NavigationMenuTrigger
                  className={cn(
                    "relative flex cursor-pointer items-center text-[13px] font-extrabold tracking-wider uppercase transition-all duration-200 select-none focus:outline-hidden",
                    "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent!",
                    "h-auto rounded-none border-0 px-0 py-2 text-white/80 hover:text-white data-[state=open]:text-white [&_svg]:hidden",
                    isDropdownActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                >
                  {item.label}
                  {isDropdownActive && (
                    <span className="absolute right-0 bottom-[4px] left-0 h-[3px] rounded-full bg-[#F58220]" />
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-1/2 z-50 mt-[20px]! w-[340px]! min-w-[340px]! -translate-x-1/2 animate-in overflow-hidden! rounded-xl! border border-white/10! bg-primary! p-0! text-white! shadow-none! fade-in-0 zoom-in-95">
                  <div className="flex flex-col bg-primary py-1.5">
                    {item.items.map((subItem, idx) => {
                      const href = subItem.page
                        ? subItem.page.slug === "home" ? "/" : `/${subItem.page.slug}`
                        : "#"
                      const isSubActive = isActive(href)
                      return (
                        <NavigationMenuLink asChild key={subItem.id}>
                          <Link
                            href={href}
                            onClick={onClick}
                            className={cn(
                              "flex w-full cursor-pointer items-center justify-between rounded-none border-b border-white/5 bg-transparent px-6 py-4.5 text-left outline-hidden transition-all duration-150",
                              "text-white/80! hover:bg-white/5! hover:text-white! focus:bg-white/5! focus:text-white!",
                              idx === item.items.length - 1 && "border-b-0",
                              isSubActive ? "bg-white/10! font-bold text-white!" : ""
                            )}
                          >
                            <div className="flex items-center gap-4">
                              {subItem.icon && (
                                <StrapiIcon icon={subItem.icon} size={20} className="text-white/85" />
                              )}
                              <span className="text-sm font-semibold tracking-wide">
                                {subItem.label}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-white/30" />
                          </Link>
                        </NavigationMenuLink>
                      )
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // ── shared.link → flat link ──
          const href = resolveStrapiLink(item)
          const isLinkActive = isActive(href)
          return (
            <NavigationMenuItem key={`link-${item.id}`}>
              <NavigationMenuLink asChild>
                <Link
                  href={href}
                  onClick={onClick}
                  className={cn(
                    "relative cursor-pointer py-2 text-[13px] font-extrabold tracking-wider uppercase transition-all duration-200 select-none",
                    "rounded-none border-0 bg-transparent p-0 text-white/80 hover:bg-transparent hover:text-white focus:bg-transparent active:bg-transparent",
                    isLinkActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                  {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.label}
                  {isLinkActive && (
                    <span className="absolute right-0 bottom-[-4px] left-0 h-[3px] rounded-full bg-[#F58220]" />
                  )}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
