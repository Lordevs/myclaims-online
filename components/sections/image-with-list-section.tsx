import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { CircleCheck } from "lucide-react"
import Image from "next/image"


export interface ImageWithListSectionProps {
  /** The primary section heading title */
  title: string
  /** The absolute or relative path to the image asset */
  imageSrc: string
  /** The alternative text for the image */
  imageAlt?: string
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
  imageSrc,
  imageAlt = "Feature illustration",
  listItems,
  imageOnRight = false,
}: ImageWithListSectionProps) {
  return (
    <section
      className="py-16 md:py-24 border-t-[2.25px] border-b-[2.25px] border-[#064E3B] bg-[#EDEEE9] w-full font-sans select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
          {/* Left/Right Column: Image Frame Wrapper */}
          <FadeIn
            delay={0.1}
            className={cn(
              "w-full lg:w-1/2 flex justify-center",
              imageOnRight ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="relative w-full max-w-[540px] aspect-[1.5] sm:aspect-[1.6] md:aspect-[1.7] lg:aspect-[1.6]">
              {/* Decorative Rotated Div Behind */}
              <div
                className="absolute -inset-4 rounded-[18px] bg-[#CEEBC7] border-[2.25px] border-[#064E3B] transform rotate-2 translate-x-1 translate-y-1 pointer-events-none select-none"
              />
              {/* Actual Image Block */}
              {/* box-shadow: 4.5px 4.5px 0px 0px #064E3B; */}
              <div
                className="relative w-full h-full bg-white border-[2.25px] border-[#064E3B] rounded-[18px] overflow-hidden shadow-[4.5px_4.5px_0px_0px_#064E3B]"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover block"
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
              "w-full lg:w-1/2 flex flex-col items-start",
              imageOnRight ? "lg:order-1" : "lg:order-2"
            )}
          >
            {/* Split Title Heading */}
            <h2
              className="text-2xl md:text-4xl font-bold tracking-tight mb-8 leading-tight text-left text-[#16352A]"
            >
              {title}
            </h2>

            {/* Support List Items */}
            <ul className="flex flex-col gap-5 w-full">
              {listItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 text-left"
                >
                  {/* Decorative Check Circle Icon */}
                  <CircleCheck className="mt-0.5 text-[#AF2144]" />
                  <span
                    className="text-sm md:text-base lg:text-[17px] font-normal leading-relaxed tracking-tight text-[#1A1C19]"
                  >
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

export default ImageWithListSection;
