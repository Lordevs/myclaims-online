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

export function DesktopNav({ className, itemClassName, onClick }: DesktopNavProps) {
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
                    "relative flex items-center text-[13px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none focus:outline-hidden",
                    "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent!",
                    "h-auto py-2 px-0 rounded-none border-0 text-white/80 hover:text-white data-[state=open]:text-white [&_svg]:hidden",
                    isDropdownActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                >
                  {link.label}
                  {isDropdownActive && (
                    <span className="absolute bottom-[4px] left-0 right-0 h-[3px] bg-[#F58220] rounded-full" />
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className="mt-[20px]! w-[340px]! min-w-[340px]! rounded-xl! overflow-hidden! shadow-none! border border-white/10! bg-primary! p-0! text-white! z-50 animate-in fade-in-0 zoom-in-95 left-1/2 -translate-x-1/2"
                >
                  <div className="flex flex-col py-1.5 bg-primary">
                    {subItems.map((subItem, idx) => {
                      const SubIcon = subItem.icon
                      const isSubActive = isActive(subItem.href)
                      return (
                        <NavigationMenuLink asChild key={subItem.href}>
                          <Link
                            href={subItem.href}
                            onClick={onClick}
                            className={cn(
                              "flex items-center justify-between px-6 py-4.5 transition-all duration-150 border-b border-white/5 cursor-pointer rounded-none text-left w-full outline-hidden bg-transparent",
                              "hover:bg-white/5! hover:text-white! focus:bg-white/5! focus:text-white! text-white/80!",
                              idx === subItems.length - 1 && "border-b-0",
                              isSubActive
                                ? "bg-white/10! text-white! font-bold"
                                : ""
                            )}
                          >
                            <div className="flex items-center gap-4">
                              {SubIcon && <SubIcon className="w-5 h-5 text-white/85" />}
                              <span className="text-sm font-semibold tracking-wide">{subItem.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/30" />
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
                    "relative py-2 text-[13px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none",
                    "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent p-0 rounded-none border-0 text-white/80 hover:text-white",
                    isLinkActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                >
                  {link.label}
                  {isLinkActive && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-[#F58220] rounded-full" />
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
