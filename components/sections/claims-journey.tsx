import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { cn } from "@/lib/utils"

export interface JourneyStep {
  number: string
  title: string
  description: string
}

export interface ClaimsJourneyProps {
  /** Section Heading */
  title?: string
  /** Dynamic steps list */
  steps?: JourneyStep[]
  /** Custom class name styling */
  className?: string
}

/**
 * High-fidelity, premium ClaimsJourney Component.
 * Visual specifications:
 * - Section bg: White (#FFFFFF)
 * - Heading color: #064E3B
 * - Subtitle/Paragraph color: #4C6549
 * - Items 01, 02, 03: bg white, border: 2.2px solid #064E3B1A, box-shadow: 0px 1.1px 2.2px 0px #0000000D, text color #AF2144
 * - Green item 04: bg #064E3B, border: 2.2px solid #064E3B, text color white
 * - Desktop/tablet horizontal line connection centered behind items
 */
export function ClaimsJourney({
  title = "The Claims Journey",
  steps = [
    {
      number: "01",
      title: "Review Details",
      description:
        "Our triage team instantly assesses your information for eligibility and case strength.",
    },
    {
      number: "02",
      title: "Expert Contact",
      description:
        "A senior specialist calls you to discuss strategy and explain your legal rights clearly.",
    },
    {
      number: "03",
      title: "Action Phase",
      description:
        "We immediately arrange replacement vehicles and medical care if needed.",
    },
    {
      number: "04",
      title: "Settlement",
      description:
        "We handle all insurer negotiations to secure your maximum entitled compensation.",
    },
  ],
  className,
}: ClaimsJourneyProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-white py-16 font-sans select-none",
        className
      )}
    >
      <Container>
        <div className="flex flex-col items-center">
          {/* Section Heading */}
          <FadeIn delay={0.1}>
            <h2 className="mb-16 text-center text-3xl leading-none font-extrabold tracking-tight text-[#064E3B] md:mb-24 md:text-[48px]">
              {title}
            </h2>
          </FadeIn>

          {/* Steps Grid and Connector Block */}
          <StaggerContainer
            delayChildren={0.2}
            staggerDelay={0.12}
            className="relative w-full"
          >
            {/* Horizontal Connector Line for Desktop/Tablets */}
            <div className="pointer-events-none absolute top-[43px] right-[12.5%] left-[12.5%] z-0 hidden h-[1.5px] bg-[#E2E3DE] md:block" />

            <div className="relative z-10 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6 lg:gap-12">
              {steps.map((step, idx) => {
                const isGreenStep = step.number === "04"

                return (
                  <StaggerItem
                    key={idx}
                    className="group flex flex-col items-center text-center"
                  >
                    {/* Step Badge / Number Card */}
                    <div
                      className={cn(
                        "relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-xl font-extrabold transition-transform duration-200 group-hover:scale-105 sm:h-[86px] sm:w-[86px] sm:text-2xl",
                        isGreenStep
                          ? "border-[2.2px] border-[#064E3B] bg-[#064E3B] text-white"
                          : "border-[2.2px] border-[#064E3B1A] bg-white text-[#AF2144] shadow-[0px_1.1px_2.2px_rgba(0,0,0,0.05)]"
                      )}
                    >
                      {step.number}
                    </div>

                    {/* Step Title */}
                    <h3 className="mb-3 text-lg leading-snug font-extrabold tracking-tight text-[#064E3B] sm:text-2xl">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="max-w-[240px] px-1 text-base leading-relaxed font-medium text-[#4C6549] sm:text-lg md:px-0">
                      {step.description}
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

export default ClaimsJourney
