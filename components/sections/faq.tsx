import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import type { FAQSection } from "@/lib/strapi/types/sections"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations"
import { ChevronDown } from "lucide-react"

const defaultFaqData = [
  {
    question: "What if I'm partially at fault?",
    answer: "Even if you share some responsibility for the accident, you may still be entitled to claim compensation. The claim is handled on a split-liability basis, meaning your compensation is adjusted according to your percentage of fault. Our specialists can review the details to advise you on the best path forward.",
  },
  {
    question: "How quickly can I get a replacement car?",
    answer: "If you are not at fault, we can typically arrange and deliver a replacement vehicle to your door within 24 hours of accepting your claim. We deal directly with the other party's insurance to recover all hire costs, keeping you mobile with zero hassle.",
  },
  {
    question: "Does this cost me anything upfront?",
    answer: "No, we operate on a strict No Win, No Fee basis. There are absolutely no upfront fees or hidden charges. If your claim is unsuccessful, you won't owe us a penny for our legal services, making the entire process completely risk-free for you.",
  },
  {
    question: "How long does the whole process take?",
    answer: "The duration depends heavily on the complexity of the accident and whether the other party accepts liability. Straightforward cases can settle in a matter of weeks, while more complex disputes involving injuries or disputed liability may take several months. We always work to resolve claims as efficiently as possible.",
  },
]

/**
 * Premium, high-fidelity FAQ Section configured to match the Neo-Brutalist design.
 * Features customizable header (#064E3B), full rounded border outline (2.25px #064E3B),
 * and clean item backgrounds (#F9FAF5).
 */
export function FAQSection(props: Partial<FAQSection>) {
  const title = props.title || "FAQS"
  const description = props.description || ""
  const faqData = props.faqs?.length ? props.faqs : defaultFaqData

  return (
    <section className="bg-white py-20 md:py-24 font-sans">
      <Container className="max-w-6xl">
        {/* Section Heading */}
        <FadeIn delay={0.1} className="mb-10 md:mb-12 text-center">
          <h2 className="text-[#064E3B] text-3xl md:text-5xl font-extrabold tracking-tight leading-none">
            {title}
          </h2>
          {description && (
            <p className="mt-3 md:mt-5 text-base md:text-lg text-[#594143] font-normal leading-relaxed">
              {description}
            </p>
          )}
        </FadeIn>

        {/* Accordion List */}
        <StaggerContainer delayChildren={0.2} staggerDelay={0.1}>
          <Accordion type="single" collapsible className="space-y-4 md:space-y-5 border-none rounded-none">
            {faqData.map((item, index) => (
              <StaggerItem key={index}>
                <AccordionItem
                  value={`item-${index}`}
                  className={cn(
                    "group rounded-xl border-[2.25px] border-[#064E3B] bg-[#F9FAF5] transition-all duration-200 shadow-none overflow-hidden"
                  )}
                >
                  <AccordionTrigger className="flex items-center justify-between p-5 md:p-6 hover:no-underline border-none outline-hidden w-full cursor-pointer select-none">
                    <span className="font-sans text-left text-base md:text-2xl font-normal text-[#1A1C19] tracking-tight leading-snug">
                      {item.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-[15px] leading-relaxed text-[#594143] bg-[#F9FAF5]">
                    <Separator className="w-full bg-[#064E3B]/10 mb-4" />
                    <div className="font-normal text-[#594143]">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerContainer>
      </Container>
    </section>
  )
}
export default FAQSection
