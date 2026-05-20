import * as React from "react"
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
    <section
      className={cn(
        "relative w-full bg-white py-4 font-sans select-none md:py-6",
        className
      )}
    >
      <Container>
        <FadeIn delay={0.1}>
          <div
            className={cn(
              "flex w-full flex-col items-center justify-between gap-6 md:flex-row",
              "rounded-[20px] border border-white/10 bg-[linear-gradient(90deg,#064E3B_0%,#065F46_100%)]",
              "p-5 shadow-[0px_10px_35px_rgba(0,0,0,0.12)] md:px-8 md:py-6"
            )}
          >
            {/* Left Content Column (Icon, Title, Subtitle) */}
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
              {/* Circular White Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14">
                <Icon
                  className="h-5.5 w-5.5 text-[#AF2144]"
                  strokeWidth={2.4}
                />
              </div>

              {/* Title and Subtitle Text */}
              <div className="flex flex-col gap-1 select-text">
                <h3 className="text-[15px] leading-tight font-bold tracking-tight text-white sm:text-lg">
                  {title}
                </h3>
                <p className="max-w-2xl text-[12.5px] leading-relaxed font-medium text-[#D1FAE5CC] sm:text-sm">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right Action Column (Ruby Red Pill Button) */}
            <div className="flex w-full shrink-0 justify-center sm:w-auto">
              <Button
                asChild
                className={cn(
                  "w-full cursor-pointer rounded-full px-6 py-2.5 text-[14.5px] font-extrabold tracking-wide transition-all duration-150 select-text active:scale-[0.98] sm:w-auto sm:px-8 sm:py-3.5 sm:text-[16px]",
                  "flex h-auto items-center justify-center gap-2 border border-[#AF2144] bg-[#AF2144] text-white select-none hover:bg-[#961c3a]!"
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

export default GreenCTASection
