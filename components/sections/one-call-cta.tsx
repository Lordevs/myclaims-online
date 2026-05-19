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
        "relative w-full overflow-hidden bg-[#E94E6B] font-sans select-none",
        "border-t-[4.5px] border-b-[4.5px] border-[#0D421B]",
        className
      )}
    >
      <Container className="relative z-10 py-20 md:py-28">
        {/* Background Vector Left Icon (Bottom-Left) */}
        <div className="pointer-events-none absolute bottom-0 left-0 translate-x-4 translate-y-12 text-white/10 select-none md:translate-x-8">
          <LeftIcon className="h-36 w-36 stroke-[1.5] sm:h-56 sm:w-56 md:h-72 md:w-72" />
        </div>

        {/* Background Vector Right Icon (Bottom-Right) */}
        <div className="pointer-events-none absolute right-0 bottom-0 -translate-x-4 translate-y-12 text-white/10 select-none md:-translate-x-8">
          <RightIcon className="h-36 w-36 stroke-[1.5] sm:h-56 sm:w-56 md:h-72 md:w-72" />
        </div>

        <FadeIn delay={0.1} className="flex flex-col items-center text-center">
          {/* Main Heading */}
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-[54px]">
            {title}
          </h2>

          {/* Subtitle Tagline */}
          <p className="mb-10 max-w-xl text-sm leading-relaxed font-normal text-[#FFFFFFE5] md:mb-12 md:text-xl">
            {subtitle}
          </p>

          {/* Action Buttons Grid */}
          <div className="flex w-full flex-col items-center justify-center gap-5 px-4 sm:w-auto sm:flex-row sm:gap-6 sm:px-0 md:gap-8">
            {/* Call Now Button */}
            <Button
              asChild
              className={cn(
                "flex h-auto w-[220px] items-center justify-center gap-3 rounded-xl border-[2.25px] border-[#1A1C19] bg-[#0D421B] px-6 py-3.5 font-bold text-white shadow-[4.5px_4.5px_0px_0px_#1A1C19] transition-transform duration-150 select-none hover:bg-[#072d11]! active:scale-[0.97] sm:w-auto sm:px-8 sm:py-4.5",
                "cursor-pointer text-sm sm:text-base"
              )}
            >
              <a href={telLink}>
                <Phone
                  className="h-4 w-4 text-white sm:h-5 sm:w-5"
                  strokeWidth={2.5}
                />
                <span>{phoneLabel}</span>
              </a>
            </Button>

            {/* Submit Enquiry Button */}
            <Button
              asChild
              className={cn(
                "flex h-auto w-[220px] items-center justify-center rounded-xl border-[2.25px] border-[#1A1C19] bg-white px-8 py-3.5 font-bold text-[#E94E6B] shadow-[4.5px_4.5px_0px_0px_#1A1C19] transition-transform duration-150 select-none hover:bg-slate-50! active:scale-[0.97] sm:w-auto sm:px-10 sm:py-4.5",
                "cursor-pointer text-sm sm:text-base"
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
