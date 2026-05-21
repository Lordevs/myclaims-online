import Image from "next/image"
import { Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { DetailedEnquiryForm } from "../forms/detailed-enquiry-form"
import { cn } from "@/lib/utils"
import type { FormEntry } from "@/lib/strapi/types/collections"

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
  onSubmit?: (data: Record<string, string>) => void
  /** Additional styling class */
  className?: string
  /** Fully populated form relation from Strapi */
  form?: FormEntry | null
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
  title,
  subtitle,
  listItems,
  arrowSrc,
  onSubmit,
  className,
  form,
}: DetailedEnquirySectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[#F9FAF5] py-20 font-sans md:py-28",
        className
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN: Headings, Olive Checklist, and Twisted Arrow */}
          <div className="relative z-10 col-span-1 flex h-full min-h-full flex-col justify-center text-left lg:col-span-6">
            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col justify-center">
                {/* Bold Charcoal Heading */}
                {title && (
                  <h2 className="mb-6 text-xl leading-none font-extrabold tracking-tight text-[#0F172A] md:text-3xl">
                    {title}
                  </h2>
                )}

                {/* Elegant Terracotta Paragraph */}
                {subtitle && (
                  <p className="mb-8 max-w-lg text-sm leading-relaxed font-medium text-[#594143] md:text-xl">
                    {subtitle}
                  </p>
                )}

                {/* Olive Green Checklist */}
                {listItems && listItems.length > 0 && (
                  <div className="mb-2 flex flex-col gap-3.5">
                    {listItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border border-[#4A6412] bg-[#F4F8E5] shadow-none">
                          <Check
                             className="h-3.5 w-3.5 text-[#4A6412]"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm leading-none font-bold text-[#4A6412] md:text-lg">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Twisted Pink Arrow Graphic - Positioned at bottom right of left column */}
                {arrowSrc && (
                  <div className="pointer-events-none relative z-20 mt-4 hidden aspect-1.75/1 w-[200px] self-end select-none sm:w-[240px] md:block md:w-[280px]">
                    <Image
                      src={arrowSrc}
                      alt="Twisted Arrow Decorative Illustration"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Extracted Neobrutalist Enquiry Form Card */}
          <div className="relative z-10 col-span-1 w-full lg:col-span-6">
            <FadeIn delay={0.25}>
              <DetailedEnquiryForm onSubmit={onSubmit} form={form} />
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DetailedEnquirySection
