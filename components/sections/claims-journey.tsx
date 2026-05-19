import { Container } from "@/components/layout/container"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations"
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
      description: "Our triage team instantly assesses your information for eligibility and case strength.",
    },
    {
      number: "02",
      title: "Expert Contact",
      description: "A senior specialist calls you to discuss strategy and explain your legal rights clearly.",
    },
    {
      number: "03",
      title: "Action Phase",
      description: "We immediately arrange replacement vehicles and medical care if needed.",
    },
    {
      number: "04",
      title: "Settlement",
      description: "We handle all insurer negotiations to secure your maximum entitled compensation.",
    },
  ],
  className,
}: ClaimsJourneyProps) {
  return (
    <section className={cn("py-20 md:py-28 bg-white font-sans w-full select-none overflow-hidden relative", className)}>
      <Container>
        <div className="flex flex-col items-center">

          {/* Section Heading */}
          <FadeIn delay={0.1}>
            <h2 className="text-[#064E3B] text-3xl md:text-[48px] font-extrabold tracking-tight text-center mb-16 md:mb-24 leading-none">
              {title}
            </h2>
          </FadeIn>

          {/* Steps Grid and Connector Block */}
          <StaggerContainer delayChildren={0.2} staggerDelay={0.12} className="w-full relative">

            {/* Horizontal Connector Line for Desktop/Tablets */}
            <div className="hidden md:block absolute top-[43px] left-[12.5%] right-[12.5%] h-[1.5px] bg-[#E2E3DE] z-0 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 lg:gap-12 w-full relative z-10">
              {steps.map((step, idx) => {
                const isGreenStep = step.number === "04"

                return (
                  <StaggerItem key={idx} className="flex flex-col items-center text-center group">

                    {/* Step Badge / Number Card */}
                    <div
                      className={cn(
                        "w-20 h-20 sm:w-[86px] sm:h-[86px] rounded-3xl flex items-center justify-center font-extrabold text-xl sm:text-2xl transition-transform duration-200 group-hover:scale-105 mb-6 z-10 relative",
                        isGreenStep
                          ? "bg-[#064E3B] border-[2.2px] border-[#064E3B] text-white"
                          : "bg-white border-[2.2px] border-[#064E3B1A] text-[#AF2144] shadow-[0px_1.1px_2.2px_rgba(0,0,0,0.05)]"
                      )}
                    >
                      {step.number}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-[#064E3B] text-lg sm:text-2xl font-extrabold tracking-tight mb-3 leading-snug">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[#4C6549] text-base sm:text-lg font-medium leading-relaxed max-w-[240px] px-1 md:px-0">
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

export default ClaimsJourney;
