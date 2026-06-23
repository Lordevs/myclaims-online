"use client"

import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import type {
  FeatureCardComponent,
  IconhubField,
} from "@/lib/strapi/types/shared"

export interface BentoCardProps {
  /** Card heading text */
  title: string
  /** Card description body text */
  description: string
  /** Column span class for responsive grid layout */
  colSpanClass: string
  /** Optional icon to render on the left of row layout */
  icon?: IconhubField | { name: string; selectIcon?: string } | null | undefined
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
              <StrapiIcon
                icon={Icon}
                size={32}
                className={cn(
                  "h-7 w-7 md:h-8 md:w-8",
                  iconVariant === "pink" ? "text-white" : "text-[#A3E635]"
                )}
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

export interface AsymmetricRowSectionProps {
  title?: string
  items?: FeatureCardComponent[]
  className?: string
}

/**
 * High-fidelity Bento Grid section.
 * Renders BentoCards in an animated 12-column asymmetric grid layout.
 */
export function AsymmetricRowSection({
  title,
  items,
  className,
}: AsymmetricRowSectionProps) {
  if (!items || items.length === 0) return null

  const getColSpan = (idx: number, total: number) => {
    if (total === 5) {
      if (idx === 0 || idx === 1) return "lg:col-span-6"
      return "md:col-span-4"
    }
    if (total === 6) {
      if (idx === 0 || idx === 1) return "lg:col-span-6"
      return "lg:col-span-3 md:col-span-6"
    }
    if (idx === 0 || idx === 1) return "lg:col-span-6"
    return "lg:col-span-4 md:col-span-6"
  }

  const listItems = items.map((item, idx) => ({
    icon: item.icon,
    iconVariant: (idx % 2 === 0 ? "pink" : "green") as "pink" | "green",
    title: item.title,
    description: item.description || "",
    colSpanClass: getColSpan(idx, items.length),
  }))

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-white pt-8 pb-16 select-none",
        className
      )}
    >
      <Container>
        {/* Animated Main Section Header */}
        {title && (
          <FadeIn delay={0.1} className="mb-8 text-center">
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-[#064E3B] md:text-5xl">
              {title}
            </h2>
          </FadeIn>
        )}

        {/* Animated 12-Column Bento Grid */}
        <StaggerContainer>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
            {listItems.map((item, idx) => (
              <BentoCard
                key={idx}
                colSpanClass={item.colSpanClass}
                icon={item.icon}
                iconVariant={item.iconVariant}
                title={item.title}
                description={item.description}
                headingClass="text-lg"
                descriptionClass={
                  idx < 2 ? "text-lg" : "text-sm md:text-[15px]"
                }
              />
            ))}
          </div>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default AsymmetricRowSection
