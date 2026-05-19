'use client'

import * as React from "react"
import Link from "next/link"
import { Phone } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface GreenCTASectionProps {
  /** Main title text */
  title?: string
  /** Subtitle narrative */
  subtitle?: string
  /** Button label */
  buttonLabel?: string
  /** Button target URL */
  buttonHref?: string
  /** Main icon displayed in the badge circle */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
  /** Custom additional styling class */
  className?: string
}

/**
 * GreenCTASection Component.
 * High-fidelity floating green card banner matching the custom mockup exactly.
 * Visual specifications:
 * - Floating Card bg: linear-gradient(90deg, #064E3B 0%, #065F46 100%)
 * - Border: 1px solid #FFFFFF1A (subtle border)
 * - Rounded corners: rounded-[20px]
 * - Shadow: deep shadow-lg drop-shadow
 * - Left Phone Icon: color #AF2144, bg white (w-12 h-12 md:w-14 md:h-14 rounded-full)
 * - Title: white (text-base md:text-lg font-extrabold)
 * - Subtitle: #D1FAE5CC (text-xs md:text-sm)
 * - Right Action Pill Button: bg-[#AF2144], text-white, rounded-full
 */
export function GreenCTASection({
  title = "Speak to a Specialist Today",
  subtitle = "We provide immediate legal support and vehicle recovery.",
  buttonLabel = "0800 123 4567",
  buttonHref = "tel:08001234567",
  icon: Icon = Phone,
  className,
}: GreenCTASectionProps) {
  return (
    <section className={cn("w-full py-4 md:py-6 bg-white font-sans relative select-none", className)}>
      <Container>
        <FadeIn delay={0.1}>
          <div
            className={cn(
              "flex flex-col md:flex-row items-center justify-between gap-6 w-full",
              "bg-[linear-gradient(90deg,#064E3B_0%,#065F46_100%)] border border-white/10 rounded-[20px]",
              "p-5 md:py-6 md:px-8 shadow-[0px_10px_35px_rgba(0,0,0,0.12)]"
            )}
          >

            {/* Left Content Column (Icon, Title, Subtitle) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left max-w-3xl">

              {/* Circular White Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shrink-0 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105">
                <Icon className="w-5.5 h-5.5 text-[#AF2144]" strokeWidth={2.4} />
              </div>

              {/* Title and Subtitle Text */}
              <div className="flex flex-col gap-1 select-text">
                <h3 className="text-white text-[15px] sm:text-lg font-bold tracking-tight leading-tight">
                  {title}
                </h3>
                <p className="text-[#D1FAE5CC] text-[12.5px] sm:text-sm font-medium leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </div>

            </div>

            {/* Right Action Column (Ruby Red Pill Button) */}
            <div className="shrink-0 w-full sm:w-auto flex justify-center">
              <Button
                asChild
                className={cn(
                  "w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-extrabold text-[14.5px] sm:text-[16px] tracking-wide transition-all active:scale-[0.98] duration-150 cursor-pointer select-text",
                  "bg-[#AF2144] hover:bg-[#961c3a]! text-white flex items-center justify-center gap-2 select-none h-auto border border-[#AF2144]"
                )}
              >
                <a href={buttonHref}>
                  <span>{buttonLabel}</span>
                </a>
              </Button>
            </div>

          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default GreenCTASection;
