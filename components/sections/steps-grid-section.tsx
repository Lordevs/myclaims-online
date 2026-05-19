import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { cn } from "@/lib/utils"

export interface StepItem {
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface StepsGridSectionProps {
  /** The primary heading text */
  title: string
  /** The word or substring in the heading to highlight in accent color */
  titleHighlight?: string
  /** The steps sequence data */
  items: StepItem[]
  className?: string
}

/**
 * Reusable StepsGridSection Component
 * A high-fidelity step-by-step roadmap section. Styles are completely hardcoded
 * to enforce exact theme design compliance (bg #FFFAFB, borders #EDF7EF, highlights #E6405E, etc.).
 * Props handle only dynamic content coming from Strapi.
 */
export function StepsGridSection({
  title,
  titleHighlight,
  items,
  className,
}: StepsGridSectionProps) {

  // Dynamic Title Highlighter Helper
  const renderTitle = () => {
    if (!titleHighlight || !title.includes(titleHighlight)) {
      return title
    }
    const parts = title.split(titleHighlight)
    return (
      <>
        {parts[0]}
        <span className="text-[#E6405E]">{titleHighlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      className={cn(
        "py-20 md:py-28 font-sans w-full select-none overflow-hidden bg-[#FFFAFB] border-y-[0.75px] border-[#EDF7EF]",
        className
      )}
    >
      <Container>
        <div className="flex flex-col items-center">
          {/* Centered Dynamic Heading */}
          <FadeIn delay={0.1}>
            <h2 className="text-[#111111] text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-16 md:mb-24 leading-tight">
              {renderTitle()}
            </h2>
          </FadeIn>

          {/* Steps Grid Block */}
          <StaggerContainer delayChildren={0.2} staggerDelay={0.12} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12 w-full">
              {items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={idx} className="relative flex flex-col items-center text-center group h-full">
                    {/* Absolute Connecting Arrow (Desktop view only, placed between steps) */}
                    {idx < items.length - 1 && (
                      <div className="hidden md:flex absolute top-10 -right-4 lg:-right-6 items-center text-[#0D0503] pointer-events-none select-none">
                        <span className="text-lg font-light tracking-widest translate-x-1">→</span>
                      </div>
                    )}

                    {/* Step Icon & Decorative Number Combo */}
                    <div className="relative mb-4 flex items-center justify-center w-24 h-24">
                      {/* Oversized Faint Decorative Number */}
                      <span
                        className="absolute -top-6 -left-6 text-6xl md:text-7xl font-extrabold select-none pointer-events-none opacity-90 transition-transform duration-200 group-hover:scale-105 text-[#FFBDC9]"
                      >
                        {idx + 1}
                      </span>
                      {/* Main Icon */}
                      <Icon
                        className="w-14 h-14 relative z-10 shrink-0 transition-transform duration-200 group-hover:scale-105 text-[#E6405E]"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Step Title Header */}
                    <h3 className="text-[#111111] text-lg md:text-xl font-extrabold tracking-tight mb-3 leading-snug">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[#444444] text-sm md:text-base font-normal leading-relaxed max-w-[240px]">
                      {item.description}
                    </p>
                  </StaggerItem>
                )
              })}
            </div>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}

export default StepsGridSection
