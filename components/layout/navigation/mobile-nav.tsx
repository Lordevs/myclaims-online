"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { MobileNavContent } from "./mobile-nav-content"
import { NavCTAButton } from "@/components/layout/navigation/nav-cta-button"
import type { LinkComponent } from "@/lib/strapi/types/shared"

interface MobileNavProps {
  ctaButton?: LinkComponent | null
}

export function MobileNav({ ctaButton }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col border-white/10 bg-primary p-0 text-white sm:w-[400px]"
      >
        <SheetHeader className="px-6 pt-6 text-left">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-8 flex-1 overflow-hidden px-6">
          <MobileNavContent
            className="flex-col items-start gap-8"
            itemClassName="text-xl font-medium text-white/80 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
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
