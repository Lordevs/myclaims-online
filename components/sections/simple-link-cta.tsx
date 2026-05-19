import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface SimpleLinkCTAProps {
  /** Text inside the upper pill badge (defaults to "Last chance to claim") */
  badgeText?: string
  /** The primary statement text in the center */
  headingText: string
  /** The clickable anchor link text */
  linkText: string
  /** The destination path for the Next.js Link */
  linkHref: string
  /** Optional styling class */
  className?: string
}

/**
 * Reusable SimpleLinkCTA Component.
 * Implements a clean, centered promotional link banner:
 * - White background
 * - Top pill Shadcn Badge (#CEEBC7 with a 2px solid #022C22 border)
 * - Heading statement in #1A1C19
 * - Deep red Next.js Link (#AF2144) with an elegant under-line offset.
 */
export function SimpleLinkCTA({
  badgeText = "Last chance to claim",
  headingText,
  linkText,
  linkHref,
  className,
}: SimpleLinkCTAProps) {
  return (
    <section
      className={cn(
        "bg-white py-14 md:py-16 w-full select-none overflow-hidden border-none shadow-none",
        className
      )}
    >
      <Container className="max-w-4xl">
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center text-center gap-5 md:gap-6">
            
            {/* Pill Badge utilizing Shadcn Badge component */}
            <Badge
              className={cn(
                "rounded-full h-auto px-6 py-2 font-semibold text-sm select-none pointer-events-none",
                "bg-[#CEEBC7] text-[#022C22] border-2 border-[#022C22]",
                "shadow-none hover:bg-[#CEEBC7]!"
              )}
            >
              {badgeText}
            </Badge>

            {/* Central Statement Heading */}
            <h3
              className="text-[#1A1C19] text-base md:text-xl lg:text-2xl font-semibold tracking-tight max-w-2xl leading-relaxed"
            >
              {headingText}
            </h3>

            {/* Next.js Link component in #AF2144 */}
            <Link
              href={linkHref}
              className={cn(
                "text-[#AF2144] text-sm md:text-base lg:text-[17px] font-bold leading-none tracking-tight",
                "underline underline-offset-[6px] decoration-[1.5px] hover:opacity-90 transition-opacity"
              )}
            >
              {linkText}
            </Link>

          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default SimpleLinkCTA;
