"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { MobileNavContent } from "./mobile-nav-content"
import { NavCTAButton } from "@/components/layout/navigation/nav-cta-button"
import type { LinkComponent } from "@/lib/strapi/types/shared"
import type { NavbarItem } from "@/lib/strapi/types/global"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

interface MobileNavProps {
  ctaButton?: LinkComponent | null
  navItems?: NavbarItem[]
  logo?: StrapiMediaComponent | null
}

export function MobileNav({ ctaButton, navItems, logo }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="size-7" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col border-white/10 bg-primary p-0 text-white sm:w-[400px]"
        showCloseButton={false}
      >
        <SheetHeader className="px-6 pt-6 text-left">
          <SheetTitle className="text-left">
            <Logo logo={logo} />
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="absolute right-4 top-4 text-white hover:bg-white/20 hover:text-white"
            >
              <X className="size-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="relative mt-8 flex-1 overflow-y-auto px-6">
          <MobileNavContent
            className="flex-col items-start gap-8"
            itemClassName="text-xl font-medium text-white/80 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
            navItems={navItems}
          />
        </div>

        <div className="mt-auto border-t border-white/10 bg-primary p-6">
          <NavCTAButton
            className="w-full"
            onClick={() => setIsOpen(false)}
            ctaButton={ctaButton}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
