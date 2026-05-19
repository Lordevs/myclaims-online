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
        "w-full overflow-hidden border-none bg-white py-16 shadow-none select-none md:py-24",
        className
      )}
    >
      <Container className="max-w-6xl">
        <FadeIn delay={0.1}>
          {/* Inner Rounded Red Card */}
          <div
            className={cn(
              "w-full rounded-[20px] border-[2.25px] border-[#064E3B] bg-[#E94E6B] shadow-[4.5px_4.5px_0px_0px_#064E3B] md:rounded-[24px]",
              "mx-auto flex max-w-5xl flex-col items-center p-8 py-12 text-center text-white md:p-12 md:py-16"
            )}
          >
            {/* Bold White Heading */}
            <h2 className="mb-4 max-w-4xl text-2xl leading-tight font-extrabold tracking-tight text-white md:text-4xl lg:text-[42px]">
              {title}
            </h2>

            {/* Description Text */}
            <p className="mb-8 max-w-[850px] text-sm leading-relaxed font-normal text-[#FFFFFFE6] md:mb-10 md:text-base lg:text-2xl">
              {description}
            </p>

            {/* Reusable Action Buttons */}
            <div className="flex w-full flex-col items-center justify-center gap-5 px-4 sm:w-auto sm:flex-row sm:gap-6 sm:px-0">
              {/* White Button with offset Green Shadow */}
              <Button
                asChild
                className={cn(
                  "flex h-auto w-[220px] items-center justify-center rounded-xl px-8 py-3.5 font-bold transition-transform duration-150 select-none active:scale-[0.97] sm:w-auto sm:px-10",
                  "border-[2.25px] border-[#064E3B] bg-white text-[#E94E6B] shadow-[4.5px_4.5px_0px_0px_#064E3B] hover:bg-slate-50!",
                  "cursor-pointer text-sm sm:text-base"
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
                  "flex h-auto w-[220px] items-center justify-center rounded-xl px-8 py-3.5 font-bold transition-transform duration-150 select-none active:scale-[0.97] sm:w-auto sm:px-10",
                  "border-[2.25px] border-[#FFFFFF33] bg-[#064E3B] text-white hover:bg-[#043326]!",
                  "cursor-pointer text-sm sm:text-base"
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

export default ClaimsCardCTA
