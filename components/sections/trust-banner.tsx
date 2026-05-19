import { Star } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"

interface TrustBannerProps {
  /** The primary trust statement heading */
  title?: string
  /** The secondary rating or platform subtitle */
  subtitle?: string
  /** Number of stars to display (default is 5) */
  rating?: number
  /** Additional styling classes for the container block */
  className?: string
}

/**
 * TrustBanner Component
 * A premium Neo-Brutalist trust & social-proof banner. Features five filled rose-pink stars,
 * high-contrast deep slate and forest green typography, and an active pastel lime background.
 */
export function TrustBanner({
  title = "Trusted by thousands of drivers across the UK",
  subtitle = "Excellent Rating on Google Reviews",
  rating = 5,
  className,
}: TrustBannerProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden border-b-[2.25px] border-[#0F172A] bg-[#CEEE8D] py-8 font-sans select-none md:py-20",
        className
      )}
    >
      <Container>
        <FadeIn
          delay={0.1}
          className="flex flex-col items-center gap-4 text-center md:gap-12"
        >
          {/* Centered Rating Stars */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.max(0, rating) }).map((_, idx) => (
              <Star
                key={idx}
                className="h-5 w-5 fill-[#E94E6B] text-[#E94E6B]"
                strokeWidth={1.5}
              />
            ))}
          </div>

          {/* Primary Trust Message */}
          <h3 className="mb-2 text-base leading-tight font-extrabold tracking-tight text-[#0F172A] md:text-[28px]">
            {title}
          </h3>

          {/* Secondary Subtitle Tagline */}
          <p className="text-xs leading-none font-normal tracking-wide text-[#064E3B] uppercase opacity-90 md:text-[23px]">
            {subtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}

export default TrustBanner
