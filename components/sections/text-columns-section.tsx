import * as React from "react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"

export interface TextColumnsSectionProps {
  /** Main section heading text */
  title: string
  /** Text content for the left column */
  col1Text: string
  /** Text content for the right column */
  col2Text: string
  /** Optional custom styling class */
  className?: string
}

/**
 * Reusable TextColumnsSection Component.
 * Features a modern, content-focused split layout:
 * - White background with a subtle border-bottom (1.13px solid #E2E3DE)
 * - Large left-aligned heading in pine green (#022C22)
 * - High-readability split text grid (2 columns on desktop) with color #594143
 */
export function TextColumnsSection({
  title,
  col1Text,
  col2Text,
  className,
}: TextColumnsSectionProps) {
  return (
    <section
      className={cn(
        "bg-white py-16 md:py-20 w-full select-none overflow-hidden",
        "border-b-[1.13px] border-[#E2E3DE]",
        className
      )}
    >
      <Container>
        <FadeIn delay={0.1}>
          <div className="flex flex-col text-left">

            {/* Bold Left-aligned Heading */}
            <h2 className="text-[#022C22] text-2xl md:text-3xl lg:text-[48px] font-bold tracking-tight leading-tight mb-8 md:mb-10">
              {title}
            </h2>

            {/* Split Paragraph Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full">

              {/* Left Column Text */}
              <p className="text-[#594143] text-sm md:text-base lg:text-2xl leading-relaxed font-normal">
                {col1Text}
              </p>

              {/* Right Column Text */}
              <p className="text-[#594143] text-sm md:text-base lg:text-2xl leading-relaxed font-normal">
                {col2Text}
              </p>

            </div>

          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default TextColumnsSection;
