"use client"

import * as React from "react"
import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import type { IconhubField } from "@/lib/strapi/types/shared"

export interface StepItem {
  icon: IconhubField | { name: string; selectIcon?: string } | null | undefined
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
        "w-full overflow-hidden border-y-[0.75px] border-[#EDF7EF] bg-[#FFFAFB] py-16 font-sans select-none",
        className
      )}
    >
      <Container>
        <div className="flex flex-col items-center">
          {/* Centered Dynamic Heading */}
          <FadeIn delay={0.1}>
            <h2 className="mb-16 text-center text-3xl leading-tight font-extrabold tracking-tight text-[#111111] md:text-5xl">
              {renderTitle()}
            </h2>
          </FadeIn>

          {/* Steps Grid Block */}
          <StaggerContainer
            delayChildren={0.2}
            staggerDelay={0.12}
            className="w-full"
          >
            <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-12">
              {items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <StaggerItem
                    key={idx}
                    className="group relative flex h-full flex-col items-center text-center"
                  >
                    {/* Absolute Connecting Arrow (Desktop view only, placed between steps) */}
                    {idx < items.length - 1 && (
                      <div className="pointer-events-none absolute top-10 -right-4 hidden items-center text-[#0D0503] select-none md:flex lg:-right-6">
                        <span className="translate-x-1 text-lg font-light tracking-widest">
                          →
                        </span>
                      </div>
                    )}

                    {/* Step Icon & Decorative Number Combo */}
                    <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
                      {/* Oversized Faint Decorative Number */}
                      <span className="pointer-events-none absolute -top-6 -left-6 text-6xl font-extrabold text-[#FFBDC9] opacity-90 transition-transform duration-200 select-none group-hover:scale-105 md:text-7xl">
                        {idx + 1}
                      </span>
                      {/* Main Icon */}
                      {typeof Icon === "function" ||
                        React.isValidElement(Icon) ? (
                        React.createElement(
                          Icon as unknown as React.ComponentType<{
                            className: string
                            strokeWidth: number
                          }>,
                          {
                            className:
                              "relative z-10 h-14 w-14 shrink-0 text-[#E6405E] transition-transform duration-200 group-hover:scale-105",
                            strokeWidth: 1.75,
                          }
                        )
                      ) : (
                        <StrapiIcon
                          icon={Icon}
                          size={56}
                          className="relative z-10 h-14 w-14 shrink-0 text-[#E6405E] transition-transform duration-200 group-hover:scale-105"
                        />
                      )}
                    </div>

                    {/* Step Title Header */}
                    <h3 className="mb-3 text-lg leading-snug font-extrabold tracking-tight text-[#111111] md:text-xl">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="max-w-[240px] text-sm leading-relaxed font-normal text-[#444444] md:text-base">
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
