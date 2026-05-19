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
        "w-full overflow-hidden border-none bg-white py-14 shadow-none select-none md:py-16",
        className
      )}
    >
      <Container className="max-w-4xl">
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center gap-5 text-center md:gap-6">
            {/* Pill Badge utilizing Shadcn Badge component */}
            <Badge
              className={cn(
                "pointer-events-none h-auto rounded-full px-6 py-2 text-sm font-semibold select-none",
                "border-2 border-[#022C22] bg-[#CEEBC7] text-[#022C22]",
                "shadow-none hover:bg-[#CEEBC7]!"
              )}
            >
              {badgeText}
            </Badge>

            {/* Central Statement Heading */}
            <h3 className="max-w-2xl text-base leading-relaxed font-semibold tracking-tight text-[#1A1C19] md:text-xl lg:text-2xl">
              {headingText}
            </h3>

            {/* Next.js Link component in #AF2144 */}
            <Link
              href={linkHref}
              className={cn(
                "text-sm leading-none font-bold tracking-tight text-[#AF2144] md:text-base lg:text-[17px]",
                "underline decoration-[1.5px] underline-offset-[6px] transition-opacity hover:opacity-90"
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

export default SimpleLinkCTA
