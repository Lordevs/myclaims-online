"use client"

import { MobileNav } from "@/components/layout/navigation/mobile-nav"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { Logo } from "@/components/shared/logo"
import { DesktopNav } from "./desktop-nav"
import { NavCTAButton } from "@/components/layout/navigation/nav-cta-button"
import type { GlobalData } from "@/lib/strapi/types/global"
import type { LinkComponent } from "@/lib/strapi/types/shared"

interface NavbarProps {
  globalData?: GlobalData | null
}

/**
 * Main application navigation bar.
 * When globalData is provided, nav items and CTA come from Strapi.
 * Falls back to hardcoded constants if globalData is null/undefined.
 */
export function Navbar({ globalData }: NavbarProps) {
  const scrolled = useScroll(20)

  const ctaButton: LinkComponent | null = globalData?.navbarCta ?? null
  const navItems = globalData?.navbarItems

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 font-heading transition-all duration-300",
        scrolled
          ? "bg-primary/95 py-4 shadow-md backdrop-blur-md"
          : "border-b border-white/5 bg-primary py-5"
      )}
    >
      <Container className="flex items-center justify-between md:px-0">
        <Logo />

        {/* Desktop Navigation */}
        <div className="flex items-center gap-10">
          <DesktopNav
            className="hidden md:flex"
            itemClassName="text-white/80 hover:text-white"
            navItems={navItems}
          />
          <div className="flex items-center gap-4">
            <NavCTAButton ctaButton={ctaButton} className="hidden md:flex" />

            {/* Mobile Navigation */}
            <MobileNav ctaButton={ctaButton} navItems={navItems} />
          </div>
        </div>
      </Container>
    </header>
  )
}
