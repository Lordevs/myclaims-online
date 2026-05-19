import * as React from "react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"

export interface InfoBannerProps {
  /** The banner main title text */
  title: string
  /** The body content paragraphs. Supports either a single string or an array of strings for multiple paragraphs. */
  paragraphs: string | string[]
  /** Color theme variant option */
  variant?: "green" | "pink"
  /** Additional styling classes */
  className?: string
}

/**
 * Reusable InfoBanner Component.
 * Supports "green" and "pink" variants, providing custom top/bottom borders,
 * elegant background colors, high-contrast headings, and premium paragraph styling.
 */
export function InfoBanner({
  title,
  paragraphs,
  variant = "green",
  className,
}: InfoBannerProps) {
  const isPink = variant === "pink"

  // Base and variant styling definitions
  const sectionBg = isPink ? "bg-[#FFEBEF]" : "bg-[#EDEEE9]"
  const headingColor = isPink ? "text-[#E94E6B]" : "text-[#064E3B]"
  const paraColor = "text-[#594143]"

  // Ensure paragraphs are handled uniformly as an array
  const paraList = Array.isArray(paragraphs) ? paragraphs : [paragraphs]

  return (
    <section
      className={cn(
        "py-16 md:py-20 border-t-[2.25px] border-b-[2.25px] border-[#064E3B] w-full font-sans select-none overflow-hidden",
        sectionBg,
        className
      )}
    >
      <Container className="max-w-4xl">
        <div className="flex flex-col items-center text-center">
          {/* Animated Heading */}
          <FadeIn delay={0.1}>
            <h2
              className={cn(
                "text-2xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight mb-6 md:mb-8 leading-tight",
                headingColor
              )}
            >
              {title}
            </h2>
          </FadeIn>

          {/* Animated Paragraphs */}
          <FadeIn delay={0.2} className="w-full">
            <div className="flex flex-col gap-5 md:gap-6">
              {paraList.map((paraText, idx) => (
                <p
                  key={idx}
                  className={cn(
                    "text-sm md:text-base lg:text-[17px] font-normal leading-relaxed max-w-[850px] mx-auto",
                    paraColor
                  )}
                >
                  {paraText}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

export default InfoBanner;
