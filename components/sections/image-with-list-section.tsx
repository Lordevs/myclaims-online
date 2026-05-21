import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { CircleCheck } from "lucide-react"
import { StrapiImage } from "@/components/strapi/strapi-image"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

export interface ImageWithListSectionProps {
  /** The primary section heading title */
  title: string
  /** The Strapi media image object */
  image?: StrapiMediaComponent | null
  /** List of text bullet points to render with checkmark icons */
  listItems: string[]
  /** Flip layout: render image on the right instead of left (defaults to false) */
  imageOnRight?: boolean
}

/**
 * Reusable ImageWithListSection Component.
 * Implements a high-fidelity Neo-Brutalist split layout with list points
 * and a premium offset image frame (rotated 2 degrees) behind the primary image.
 *
 * Styling, colors, and layout ratios are fully hardcoded and locked
 * to prevent accidental modifications to theme compliance.
 */
export function ImageWithListSection({
  title,
  image,
  listItems,
  imageOnRight = false,
}: ImageWithListSectionProps) {
  return (
    <section className="w-full overflow-hidden border-t-[2.25px] border-b-[2.25px] border-[#064E3B] bg-[#EDEEE9] py-16 font-sans select-none md:py-24">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16 xl:gap-20">
          {/* Left/Right Column: Image Frame Wrapper */}
          <FadeIn
            delay={0.1}
            className={cn(
              "flex w-full justify-center lg:w-1/2",
              imageOnRight ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="relative aspect-[1.5] w-full max-w-[540px] sm:aspect-[1.6] md:aspect-[1.7] lg:aspect-[1.6]">
              {/* Decorative Rotated Div Behind */}
              <div className="pointer-events-none absolute -inset-4 translate-x-1 translate-y-1 rotate-2 transform rounded-[18px] border-[2.25px] border-[#064E3B] bg-[#CEEBC7] select-none" />
              {/* Actual Image Block */}
              {/* box-shadow: 4.5px 4.5px 0px 0px #064E3B; */}
              <div className="relative h-full w-full overflow-hidden rounded-[18px] border-[2.25px] border-[#064E3B] bg-white shadow-[4.5px_4.5px_0px_0px_#064E3B]">
                <StrapiImage
                  image={image}
                  className="block h-full w-full object-cover"
                  loading="lazy"
                  width={540}
                  height={540}
                />
              </div>
            </div>
          </FadeIn>

          {/* Right/Left Column: Text & List Items Content */}
          <FadeIn
            delay={0.2}
            className={cn(
              "flex w-full flex-col items-start lg:w-1/2",
              imageOnRight ? "lg:order-1" : "lg:order-2"
            )}
          >
            {/* Split Title Heading */}
            <h2 className="mb-8 text-left text-2xl leading-tight font-bold tracking-tight text-[#16352A] md:text-4xl">
              {title}
            </h2>

            {/* Support List Items */}
            <ul className="flex w-full flex-col gap-5">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-left">
                  {/* Decorative Check Circle Icon */}
                  <CircleCheck className="mt-0.5 text-[#AF2144]" />
                  <span className="text-sm leading-relaxed font-normal tracking-tight text-[#1A1C19] md:text-base lg:text-[17px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

export default ImageWithListSection
