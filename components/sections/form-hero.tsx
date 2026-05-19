import Image from "next/image"
import { Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { EnquiryForm } from "./enquiry-form"
import { cn } from "@/lib/utils"

export interface FormHeroProps {
  /** The main landing page title */
  title: string
  /** Sub-paragraph copy under the title */
  description: string
  /** 8 Bulleted checkmark statements, will render in a 2-column grid on desktop */
  listItems?: string[]
  /** Source path of the replacement diagram */
  imageSrc?: string
  /** Alt label for accessibility */
  imageAlt?: string
  /** Heading inside the enquiry card */
  formTitle?: string
  /** Subtitle inside the enquiry card */
  formSubtitle?: string
  /** Custom additional class classes */
  className?: string
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
  imageSrc = "/form-hero-placeholder.avif",
  imageAlt = "Instant Vehicle Replacement Diagram",
  formTitle,
  formSubtitle,
  className,
}: FormHeroProps) {
  // Smart auto-splitting of the heading around the question mark for premium dual-color rendering
  const titleParts = title.split("?")
  const renderedHeading = titleParts.length > 1 ? (
    <h1 className="text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.15] mb-6">
      <span className="text-[#111111]">{titleParts[0]}?</span>{" "}
      <span className="text-[#064E3B]">{titleParts[1]}</span>
    </h1>
  ) : (
    <h1 className="text-[#064E3B] text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.15] mb-6">
      {title}
    </h1>
  )

  return (
    <section
      className={cn(
        "w-full pt-16 pb-14 md:pt-24 md:pb-20 overflow-hidden text-left relative",
        "bg-[linear-gradient(109.99deg,#F4F8E5_0%,#F4F8E5_35%,#F4F8E5_70%,#FFFFFF_100%)]",
        className
      )}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT COLUMN: Split heading, 2-col checklist, and transition diagram */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-start">
            <FadeIn delay={0.1}>
              {renderedHeading}

              {/* Description body */}
              <p className="text-[#444444] text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-normal">
                {description}
              </p>

              {/* 2-Column responsive checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {listItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5.5 h-5.5 rounded-full shrink-0 flex items-center justify-center bg-[#1B6E3F] shadow-none">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[#111111] text-xs sm:text-sm font-semibold leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Large graphic diagram underneath lists (no neobrutalist borders) */}
              <div className="relative w-full aspect-[1.15/1] sm:aspect-1.25/1 overflow-hidden rounded-2xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-contain"
                />
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Interactive Form Column */}
          <div className="col-span-1 lg:col-span-5 w-full sticky top-24">
            <FadeIn delay={0.25}>
              <EnquiryForm
                title={formTitle}
                subtitle={formSubtitle}
                className="w-full"
              />
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default FormHero;
