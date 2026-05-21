import Link from "next/link"
import { Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StrapiImage } from "@/components/strapi/strapi-image"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

export interface HeroProps {
  /** The primary bold green heading */
  title: string
  /** Description paragraph underneath the heading */
  description: string
  /** Array of check list statements */
  listItems?: string[]
  /** Path to the main illustration/photo asset */
  image?: StrapiMediaComponent | null
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
  image,
  primaryBtnText = "Start My Claim",
  primaryBtnHref = "#enquiry-form",
  secondaryBtnText = "Call Now",
  secondaryBtnHref = "tel:07930444467",
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pt-20 pb-16 text-left md:pt-28 md:pb-24",
        className
      )}
      style={{
        background:
          "linear-gradient(109.99deg, #F4F8E5 0%, #F4F8E5 35%, #F4F8E5 70%, #FFFFFF 100%)",
      }}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN: Content, List and Actions */}
          <div className="col-span-1 flex flex-col justify-center lg:col-span-7">
            <FadeIn delay={0.1}>
              {/* Bold Pine Green Heading */}
              <h1 className="mb-6 text-3xl leading-[1.1] font-extrabold tracking-tight text-[#064E3B] md:text-5xl lg:text-[54px]">
                {title}
              </h1>

              {/* Sub-paragraph description */}
              <p className="mb-8 max-w-2xl text-sm leading-relaxed font-normal text-[#444444] md:text-base lg:text-[17px]">
                {description}
              </p>

              {/* Vertical Check-mark Item List */}
              <div className="mb-10 flex flex-col gap-3.5">
                {listItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1B6E3F] shadow-none">
                      <Check
                        className="h-3.5 w-3.5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-sm leading-none font-semibold text-[#111111] md:text-base">
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
                    "flex h-auto cursor-pointer items-center justify-center rounded-xl px-8 py-3.5 font-bold transition-transform duration-150 active:scale-[0.97] sm:px-10",
                    "border-2 border-[#064E3B] bg-[#E94E6B] text-white shadow-[4px_4px_0px_0px_#064E3B] hover:bg-[#d0425c]!",
                    "text-sm select-none sm:text-base"
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
                    "flex h-auto cursor-pointer items-center justify-center rounded-xl px-8 py-3.5 font-bold transition-transform duration-150 active:scale-[0.97] sm:px-10",
                    "border-2 border-[#064E3B] bg-white text-[#064E3B] shadow-none hover:bg-slate-50!",
                    "text-sm select-none sm:text-base"
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
          <div className="relative col-span-1 lg:col-span-5">
            <FadeIn delay={0.25}>
              <div className="relative mx-auto aspect-[1.15/1] w-full max-w-[600px] lg:max-w-none">
                {/* Lime Decorative rotated div behind */}
                <div
                  className={cn(
                    "absolute -inset-4 rounded-xl border-[1.81px] border-[#064E3B] bg-[#CEEE8D]",
                    "z-0 translate-x-1 translate-y-0 -rotate-2 transform"
                  )}
                />

                {/* Front Image Canvas */}
                <div className="absolute inset-0 z-10 overflow-hidden rounded-xl bg-white">
                  <StrapiImage
                    image={image}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    fallbackSrc="/hero-placeholder.avif"
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

export default Hero
