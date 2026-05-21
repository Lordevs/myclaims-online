"use client"

import * as React from "react"
import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { StrapiIcon } from "@/components/strapi/strapi-icon"

export interface FeatureCardItem {
  icon: any
  title: string
  description: string | null
}

export interface FeaturesGridSectionProps {
  /** Section Heading Title */
  title: string
  /** The 6-card items list */
  items: FeatureCardItem[]
  /** Unified theme selection */
  theme?: "pink" | "green"
  /** Optional CTA Button specs */
  button?: {
    label: string
    href: string
  }
}

/**
 * Reusable FeaturesGridSection Component
 * Encapsulates the visual grid layout for "What We Offer" and "Why Choose Us" sections.
 * Optimized with framer-motion entry transitions and strict DRY architecture.
 */
export function FeaturesGridSection({
  title,
  items,
  theme = "green",
  button,
}: FeaturesGridSectionProps) {
  const isPink = theme === "pink"

  const bgClass = isPink ? "bg-[#F9FAF5]" : "bg-[#F8FAEE]"
  const titleColorClass = isPink ? "text-[#E94E6B]" : "text-[#064E3B]"
  const iconColorClass = isPink ? "text-[#E94E6B]" : "text-[#064E3B]"

  const buttonBgClass = "bg-[#E6405E] hover:bg-[#d6304e]!"
  const buttonBorderClass =
    "border-[2.25px] border-[#0F172A] shadow-[3px_3px_0px_0px_#0F172A]"
  const buttonTextColorClass = "text-white font-bold"

  // Unified neo-brutalist card styling
  const cardBgClass = "bg-white"
  // In green theme the left bottom of card has 0 radius
  const cardRadiusClass = isPink ? "rounded-2xl" : "rounded-2xl rounded-bl-none"
  const cardPaddingClass = "p-6 py-10 md:p-8 md:py-12"
  const cardBorderClass = "border-[2.25px] border-[#0F172A]"
  const cardShadowClass = "shadow-[4.5px_4.5px_0px_0px_#0F172A]"
  const cardHeadingColorClass = "text-[#0F172A]"
  const cardDescColorClass = "text-[#594143]"

  return (
    <section
      className={cn(
        "w-full overflow-hidden py-20 font-sans select-none md:py-28",
        bgClass
      )}
    >
      <Container>
        <div className="flex flex-col items-center">
          {/* Section Centered Heading */}
          <FadeIn delay={0.1}>
            <h2
              className={cn(
                "mb-12 text-center text-3xl font-extrabold tracking-tight md:mb-20 md:text-5xl",
                titleColorClass
              )}
            >
              {title}
            </h2>
          </FadeIn>

          {/* Staggered Grid Content */}
          <StaggerContainer
            delayChildren={0.2}
            staggerDelay={0.08}
            className="w-full"
          >
            <div className="mb-12 grid w-full grid-cols-1 gap-6 md:mb-16 md:grid-cols-3 md:gap-8 lg:gap-10">
              {items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={idx} className="h-full">
                    <div
                      className={cn(
                        "flex h-full flex-col items-center text-center transition-transform duration-200 hover:scale-[1.01]",
                        cardRadiusClass,
                        cardPaddingClass,
                        cardBgClass,
                        cardBorderClass,
                        cardShadowClass
                      )}
                    >
                      {/* Icon Rendering - Circular container in green theme, raw in pink theme */}
                      {!isPink ? (
                        <div
                          className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF5EE]"
                        >
                          {typeof Icon === "function" || React.isValidElement(Icon) ? (
                            <Icon
                              className={cn("h-10 w-10 shrink-0", iconColorClass)}
                              strokeWidth={2.25}
                            />
                          ) : (
                            <StrapiIcon
                              icon={Icon}
                              size={24}
                              className={cn("h-10 w-10 shrink-0", iconColorClass)}
                            />
                          )}
                        </div>
                      ) : (
                        typeof Icon === "function" || React.isValidElement(Icon) ? (
                          <Icon
                            className={cn(
                              "mb-6 h-10 w-10 shrink-0",
                              iconColorClass
                            )}
                            strokeWidth={2}
                          />
                        ) : (
                          <StrapiIcon
                            icon={Icon}
                            size={40}
                            className={cn(
                              "mb-6 h-10 w-10 shrink-0",
                              iconColorClass
                            )}
                          />
                        )
                      )}

                      {/* Card Header Title */}
                      <h3
                        className={cn(
                          "mb-3 text-lg leading-snug font-bold tracking-tight md:text-2xl",
                          cardHeadingColorClass
                        )}
                      >
                        {item.title}
                      </h3>

                      {/* Card Body Description */}
                      <p
                        className={cn(
                          "max-w-xs text-sm leading-relaxed font-normal md:text-base",
                          cardDescColorClass
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                )
              })}
            </div>
          </StaggerContainer>

          {/* Optional Center CTA Button */}
          {button && (
            <FadeIn delay={0.4}>
              <Button
                asChild
                className={cn(
                  "h-auto cursor-pointer rounded-lg px-12 py-3.5 text-sm font-bold transition-transform duration-150 select-none active:scale-[0.97] md:text-base",
                  buttonBgClass,
                  buttonBorderClass,
                  buttonTextColorClass
                )}
              >
                <Link href={button.href}>
                  <span>{button.label}</span>
                </Link>
              </Button>
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  )
}

export default FeaturesGridSection
