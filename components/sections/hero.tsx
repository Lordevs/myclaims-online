import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HeroProps {
  /** The primary bold green heading */
  title: string
  /** Description paragraph underneath the heading */
  description: string
  /** Array of check list statements */
  listItems?: string[]
  /** Path to the main illustration/photo asset */
  imageSrc?: string
  /** Alt label for accessibility */
  imageAlt?: string
  /** Label for the pink action button */
  primaryBtnText?: string
  /** Destination for the pink action button */
  primaryBtnHref?: string
  /** Label for the white button */
  secondaryBtnText?: string
  /** Destination for the white button */
  secondaryBtnHref?: string
  /** Optional custom class */
  className?: string
}

/**
 * High-fidelity, reusable Hero Component.
 * Implements a split two-column hero layout with brand colors, linear gradients,
 * check lists, and offset rotated illustrations matching the mockup perfectly.
 */
export function Hero({
  title,
  description,
  listItems = [
    "Like-for-like Taxi, Uber and Private Hire",
    "No upfront costs",
    "24/7 accident recovery",
    "Personal injury support",
    "Nationwide Service",
  ],
  imageSrc = "/hero-placeholder.avif",
  imageAlt = "Taxi Uber Accident Collision Illustration",
  primaryBtnText = "Start My Claim",
  primaryBtnHref = "#enquiry-form",
  secondaryBtnText = "Call Now",
  secondaryBtnHref = "tel:07930444467",
  className,
}: HeroProps) {
  return (
    <section
      className={cn("w-full pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden text-left relative", className)}
      style={{
        background: "linear-gradient(109.99deg, #F4F8E5 0%, #F4F8E5 35%, #F4F8E5 70%, #FFFFFF 100%)",
      }}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Content, List and Actions */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            <FadeIn delay={0.1}>
              {/* Bold Pine Green Heading */}
              <h1 className="text-[#064E3B] text-3xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1] mb-6">
                {title}
              </h1>

              {/* Sub-paragraph description */}
              <p className="text-[#444444] text-sm md:text-base lg:text-[17px] leading-relaxed mb-8 max-w-2xl font-normal">
                {description}
              </p>

              {/* Vertical Check-mark Item List */}
              <div className="flex flex-col gap-3.5 mb-10">
                {listItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center bg-[#1B6E3F] shadow-none">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[#111111] text-sm md:text-base font-semibold leading-none">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Responsive CTA Actions */}
              <div className="flex flex-row items-center gap-4 sm:gap-5">
                {/* Pink Button with Dark Shadow */}
                <Button
                  asChild
                  className={cn(
                    "px-8 py-3.5 sm:px-10 rounded-xl font-bold transition-transform active:scale-[0.97] duration-150 flex items-center justify-center h-auto cursor-pointer",
                    "bg-[#E94E6B] text-white border-2 border-[#064E3B] shadow-[4px_4px_0px_0px_#064E3B] hover:bg-[#d0425c]!",
                    "text-sm sm:text-base select-none"
                  )}
                >
                  <Link href={primaryBtnHref}>
                    <span>{primaryBtnText}</span>
                  </Link>
                </Button>

                {/* White Button with Green Border */}
                <Button
                  asChild
                  className={cn(
                    "px-8 py-3.5 sm:px-10 rounded-xl font-bold transition-transform active:scale-[0.97] duration-150 flex items-center justify-center h-auto cursor-pointer",
                    "bg-white text-[#064E3B] border-2 border-[#064E3B] hover:bg-slate-50! shadow-none",
                    "text-sm sm:text-base select-none"
                  )}
                >
                  <a href={secondaryBtnHref}>
                    <span>{secondaryBtnText}</span>
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Interactive Rotated Frame Illustration */}
          <div className="col-span-1 lg:col-span-5 relative">
            <FadeIn delay={0.25}>
              <div className="relative w-full max-w-[600px] lg:max-w-none aspect-[1.15/1] mx-auto">
                {/* Lime Decorative rotated div behind */}
                <div
                  className={cn(
                    "absolute -inset-4 bg-[#CEEE8D] border-[1.81px] border-[#064E3B] rounded-xl",
                    "-rotate-2 transform translate-x-1 translate-y-0 z-0"
                  )}
                />

                {/* Front Image Canvas */}
                <div className="absolute inset-0 bg-white rounded-xl overflow-hidden z-10">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default Hero;
