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
        "bg-[#CEEE8D] py-8 md:py-20 border-b-[2.25px] border-[#0F172A] w-full font-sans select-none overflow-hidden",
        className
      )}
    >
      <Container>
        <FadeIn delay={0.1} className="flex flex-col items-center text-center gap-4 md:gap-12">
          {/* Centered Rating Stars */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.max(0, rating) }).map((_, idx) => (
              <Star
                key={idx}
                className="w-5 h-5 text-[#E94E6B] fill-[#E94E6B]"
                strokeWidth={1.5}
              />
            ))}
          </div>

          {/* Primary Trust Message */}
          <h3 className="text-[#0F172A] text-base md:text-[28px] font-extrabold tracking-tight mb-2 leading-tight">
            {title}
          </h3>

          {/* Secondary Subtitle Tagline */}
          <p className="text-[#064E3B] text-xs md:text-[23px] font-normal tracking-wide uppercase leading-none opacity-90">
            {subtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}

export default TrustBanner
