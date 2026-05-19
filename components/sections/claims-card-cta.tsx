import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ClaimsCardCTAProps {
  /** The primary bold card heading text */
  title: string
  /** The descriptive text displayed below the heading */
  description: string
  /** Text label for the prominent white action button */
  primaryBtnText?: string
  /** Destination path/link for the prominent white action button */
  primaryBtnHref?: string
  /** Text label for the green pill call button */
  secondaryBtnText?: string
  /** Destination path/link/tel for the green pill call button */
  secondaryBtnHref?: string
  /** Additional custom class styles */
  className?: string
}

/**
 * Reusable ClaimsCardCTA Component.
 * Features a high-contrast Neo-Brutalist card layout:
 * - White section background
 * - Inner red card (#E94E6B) with deep green borders (#064E3B) and matching neobrutalist shadows
 * - Styled white action buttons (offset shadow) and solid green buttons.
 */
export function ClaimsCardCTA({
  title,
  description,
  primaryBtnText = "Start My Claim",
  primaryBtnHref = "#enquiry-form",
  secondaryBtnText = "Call Now",
  secondaryBtnHref = "tel:07930444467",
  className,
}: ClaimsCardCTAProps) {
  return (
    <section
      className={cn(
        "bg-white py-16 md:py-24 w-full select-none overflow-hidden border-none shadow-none",
        className
      )}
    >
      <Container className="max-w-6xl">
        <FadeIn delay={0.1}>
          {/* Inner Rounded Red Card */}
          <div
            className={cn(
              "w-full bg-[#E94E6B] border-[2.25px] border-[#064E3B] rounded-[20px] md:rounded-[24px] shadow-[4.5px_4.5px_0px_0px_#064E3B]",
              "p-8 py-12 md:p-12 md:py-16 text-center text-white flex flex-col items-center max-w-5xl mx-auto"
            )}
          >
            {/* Bold White Heading */}
            <h2 className="text-white text-2xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight mb-4 leading-tight max-w-4xl">
              {title}
            </h2>

            {/* Description Text */}
            <p className="text-[#FFFFFFE6] text-sm md:text-base lg:text-2xl font-normal leading-relaxed max-w-[850px] mb-8 md:mb-10">
              {description}
            </p>

            {/* Reusable Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">

              {/* White Button with offset Green Shadow */}
              <Button
                asChild
                className={cn(
                  "w-[220px] sm:w-auto px-8 py-3.5 sm:px-10 rounded-xl font-bold transition-transform active:scale-[0.97] duration-150 flex items-center justify-center h-auto select-none",
                  "bg-white text-[#E94E6B] border-[2.25px] border-[#064E3B] shadow-[4.5px_4.5px_0px_0px_#064E3B] hover:bg-slate-50!",
                  "text-sm sm:text-base cursor-pointer"
                )}
              >
                <Link href={primaryBtnHref}>
                  <span>{primaryBtnText}</span>
                </Link>
              </Button>

              {/* Green Button with Semi-Transparent Border */}
              <Button
                asChild
                className={cn(
                  "w-[220px] sm:w-auto px-8 py-3.5 sm:px-10 rounded-xl font-bold transition-transform active:scale-[0.97] duration-150 flex items-center justify-center h-auto select-none",
                  "bg-[#064E3B] text-white border-[2.25px] border-[#FFFFFF33] hover:bg-[#043326]!",
                  "text-sm sm:text-base cursor-pointer"
                )}
              >
                <a href={secondaryBtnHref}>
                  <span>{secondaryBtnText}</span>
                </a>
              </Button>

            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default ClaimsCardCTA;
