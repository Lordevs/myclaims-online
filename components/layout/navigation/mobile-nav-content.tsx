"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/constants/navigation"
import { useNavigationState } from "@/hooks/use-navigation-state"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MobileNavContentProps {
  className?: string
  itemClassName?: string
  onClick?: () => void
}

export function MobileNavContent({ className, itemClassName, onClick }: MobileNavContentProps) {
  const { isActive } = useNavigationState()

  return (
    <nav className={cn("flex flex-col gap-6 w-full", className)}>
      {NAV_LINKS.map((link) => {
        // Dropdown link using shadcn Accordion
        if (link.subItems) {
          const isDropdownActive = link.subItems.some((sub) => isActive(sub.href))

          return (
            <Accordion type="single" collapsible className="w-full" key={link.label}>
              <AccordionItem value={link.label} className="border-0">
                <AccordionTrigger
                  className={cn(
                    "flex items-center justify-between text-lg font-bold tracking-wider uppercase transition-all duration-200 py-1.5 border-b border-white/5 w-full text-left cursor-pointer",
                    "hover:no-underline p-0 border-b-0",
                    "text-white/80 hover:text-white data-[state=open]:text-white",
                    "**:data-[slot=accordion-trigger-icon]:text-white! **:data-[slot=accordion-trigger-icon]:size-5! **:data-[slot=accordion-trigger-icon]:opacity-80!",
                    isDropdownActive ? "text-white" : "text-white/80",
                    itemClassName
                  )}
                >
                  <span>{link.label}</span>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-0">
                  <div className="flex flex-col pl-4 gap-4 mt-4 transition-all duration-200">
                    {link.subItems.map((subItem) => {
                      const SubIcon = subItem.icon
                      const isSubActive = isActive(subItem.href)
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={onClick}
                          className={cn(
                            "flex items-center gap-3.5 text-base transition-all py-1.5",
                            isSubActive
                              ? "text-white font-bold"
                              : "text-white/70 hover:text-white"
                          )}
                        >
                          {SubIcon && <SubIcon className="w-5 h-5 text-white/90" />}
                          <span className="font-medium">{subItem.label}</span>
                          {isSubActive && (
                            <span className="w-2 h-2 rounded-full bg-[#F58220]" />
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        }

        // Flat link
        const isLinkActive = link.href ? isActive(link.href) : false
        return (
          <Link
            key={link.href}
            href={link.href || "#"}
            onClick={onClick}
            className={cn(
              "text-lg font-bold tracking-wider uppercase transition-all duration-200 py-1.5 border-b border-white/5",
              isLinkActive
                ? "text-white"
                : "text-white/80 hover:text-white",
              itemClassName
            )}
          >
            <div className="flex items-center justify-between">
              <span>{link.label}</span>
              {isLinkActive && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#F58220]" />
              )}
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
