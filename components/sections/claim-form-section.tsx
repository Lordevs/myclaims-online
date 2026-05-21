import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { ClaimEnquiryForm } from "@/components/forms/claim-enquiry-form"
import type { FormEntry } from "@/lib/strapi/types/collections"
import { StrapiImage } from "@/components/strapi/strapi-image"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

export interface ClaimFormSectionProps {
  /** Title part in green */
  titleGreen?: string
  /** Title part in red */
  titleRed?: string
  /** Subtitle text */
  subtitle?: string
  /** The main visual photo */
  image?: StrapiMediaComponent | null
  /** Custom form submit callback */
  onSubmit?: (data: Record<string, string>) => void
  /** Optional class styling overrides */
  className?: string
  /** Fully populated form relation from Strapi */
  form?: FormEntry | null
}

/**
 * Premium, high-converting ClaimFormSection component.
 * Meticulously matches the design specifications:
 * - Gradient background cream-to-white
 * - High-contrast headings in #064E3B and #AF2144
 * - Soft-toned subtitle in #4C6549
 * - Border & drop shadow on main illustration
 * - Frosted-glass overlay status box with green indicator
 * - Integrates modular, reusable ClaimEnquiryForm card
 * - Responsive two-column split layout
 */
export function ClaimFormSection({
  titleGreen,
  titleRed,
  subtitle,
  image,
  onSubmit,
  className,
  form,
}: ClaimFormSectionProps) {
  return (
    <section
      id="enquiry-form"
      className={cn(
        "relative w-full overflow-hidden py-20 font-sans select-none md:py-28",
        className
      )}
      style={{
        background:
          "linear-gradient(109.99deg, #F4F8E5 0%, #F4F8E5 35%, #F4F8E5 70%, #FFFFFF 100%)",
      }}
    >
      <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN: Heading, Subtitle & Decorated Image */}
          <div className="col-span-1 flex flex-col justify-center text-left lg:col-span-6">
            <FadeIn delay={0.1}>
              {/* Heading */}
              {(titleGreen || titleRed) && (
                <h2 className="mb-6 text-[38px] leading-[1.1] font-extrabold tracking-tight text-[#064E3B] sm:text-[48px] md:text-[54px]">
                  {titleGreen} {titleGreen && titleRed && <br />}
                  {titleRed && <span className="text-[#AF2144]">{titleRed}</span>}
                </h2>
              )}

              {/* Subtitle */}
              {subtitle && (
                <p className="mb-10 max-w-lg text-base leading-relaxed font-medium text-[#4C6549] md:text-lg">
                  {subtitle}
                </p>
              )}

              {/* Styled Photo Frame */}
              {image && (
                <div className="relative w-full max-w-[480px]">
                  {/* Photo canvas */}
                  <div
                    className="relative aspect-[1.38/1] w-full overflow-hidden rounded-xl"
                    style={{
                      border: "4px solid #FFFFFF",
                      boxShadow: "0px 25px 50px -12px #00000040",
                    }}
                  >
                    <StrapiImage
                      image={image}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                      fallbackSrc="/contact-form.avif"
                    />
                  </div>

                  {/* Floating Frosted Glass Overlay Box */}
                  <div
                    className="absolute right-4 bottom-[-24px] z-20 flex flex-col gap-2 rounded-xl border border-[#FFFFFF80] px-4 py-6 text-left transition-transform duration-200 hover:scale-[1.02] sm:right-[-24px]"
                    style={{
                      background: "#FFFFFFB2",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Status header with green dot */}
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                      <span className="text-[10px] font-bold tracking-wider text-[#064E3B] uppercase md:text-xs">
                        Experts Online Now
                      </span>
                    </div>
                    {/* Status text */}
                    <p className="max-w-48 text-xs leading-tight font-semibold text-[#064E3B] md:text-sm">
                      Average response time:{" "}
                      <span className="text-[#AF2144]">8 minutes</span>
                    </p>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Blur-Filtered Lead Form */}
          <div className="col-span-1 w-full lg:col-span-6">
            <FadeIn delay={0.25}>
              <ClaimEnquiryForm onSubmit={onSubmit} form={form} />
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ClaimFormSection
