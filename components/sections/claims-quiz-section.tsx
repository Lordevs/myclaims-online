import { ShieldCheck, Check, Phone } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { ClaimsQuizForm, QuizQuestion } from "@/components/forms/claims-quiz-form"

export interface ClaimsQuizSectionProps {
  /** Dynamic array of questions */
  questions?: QuizQuestion[]
  /** On completion event callback, returning answers and contact details */
  onComplete?: (answers: Record<string | number, string>) => void
  /** Trust points check list for sidebar */
  trustItems?: string[]
  /** Specialist phone number */
  specialistPhone?: string
  /** Specialist description paragraph */
  specialistDescription?: string
  /** Custom extra styling classes */
  className?: string
}

const defaultTrustItems = [
  "FCA Authorized & Regulated process.",
  "Zero-cost claim assessment for non-fault accidents.",
  "Over 10 years of claims experience.",
]

/**
 * High-fidelity Claims Quiz Section.
 * Sets up the outer section container, Neobrutalist layouts, and side panel guides,
 * while delegation of interactive form questionnaire logic is sent to the form subsystem.
 */
export function ClaimsQuizSection({
  questions,
  onComplete,
  trustItems = defaultTrustItems,
  specialistPhone = "07930 444467",
  specialistDescription = "Our team is ready to guide you through every step.",
  className,
}: ClaimsQuizSectionProps) {
  return (
    <section
      className={cn("py-20 md:py-28 select-none overflow-hidden font-sans", className)}
      style={{
        background: "linear-gradient(109.99deg, #F4F8E5 0%, #F4F8E5 35%, #F4F8E5 70%, #FFFFFF 100%)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12 items-start">

          {/* LEFT QUIZ COLUMN: Delegated to Form Subsystem */}
          <ClaimsQuizForm
            questions={questions}
            onComplete={onComplete}
          />

          {/* RIGHT SIDEBAR COLUMN */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 h-full justify-start">

            {/* Why Trust Us Card */}
            <FadeIn delay={0.15} y={20} className="w-full">
              <div className="bg-[#F9FAF5] border-2 border-[#4C6549] rounded-3xl p-6 sm:p-8 flex flex-col gap-6">

                {/* Heading with Custom Green Shield Icon */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#627E2A] flex items-center justify-center text-[#FAFFE7] flex-shrink-0 border-2 border-[#4C6549]">
                    <ShieldCheck className="size-5" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-[#1A1C19]">
                    Why trust us?
                  </h4>
                </div>

                {/* List Items */}
                <ul className="flex flex-col gap-4">
                  {trustItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="text-[#4A6412] mt-0.5 flex-shrink-0">
                        <Check className="size-5 stroke-[3px]" />
                      </div>
                      <span className="text-sm font-semibold leading-relaxed text-[#594143]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Speak to a Specialist Card */}
            <FadeIn delay={0.2} y={25} className="w-full">
              <div
                className="bg-[#CEEBC7] border-2 border-[#4C6549] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col gap-6"
              >
                {/* Layered Document Illustration in Top Right */}
                <div className="absolute -top-12 -right-8 w-44 h-28 pointer-events-none select-none">
                  {/* Dark Green/Sage Layer */}
                  <div className="absolute top-0 right-0 w-32 h-20 bg-[#657E61] border-2 border-[#4C6549] rounded-lg transform -rotate-12 translate-x-4 translate-y-2" />
                  {/* Rose Layer */}
                  <div className="absolute top-0 right-0 w-32 h-20 bg-[#B87C84] border-2 border-[#4C6549] rounded-lg transform -rotate-[22deg] translate-x-2 translate-y-6" />
                </div>

                <div className="relative z-10 flex flex-col gap-4 max-w-[80%]">
                  <h4 className="text-xl sm:text-2xl font-black text-[#111111] leading-tight">
                    Speak to a specialist
                  </h4>
                  <p className="text-sm font-bold text-[#09200A] leading-relaxed">
                    {specialistDescription}
                  </p>
                </div>

                <div className="relative z-10">
                  <a
                    href={`tel:${specialistPhone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-3 px-5 py-4 bg-[#09200A] hover:bg-[#153a17] text-[#F9FAF5] border-2 border-[#4C6549] rounded-2xl font-black shadow-[4px_4px_0px_0px_#344D32] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#344D32] transition-all duration-200 focus:outline-none"
                  >
                    <Phone className="size-5 fill-current" />
                    <span>{specialistPhone}</span>
                  </a>
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </Container>
    </section>
  )
}
