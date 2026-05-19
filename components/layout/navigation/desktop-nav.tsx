import Link from "next/link"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/constants/navigation"
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

interface DesktopNavProps {
  className?: string
  itemClassName?: string
  onClick?: () => void
}

export function DesktopNav({
  className,
  itemClassName,
  onClick,
}: DesktopNavProps) {
  const { isActive } = useNavigationState()

  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className="gap-8 space-x-0">
        {NAV_LINKS.map((link) => {
          // Dropdown link using shadcn NavigationMenu
          if (link.subItems) {
            const subItems = link.subItems
            const isDropdownActive = subItems.some((sub) => isActive(sub.href))
            return (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuTrigger
                  className={cn(
                    "relative flex cursor-pointer items-center text-[13px] font-extrabold tracking-wider uppercase transition-all duration-200 select-none focus:outline-hidden",
                    "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent!",
                    "h-auto rounded-none border-0 px-0 py-2 text-white/80 hover:text-white data-[state=open]:text-white [&_svg]:hidden",
                    isDropdownActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                >
                  {link.label}
                  {isDropdownActive && (
                    <span className="absolute right-0 bottom-[4px] left-0 h-[3px] rounded-full bg-[#F58220]" />
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-1/2 z-50 mt-[20px]! w-[340px]! min-w-[340px]! -translate-x-1/2 animate-in overflow-hidden! rounded-xl! border border-white/10! bg-primary! p-0! text-white! shadow-none! fade-in-0 zoom-in-95">
                  <div className="flex flex-col bg-primary py-1.5">
                    {subItems.map((subItem, idx) => {
                      const SubIcon = subItem.icon
                      const isSubActive = isActive(subItem.href)
                      return (
                        <NavigationMenuLink asChild key={subItem.href}>
                          <Link
                            href={subItem.href}
                            onClick={onClick}
                            className={cn(
                              "flex w-full cursor-pointer items-center justify-between rounded-none border-b border-white/5 bg-transparent px-6 py-4.5 text-left outline-hidden transition-all duration-150",
                              "text-white/80! hover:bg-white/5! hover:text-white! focus:bg-white/5! focus:text-white!",
                              idx === subItems.length - 1 && "border-b-0",
                              isSubActive
                                ? "bg-white/10! font-bold text-white!"
                                : ""
                            )}
                          >
                            <div className="flex items-center gap-4">
                              {SubIcon && (
                                <SubIcon className="h-5 w-5 text-white/85" />
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

          // Flat link
          const isLinkActive = link.href ? isActive(link.href) : false
          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={link.href || "#"}
                  className={cn(
                    "relative cursor-pointer py-2 text-[13px] font-extrabold tracking-wider uppercase transition-all duration-200 select-none",
                    "rounded-none border-0 bg-transparent p-0 text-white/80 hover:bg-transparent hover:text-white focus:bg-transparent active:bg-transparent",
                    isLinkActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                >
                  {link.label}
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
