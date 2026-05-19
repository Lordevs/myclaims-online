import * as React from "react"
import { Handshake, PiggyBank } from "lucide-react"
import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { cn } from "@/lib/utils"

export interface BentoCardProps {
  /** Card heading text */
  title: string
  /** Card description body text */
  description: string
  /** Column span class for responsive grid layout */
  colSpanClass: string
  /** Optional icon to render on the left of row layout */
  icon?: React.ElementType
  /** Icon circle container color theme */
  iconVariant?: "pink" | "green"
  /** Optional override heading font styling class */
  headingClass?: string
  /** Optional override description paragraph styling class */
  descriptionClass?: string
}

/**
 * Reusable BentoCard Component.
 * Enforces uniform Neo-Brutalist borders, card background (#F9FAF5), rounded corners,
 * staggered fade-in animations, and beautiful scale states, while enabling
 * layout auto-flips between icon-aligned rows and iconless columns.
 */
export function BentoCard({
  title,
  description,
  colSpanClass,
  icon: Icon,
  iconVariant,
  headingClass = "text-lg md:text-xl",
  descriptionClass = "text-sm md:text-[15px]",
}: BentoCardProps) {
  return (
    <div className={colSpanClass}>
      <StaggerItem>
        <div
          className={cn(
            "rounded-2xl border-[2.25px] border-[#064E3B] bg-[#F9FAF5] shadow-[4.5px_4.5px_0px_0px_#064E3B] md:rounded-[20px]",
            "flex h-full p-6 text-left transition-transform duration-150 active:scale-[0.99] md:p-8",
            Icon
              ? "flex-row items-center gap-5 md:gap-6"
              : "flex-col justify-center"
          )}
        >
          {/* Circular Left Icon Wrapper */}
          {Icon && (
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-full md:h-16 md:w-16",
                iconVariant === "pink"
                  ? "bg-[#E94E6B]"
                  : "border-2 border-[#064E3B] bg-[#064E3B] shadow-[2px_2px_0px_0px_#064E3B]"
              )}
            >
              <Icon
                className={cn(
                  "h-7 w-7 md:h-8 md:w-8",
                  iconVariant === "pink" ? "text-white" : "text-[#A3E635]"
                )}
                strokeWidth={iconVariant === "pink" ? 2 : 2.25}
              />
            </div>
          )}

          {/* Text Content block */}
          <div className="flex flex-col">
            <h3
              className={cn(
                "mb-1.5 leading-snug font-bold text-[#1A1C19]",
                headingClass
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "leading-relaxed font-normal text-[#1A1C19]",
                descriptionClass
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </StaggerItem>
    </div>
  )
}

export interface WhyChooseUsProps {
  className?: string
}

/**
 * High-fidelity "Why Choose My Claims Online" Bento Grid section.
 * Renders reusable BentoCards in a robust, animated 12-column grid.
 */
export function WhyChooseUs({ className }: WhyChooseUsProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-white py-16 select-none md:py-24",
        className
      )}
    >
      <Container>
        {/* Animated Main Section Header */}
        <FadeIn delay={0.1} className="mb-12 text-center md:mb-20">
          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-[#064E3B] md:text-5xl">
            Why Choose My Claims Online
          </h2>
        </FadeIn>

        {/* Animated 12-Column Bento Grid */}
        <StaggerContainer>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
            {/* ROW 1 CARD 1: No win no fee (Pink Handshake, 6 Columns) */}
            <BentoCard
              colSpanClass="lg:col-span-6"
              icon={Handshake}
              iconVariant="pink"
              title="No win no fee"
              description="Total peace of mind with our transparent legal support structure."
              headingClass="text-lg"
              descriptionClass="text-lg"
            />

            {/* ROW 1 CARD 2: No upfront costs (Green PiggyBank, 6 Columns) */}
            <BentoCard
              colSpanClass="lg:col-span-6"
              icon={PiggyBank}
              iconVariant="green"
              title="No upfront costs"
              description="We fund the entire process so you aren't out of pocket during the claim."
              headingClass="text-lg"
              descriptionClass="text-lg"
            />

            {/* ROW 2 CARD 1: Fast response times (No Icon, 4 Columns) */}
            <BentoCard
              colSpanClass="md:col-span-4"
              title="Fast response times"
              description="Our team starts working on your case the moment you hit submit."
              headingClass="text-lg"
            />

            {/* ROW 2 CARD 2: Nationwide coverage (No Icon, 4 Columns) */}
            <BentoCard
              colSpanClass="md:col-span-4"
              title="Nationwide coverage"
              description="From London to the Highlands, our recovery network spans the entire UK."
              headingClass="text-lg"
            />

            {/* ROW 2 CARD 3: 25+ years experience (No Icon, 4 Columns) */}
            <BentoCard
              colSpanClass="md:col-span-4"
              title="25+ years experience"
              description="Decades of handling complex claims and helping thousands of drivers."
              headingClass="text-lg"
            />
          </div>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default WhyChooseUs
