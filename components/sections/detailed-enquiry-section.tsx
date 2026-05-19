import Image from "next/image"
import { Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { DetailedEnquiryForm } from "../forms/detailed-enquiry-form"
import { cn } from "@/lib/utils"

export interface DetailedEnquirySectionProps {
  /** Title on the left column */
  title?: string
  /** Subtitle on the left column */
  subtitle?: string
  /** Checklist statements */
  listItems?: string[]
  /** Image source path for the twisted arrow graphic */
  arrowSrc?: string
  /** Custom submit handler passed down to the form */
  onSubmit?: (data: { name: string; email: string; phone: string; message: string }) => void
  /** Additional styling class */
  className?: string
}

/**
 * High-fidelity, neobrutalist DetailedEnquirySection Component.
 * Integrates:
 * - Section Background: #F9FAF5
 * - Olive Green Checklist (#4A6412 badges)
 * - Arrow decoration linking text and card (/twisted-arrow.avif)
 * - Isolated, highly-reusable DetailedEnquiryForm card
 */
export function DetailedEnquirySection({
  title = "Submit Your Enquiry",
  subtitle = "Leave your details and a dedicated case handler will contact you to explain how we can assist with your claim.",
  listItems = [
    "Fast-track processing",
    "Expert legal advice",
    "Dedicated support",
  ],
  arrowSrc = "/twisted-arrow.avif",
  onSubmit,
  className,
}: DetailedEnquirySectionProps) {
  return (
    <section className={cn("w-full py-20 md:py-28 bg-[#F9FAF5] font-sans relative overflow-hidden", className)}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* LEFT COLUMN: Headings, Olive Checklist, and Twisted Arrow */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left relative z-10 h-full min-h-full">
            <FadeIn delay={0.1}>
              <div className="flex flex-col justify-center h-full">
                {/* Bold Charcoal Heading */}
                <h2 className="text-[#0F172A] text-xl md:text-3xl font-extrabold tracking-tight leading-none mb-6">
                  {title}
                </h2>

                {/* Elegant Terracotta Paragraph */}
                <p className="text-[#594143] text-sm md:text-xl leading-relaxed mb-8 max-w-lg font-medium">
                  {subtitle}
                </p>

                {/* Olive Green Checklist */}
                <div className="flex flex-col gap-3.5 mb-2">
                  {listItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5.5 h-5.5 rounded-full shrink-0 flex items-center justify-center border border-[#4A6412] bg-[#F4F8E5] shadow-none">
                        <Check className="w-3.5 h-3.5 text-[#4A6412]" strokeWidth={3} />
                      </div>
                      <span className="text-[#4A6412] text-sm md:text-lg font-bold leading-none">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Twisted Pink Arrow Graphic - Positioned at bottom right of left column */}
                <div className="hidden md:block relative w-[200px] sm:w-[240px] md:w-[280px] aspect-1.75/1 mt-4 self-end select-none pointer-events-none z-20">
                  <Image
                    src={arrowSrc}
                    alt="Twisted Arrow Decorative Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Extracted Neobrutalist Enquiry Form Card */}
          <div className="col-span-1 lg:col-span-6 w-full relative z-10">
            <FadeIn delay={0.25}>
              <DetailedEnquiryForm onSubmit={onSubmit} />
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default DetailedEnquirySection;
