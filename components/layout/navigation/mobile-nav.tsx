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
      <SheetContent side="right" className="bg-primary border-white/10 text-white w-[300px] sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="text-left px-6 pt-6">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="relative flex-1 overflow-hidden px-6 mt-8">
          <MobileNavContent
            className="flex-col items-start gap-8"
            itemClassName="text-xl font-medium text-white/80 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="p-6 mt-auto border-t border-white/10 bg-primary">
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
