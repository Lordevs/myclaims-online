import * as React from "react"
import { Bike, Zap } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// A high-fidelity, custom front-facing car SVG
function FrontCarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Roof */}
      <path d="M19 10H5M16.5 5.5h-9a2 2 0 0 0-2 2l-1 2.5h13l-1-2.5a2 2 0 0 0-2-2z" />
      {/* Hood & Headlights */}
      <rect x="3" y="10" width="18" height="7" rx="1.5" />
      <circle cx="6" cy="13.5" r="1.5" />
      <circle cx="18" cy="13.5" r="1.5" />
      {/* Grille */}
      <path d="M10 13.5h4" />
      {/* Tires */}
      <path d="M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M16 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
    </svg>
  )
}

// A high-fidelity, custom front-facing taxi SVG
function FrontTaxiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Taxi sign on top */}
      <path d="M10 2.5h4v3h-4z" fill="currentColor" stroke="currentColor" strokeWidth={0.5} />
      {/* Roof */}
      <path d="M19 10H5M16.5 5.5h-9a2 2 0 0 0-2 2l-1 2.5h13l-1-2.5a2 2 0 0 0-2-2z" />
      {/* Hood & Headlights */}
      <rect x="3" y="10" width="18" height="7" rx="1.5" />
      <circle cx="6" cy="13.5" r="1.5" />
      <circle cx="18" cy="13.5" r="1.5" />
      {/* Grille */}
      <path d="M10 13.5h4" />
      {/* Tires */}
      <path d="M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M16 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
    </svg>
  )
}

// A high-fidelity, custom motorcycle SVG
function MotorcycleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Wheels */}
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />

      {/* Body & Engine frame */}
      <path d="M8 18h8M8 12h5.5l2.5 6M9 12l2-4h5l1.5 4h1.5" />
      {/* Seat */}
      <path d="M8 12c.5-1.5 2-2 4.5-2" />
      {/* Handlebars */}
      <path d="M16 8l-2-3M13 5h3.5" />
    </svg>
  )
}

// A high-fidelity EV icon representing a front-view car with lightning bolt charging
function FrontEVIcon({ className }: { className?: string }) {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <FrontCarIcon className={className} />
      <div className="absolute -bottom-1.5 -right-2 bg-[#CEEBC7] rounded-full p-0.5 border border-[#064E3B] flex items-center justify-center shadow-sm">
        <Zap className={cn("w-3 h-3 fill-current stroke-[1.5]", className)} />
      </div>
    </div>
  )
}

export interface ClaimTypeItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

/**
 * High-fidelity "Types of Claims We Support" section.
 * Configured in Neo-Brutalist design exactly to mockup specifications.
 */
export function ClaimsSupport() {
  const claimTypes: ClaimTypeItem[] = [
    {
      icon: FrontCarIcon,
      title: "Private Car /\nCommercial Vehicle",
      description: "Full support for personal cars and business fleet vehicles involved in non-fault accidents.",
    },
    {
      icon: FrontTaxiIcon,
      title: "Taxi / Uber /\nPrivate Hire",
      description: "Specialist replacement plated vehicles to keep you working and earning after a collision.",
    },
    {
      icon: MotorcycleIcon,
      title: "Motorcycle\nClaims",
      description: "Expert handling for bikers, including protective gear replacement and like-for-like bike hire.",
    },
    {
      icon: Bike,
      title: "Cycle / E-Scooter\nClaims",
      description: "Dedicated support for vulnerable road users, ensuring fair compensation for injuries and equipment.",
    },
    {
      icon: FrontEVIcon,
      title: "Electric Vehicle\nClaims",
      description: "Specialized recovery and replacement services for EV and hybrid owners.",
    },
  ]

  return (
    <section className="bg-white border-t-[2.25px] border-b-[2.25px] border-[#0F172A] py-16 md:py-24 font-sans w-full select-none overflow-hidden">
      <Container>
        <div className="flex flex-col items-center">
          {/* Centered Heading */}
          <FadeIn delay={0.1}>
            <h2 className="text-[#0F172A] text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-12 md:mb-16">
              Types of Claims We Support
            </h2>
          </FadeIn>

          {/* Staggered Grid Content */}
          <StaggerContainer delayChildren={0.2} staggerDelay={0.08} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 lg:gap-5 w-full">
              {claimTypes.map((item, idx) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={idx} className="h-full">
                    <Card className="bg-[#F9FAF5] border-2 border-[#064E3B] rounded-xl h-full transition-transform duration-200 hover:scale-[1.01] shadow-none flex flex-col items-center text-center p-6 py-8 md:p-5 md:py-10">
                      <CardContent className="p-0 flex flex-col items-center h-full">
                        {/* Circular Icon Container */}
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#CEEBC7] border-2 border-[#064E3B] flex items-center justify-center mb-2 md:mb-4 text-[#064E3B] shrink-0">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 shrink-0 text-[#064E3B]" />
                        </div>

                        {/* Card Heading */}
                        <h3 className="text-[#064E3B] text-sm md:text-base font-black tracking-tight mb-1 md:mb-3 leading-snug whitespace-pre-line min-h-[50px] flex items-center justify-center">
                          {item.title}
                        </h3>

                        {/* Card Paragraph */}
                        <p className="text-[#594143] text-sm md:text-base font-normal leading-relaxed max-w-[200px]">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
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

export default ClaimsSupport;
