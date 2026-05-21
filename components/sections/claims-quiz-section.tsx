import { ShieldCheck, Check, Phone } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import type {
  FormStepComponent,
  ListItemComponent,
} from "@/lib/strapi/types/shared"
import {
  ClaimsQuizForm,
  QuizQuestion,
} from "@/components/forms/claims-quiz-form"

export interface ClaimsQuizSectionProps {
  /** Dynamic array of questions */
  questions?: QuizQuestion[]
  /** Dynamic contact/lead capture step from CMS */
  contactStep?: FormStepComponent
  /** On completion event callback, returning answers and contact details */
  onComplete?: (answers: Record<string | number, string>) => void
  /** Trust title */
  trustTitle?: string
  /** Trust points check list for sidebar */
  trustItems?: string[]
  /** Specialist phone number */
  specialistPhone?: string
  /** Specialist description paragraph */
  specialistDescription?: string
  /** Specialist title */
  specialistTitle?: string
  /** Dynamic success message from CMS form */
  successMessage?: string
  /** Dynamic footer items from CMS form */
  footerItems?: ListItemComponent[]
  /** Custom extra styling classes */
  className?: string
}

/**
 * High-fidelity Claims Quiz Section.
 * Sets up the outer section container, Neobrutalist layouts, and side panel guides,
 * while delegation of interactive form questionnaire logic is sent to the form subsystem.
 */
export function ClaimsQuizSection({
  questions,
  contactStep,
  onComplete,
  trustTitle,
  trustItems,
  specialistPhone,
  specialistDescription,
  specialistTitle,
  successMessage,
  footerItems,
  className,
}: ClaimsQuizSectionProps) {
  return (
    <section
      className={cn(
        "overflow-hidden py-20 font-sans select-none md:py-28",
        className
      )}
      style={{
        background:
          "linear-gradient(109.99deg, #F4F8E5 0%, #F4F8E5 35%, #F4F8E5 70%, #FFFFFF 100%)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-x-10 gap-y-10 lg:grid-cols-12">
          {/* LEFT QUIZ COLUMN: Delegated to Form Subsystem */}
          <ClaimsQuizForm
            questions={questions}
            contactStep={contactStep}
            onComplete={onComplete}
            successMessage={successMessage}
            footerItems={footerItems}
          />

          {/* RIGHT SIDEBAR COLUMN */}
          <div className="col-span-1 flex h-full flex-col justify-start gap-6 lg:col-span-4">
            {/* Why Trust Us Card */}
            {trustItems && trustItems.length > 0 && (
              <FadeIn delay={0.15} y={20} className="w-full">
                <div className="flex flex-col gap-6 rounded-3xl border-2 border-[#4C6549] bg-[#F9FAF5] p-6 sm:p-8">
                  {/* Heading with Custom Green Shield Icon */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#4C6549] bg-[#627E2A] text-[#FAFFE7]">
                      <ShieldCheck className="size-5" />
                    </div>
                    <h4 className="text-lg font-black text-[#1A1C19] sm:text-xl">
                      {trustTitle || "Why trust us?"}
                    </h4>
                  </div>

                  {/* List Items */}
                  <ul className="flex flex-col gap-4">
                    {trustItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0 text-[#4A6412]">
                          <Check className="size-5 stroke-[3px]" />
                        </div>
                        <span className="text-sm leading-relaxed font-semibold text-[#594143]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {/* Speak to a Specialist Card */}
            {specialistPhone && (
              <FadeIn delay={0.2} y={25} className="w-full">
                <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border-2 border-[#4C6549] bg-[#CEEBC7] p-6 sm:p-8">
                  {/* Layered Document Illustration in Top Right */}
                  <div className="pointer-events-none absolute -top-12 -right-8 h-28 w-44 select-none">
                    {/* Dark Green/Sage Layer */}
                    <div className="absolute top-0 right-0 h-20 w-32 translate-x-4 translate-y-2 -rotate-12 transform rounded-lg border-2 border-[#4C6549] bg-[#657E61]" />
                    {/* Rose Layer */}
                    <div className="absolute top-0 right-0 h-20 w-32 translate-x-2 translate-y-6 -rotate-[22deg] transform rounded-lg border-2 border-[#4C6549] bg-[#B87C84]" />
                  </div>

                  <div className="relative z-10 flex max-w-[80%] flex-col gap-4">
                    <h4 className="text-xl leading-tight font-black text-[#111111] sm:text-2xl">
                      {specialistTitle || "Speak to a specialist"}
                    </h4>
                    {specialistDescription && (
                      <p className="text-sm leading-relaxed font-bold text-[#09200A]">
                        {specialistDescription}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10">
                    <a
                      href={`tel:${specialistPhone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-3 rounded-2xl border-2 border-[#4C6549] bg-[#09200A] px-5 py-4 font-black text-[#F9FAF5] shadow-[4px_4px_0px_0px_#344D32] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#153a17] hover:shadow-[2px_2px_0px_0px_#344D32] focus:outline-none"
                    >
                      <Phone className="size-5 fill-current" />
                      <span>{specialistPhone}</span>
                    </a>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
