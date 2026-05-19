import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface FeatureCardItem {
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface FeaturesGridSectionProps {
  /** Section Heading Title */
  title: string
  /** The 6-card items list */
  items: FeatureCardItem[]

  /** Section background tailwind style (e.g. "bg-[#F8FAEE]") */
  bgClass?: string
  /** Section heading color tailwind style (e.g. "text-[#064E3B]") */
  titleColorClass?: string

  /** Card background style (e.g. "bg-white") */
  cardBgClass?: string
  /** Card corner radius styling class (e.g. "rounded-2xl") */
  cardRadiusClass?: string
  /** Card padding styling class (e.g. "p-6 py-10 md:p-[36px]") */
  cardPaddingClass?: string
  /** Card border size & color styles (e.g. "border-[2.25px] border-[#0F172A]") */
  cardBorderClass?: string
  /** Card heading text color (e.g. "text-[#111111]") */
  cardHeadingColorClass?: string
  /** Card description text color (e.g. "text-[#444444]") */
  cardDescColorClass?: string
  /** Custom shadow Tailwind class (e.g. "shadow-[4.5px_4.5px_0px_0px_#1A1C19]") */
  cardShadowClass?: string

  /** Icon color (e.g. "text-[#1A5C3A]") */
  iconColorClass?: string
  /** Icon background circle class (e.g. "bg-[#EAF5EE]"). Leave blank to render icon raw without circle. */
  iconBgClass?: string

  /** Optional CTA Button specs */
  button?: {
    label: string
    href: string
    bgClass?: string
    borderClass?: string
    textColorClass?: string
    shadowClass?: string
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
  bgClass = "bg-[#F9FAF5]",
  titleColorClass = "text-[#0F172A]",
  cardBgClass = "bg-white",
  cardRadiusClass = "rounded-2xl",
  cardPaddingClass = "p-6 py-10 md:p-8 md:py-12",
  cardBorderClass = "border-[2.25px] border-[#0F172A]",
  cardHeadingColorClass = "text-[#0F172A]",
  cardDescColorClass = "text-[#594143]",
  cardShadowClass = "shadow-[4.5px_4.5px_0px_0px_#1A1C19]",
  iconColorClass = "text-[#E94E6B]",
  iconBgClass,
  button,
}: FeaturesGridSectionProps) {
  return (
    <section className={cn("py-20 md:py-28 font-sans w-full select-none overflow-hidden", bgClass)}>
      <Container>
        <div className="flex flex-col items-center">
          {/* Section Centered Heading */}
          <FadeIn delay={0.1}>
            <h2 className={cn("text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-12 md:mb-20", titleColorClass)}>
              {title}
            </h2>
          </FadeIn>

          {/* Staggered Grid Content */}
          <StaggerContainer delayChildren={0.2} staggerDelay={0.08} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full mb-12 md:mb-16">
              {items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={idx} className="h-full">
                    <div
                      className={cn(
                        "flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.01] h-full",
                        cardRadiusClass,
                        cardPaddingClass,
                        cardBgClass,
                        cardBorderClass,
                        cardShadowClass
                      )}
                    >
                      {/* Icon Rendering - Circular container wrapper vs Raw centered icon */}
                      {iconBgClass ? (
                        <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-6 shrink-0", iconBgClass)}>
                          <Icon className={cn("w-6 h-6 shrink-0", iconColorClass)} strokeWidth={2.25} />
                        </div>
                      ) : (
                        <Icon className={cn("w-10 h-10 mb-6 shrink-0", iconColorClass)} strokeWidth={2} />
                      )}

                      {/* Card Header Title */}
                      <h3 className={cn("text-lg md:text-2xl font-bold tracking-tight mb-3 leading-snug", cardHeadingColorClass)}>
                        {item.title}
                      </h3>

                      {/* Card Body Description */}
                      <p className={cn("text-sm md:text-base font-normal leading-relaxed max-w-xs", cardDescColorClass)}>
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
                  "px-12 py-3.5 rounded-lg font-bold text-sm md:text-base h-auto transition-transform active:scale-[0.97] duration-150 cursor-pointer select-none",
                  button.bgClass || "bg-[#E6405E]",
                  button.borderClass || "border border-white",
                  button.textColorClass || "text-white",
                  button.shadowClass
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
