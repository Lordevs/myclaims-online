"use client"

import * as React from "react"
import { Bike, Zap } from "lucide-react"
import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import type {
  FeatureCardComponent,
  IconhubField,
} from "@/lib/strapi/types/shared"

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
      <path
        d="M10 2.5h4v3h-4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.5}
      />
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
    <div className="relative flex h-7 w-7 items-center justify-center">
      <FrontCarIcon className={className} />
      <div className="absolute -right-2 -bottom-1.5 flex items-center justify-center rounded-full border border-[#064E3B] bg-[#CEEBC7] p-0.5 shadow-sm">
        <Zap className={cn("h-3 w-3 fill-current stroke-[1.5]", className)} />
      </div>
    </div>
  )
}

export interface ClaimTypeItem {
  icon: IconhubField | { name: string; selectIcon?: string } | null | undefined
  title: string
  description: string | null
}

interface ClaimsSupportProps {
  title?: string
  items?: FeatureCardComponent[]
}

/**
 * High-fidelity "Types of Claims We Support" section.
 * Configured in Neo-Brutalist design exactly to mockup specifications.
 */
export function ClaimsSupport({ title, items }: ClaimsSupportProps = {}) {
  const claimTypes: ClaimTypeItem[] = items
    ? items.map((item) => ({
      icon: item.icon,
      title: item.title,
      description: item.description,
    }))
    : [
      {
        icon: FrontCarIcon,
        title: "Private Car /\nCommercial Vehicle",
        description:
          "Full support for personal cars and business fleet vehicles involved in non-fault accidents.",
      },
      {
        icon: FrontTaxiIcon,
        title: "Taxi / Uber /\nPrivate Hire",
        description:
          "Specialist replacement plated vehicles to keep you working and earning after a collision.",
      },
      {
        icon: MotorcycleIcon,
        title: "Motorcycle\nClaims",
        description:
          "Expert handling for bikers, including protective gear replacement and like-for-like bike hire.",
      },
      {
        icon: Bike,
        title: "Cycle / E-Scooter\nClaims",
        description:
          "Dedicated support for vulnerable road users, ensuring fair compensation for injuries and equipment.",
      },
      {
        icon: FrontEVIcon,
        title: "Electric Vehicle\nClaims",
        description:
          "Specialized recovery and replacement services for EV and hybrid owners.",
      },
    ]

  const displayTitle = title || "Types of Claims We Support"

  return (
    <section className="w-full overflow-hidden border-t-[2.25px] border-b-[2.25px] border-[#0F172A] bg-white py-16 font-sans select-none">
      <Container>
        <div className="flex flex-col items-center">
          {/* Centered Heading */}
          <FadeIn delay={0.1}>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-5xl">
              {displayTitle}
            </h2>
          </FadeIn>

          {/* Staggered Grid Content */}
          <StaggerContainer
            delayChildren={0.2}
            staggerDelay={0.08}
            className="w-full"
          >
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:gap-4 lg:grid-cols-5 lg:gap-5">
              {claimTypes.map((item, idx) => {
                const Icon = item.icon
                const isComponent =
                  typeof Icon === "function" ||
                  (Icon && React.isValidElement(Icon))

                return (
                  <StaggerItem key={idx} className="h-full">
                    <Card className="flex h-full flex-col items-center rounded-xl border-2 border-[#064E3B] bg-[#F9FAF5] p-6 py-8 text-center shadow-none transition-transform duration-200 hover:scale-[1.01] md:p-5 md:py-10">
                      <CardContent className="flex h-full flex-col items-center p-0">
                        {/* Circular Icon Container */}
                        <div className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#064E3B] bg-[#CEEBC7] text-[#064E3B] md:mb-4 md:h-16 md:w-16">
                          {isComponent ? (
                            React.createElement(
                              Icon as unknown as React.ComponentType<{
                                className: string
                              }>,
                              {
                                className:
                                  "h-6 w-6 shrink-0 text-[#064E3B] md:h-7 md:w-7",
                              }
                            )
                          ) : (
                            <StrapiIcon
                              icon={Icon}
                              size={28}
                              className="h-6 w-6 shrink-0 text-[#064E3B] md:h-7 md:w-7"
                            />
                          )}
                        </div>

                        {/* Card Heading */}
                        <h3 className="mb-1 flex min-h-[50px] items-center justify-center text-sm leading-snug font-black tracking-tight whitespace-pre-line text-[#064E3B] md:mb-3 md:text-base">
                          {item.title}
                        </h3>

                        {/* Card Paragraph */}
                        {item.description && (
                          <p className="max-w-[200px] text-sm leading-relaxed font-normal text-[#594143] md:text-base">
                            {item.description}
                          </p>
                        )}
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

export default ClaimsSupport
