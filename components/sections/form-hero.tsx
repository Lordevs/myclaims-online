import { Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { EnquiryForm } from "@/components/forms/enquiry-form"
import { cn } from "@/lib/utils"
import type { FormEntry } from "@/lib/strapi/types/collections"
import { StrapiImage } from "@/components/strapi/strapi-image"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

export interface FormHeroProps {
  /** The main landing page title */
  title: string
  /** Sub-paragraph copy under the title */
  description: string
  /** 8 Bulleted checkmark statements, will render in a 2-column grid on desktop */
  listItems?: string[]
  /** Source path of the replacement diagram */
  image?: StrapiMediaComponent | null
  /** Heading inside the enquiry card */
  formTitle?: string
  /** Subtitle inside the enquiry card */
  formSubtitle?: string
  /** Custom additional class classes */
  className?: string
  /** The fully populated Form entry from CMS */
  form?: FormEntry | null
}

/**
 * High-fidelity, reusable FormHero Component.
 * Integrates:
 * - Brand split linear gradient background
 * - Bold split-color heading system (#111111 and #064E3B)
 * - 2-Column responsive checklist (bg-[#1B6E3F] badges)
 * - Under-text vehicle replacement graphic (public/vehicle_replacement_diagram.png)
 * - Clean layout with integrated responsive EnquiryForm on the right side
 */
export function FormHero({
  title = "Had an Accident? Need a Replacement Vehicle Fast?",
  description = "We manage your entire claim, provide a like for like replacement vehicle, and deal with insurers so you don't have to.",
  listItems = [
    "Car, Taxi, Motorbike, Cycle & E-Scooter Claims",
    "Replacement Vehicles Within 24 Hours",
    "Approved Repairs at Trusted Garages",
    "No Upfront Costs & Nationwide Service",
    "Expert Claims Management & Support",
    "Direct Insurance Company Liaison",
    "Vehicle Recovery & Towing Services",
    "Free Legal Consultation & Advice",
  ],
  image,
  formTitle,
  formSubtitle,
  className,
  form,
}: FormHeroProps) {
  // Smart auto-splitting of the heading around the question mark for premium dual-color rendering
  const titleParts = title.split("?")
  const renderedHeading =
    titleParts.length > 1 ? (
      <h1 className="mb-6 text-3xl leading-[1.15] font-extrabold tracking-tight md:text-4xl lg:text-[46px]">
        <span className="text-[#111111]">{titleParts[0]}?</span>{" "}
        <span className="text-[#064E3B]">{titleParts[1]}</span>
      </h1>
    ) : (
      <h1 className="mb-6 text-3xl leading-[1.15] font-extrabold tracking-tight text-[#064E3B] md:text-4xl lg:text-[46px]">
        {title}
      </h1>
    )

  const firstStep = form?.steps?.[0]
  const resolvedFormTitle = firstStep?.title || formTitle || undefined
  const resolvedFormSubtitle =
    firstStep?.description || formSubtitle || undefined

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pt-10 pb-6 text-left",
        "bg-[linear-gradient(109.99deg,#F4F8E5_0%,#F4F8E5_35%,#F4F8E5_70%,#FFFFFF_100%)]",
        className
      )}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[3.5fr_2.5fr]">
          {/* LEFT COLUMN: Split heading, 2-col checklist, and transition diagram */}
          <div className="flex flex-col justify-start">
            <FadeIn delay={0.1}>
              {renderedHeading}

              {/* Description body */}
              <p className="mb-8 max-w-2xl text-sm leading-relaxed font-normal text-[#444444] md:text-base">
                {description}
              </p>

              {/* 2-Column responsive checklist */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {listItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#1B6E3F] shadow-none">
                      <Check
                        className="h-3.5 w-3.5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-xs leading-tight font-semibold text-[#111111] sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Large graphic diagram underneath lists (no neobrutalist borders) */}
              <StrapiImage
                image={image}
                width={image?.file?.width || 550}
                height={image?.file?.height || 309}
                preload
                fetchPriority="high"
                sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), (max-width: 1280px) 58vw, 680px"
                className="w-full h-auto rounded-2xl mt-8 max-w-[550px]"
                fallbackSrc="/form-hero-placeholder.avif"
              />
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Interactive Form Column */}
          <div className="sticky top-0 w-full">
            <FadeIn delay={0.25}>
              <EnquiryForm
                title={resolvedFormTitle}
                subtitle={resolvedFormSubtitle}
                form={form}
                className="w-full"
              />
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FormHero
