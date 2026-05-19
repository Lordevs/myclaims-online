import * as React from "react"
import Link from "next/link"
import { Phone, Car, Bike } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OneCallCTAProps {
  title?: string
  subtitle?: string
  phoneLabel?: string
  phoneValue?: string
  enquiryLabel?: string
  enquiryHref?: string
  leftIcon?: React.ComponentType<{ className?: string }>
  rightIcon?: React.ComponentType<{ className?: string }>
  className?: string
}

/**
 * OneCallCTA Component
 * A premium high-fidelity Neo-Brutalist Call-To-Action section. Features thick borders
 * (4.5px top/bottom in #0D421B), vibrant background (#E94E6B), premium box-shadow buttons,
 * and customizable absolute backdrop icons.
 */
export function OneCallCTA({
  title = "One Call We Handle Everything",
  subtitle = "From recovery to compensation, we take care of your entire claim.",
  phoneLabel = "Call Now",
  phoneValue = "07930 444467",
  enquiryLabel = "Submit Enquiry",
  enquiryHref = "#enquiry-form",
  leftIcon: LeftIcon = Car,
  rightIcon: RightIcon = Bike,
  className,
}: OneCallCTAProps) {
  // Convert phone number to standard tel link
  const telLink = `tel:${phoneValue.replace(/\s+/g, "")}`

  return (
    <section
      className={cn(
        "relative bg-[#E94E6B] w-full font-sans select-none overflow-hidden",
        "border-t-[4.5px] border-b-[4.5px] border-[#0D421B]",
        className
      )}
    >
      <Container className="relative z-10 py-20 md:py-28 ">
        {/* Background Vector Left Icon (Bottom-Left) */}
        <div className="absolute bottom-0 left-0 text-white/10 select-none pointer-events-none translate-y-12 translate-x-4 md:translate-x-8">
          <LeftIcon className="w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 stroke-[1.5]" />
        </div>

        {/* Background Vector Right Icon (Bottom-Right) */}
        <div className="absolute bottom-0 right-0 text-white/10 select-none pointer-events-none translate-y-12 -translate-x-4 md:-translate-x-8 ">
          <RightIcon className="w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 stroke-[1.5]" />
        </div>

        <FadeIn delay={0.1} className="flex flex-col items-center text-center">
          {/* Main Heading */}
          <h2 className="text-white text-3xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight mb-4 leading-tight">
            {title}
          </h2>

          {/* Subtitle Tagline */}
          <p className="text-[#FFFFFFE5] text-sm md:text-xl font-normal max-w-xl leading-relaxed mb-10 md:mb-12">
            {subtitle}
          </p>

          {/* Action Buttons Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 md:gap-8 w-full sm:w-auto px-4 sm:px-0">
            {/* Call Now Button */}
            <Button
              asChild
              className={cn(
                "w-[220px] sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4.5 rounded-xl font-bold text-white bg-[#0D421B] hover:bg-[#072d11]! transition-transform active:scale-[0.97] duration-150 border-[2.25px] border-[#1A1C19] flex items-center justify-center gap-3 h-auto select-none shadow-[4.5px_4.5px_0px_0px_#1A1C19]",
                "text-sm sm:text-base cursor-pointer"
              )}
            >
              <a href={telLink}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                <span>{phoneLabel}</span>
              </a>
            </Button>

            {/* Submit Enquiry Button */}
            <Button
              asChild
              className={cn(
                "w-[220px] sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4.5 rounded-xl font-bold text-[#E94E6B] bg-white hover:bg-slate-50! transition-transform active:scale-[0.97] duration-150 border-[2.25px] border-[#1A1C19] flex items-center justify-center h-auto select-none shadow-[4.5px_4.5px_0px_0px_#1A1C19]",
                "text-sm sm:text-base cursor-pointer"
              )}
            >
              <Link href={enquiryHref}>
                <span>{enquiryLabel}</span>
              </Link>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default OneCallCTA
