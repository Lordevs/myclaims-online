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
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"

const defaultFaqData = [
  {
    question: "What if I'm partially at fault?",
    answer:
      "Even if you share some responsibility for the accident, you may still be entitled to claim compensation. The claim is handled on a split-liability basis, meaning your compensation is adjusted according to your percentage of fault. Our specialists can review the details to advise you on the best path forward.",
  },
  {
    question: "How quickly can I get a replacement car?",
    answer:
      "If you are not at fault, we can typically arrange and deliver a replacement vehicle to your door within 24 hours of accepting your claim. We deal directly with the other party's insurance to recover all hire costs, keeping you mobile with zero hassle.",
  },
  {
    question: "Does this cost me anything upfront?",
    answer:
      "No, we operate on a strict No Win, No Fee basis. There are absolutely no upfront fees or hidden charges. If your claim is unsuccessful, you won't owe us a penny for our legal services, making the entire process completely risk-free for you.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "The duration depends heavily on the complexity of the accident and whether the other party accepts liability. Straightforward cases can settle in a matter of weeks, while more complex disputes involving injuries or disputed liability may take several months. We always work to resolve claims as efficiently as possible.",
  },
]

/**
 * Premium, high-fidelity FAQ Section configured to match the Neo-Brutalist design.
 * Features customizable header (#064E3B), full rounded border outline (2.25px #064E3B),
 * and clean item backgrounds (#F9FAF5).
 */
export function FAQSection(props: Partial<FAQSection>) {
  const title = props.title || "FAQS"
  const faqData = props.faqs?.length ? props.faqs : defaultFaqData

  return (
    <section className="bg-white py-16 font-sans">
      <Container className="max-w-6xl">
        {/* Section Heading */}
        <FadeIn delay={0.1} className="mb-10 text-center md:mb-12">
          <h2 className="text-3xl leading-none font-extrabold tracking-tight text-[#064E3B] md:text-5xl">
            {title}
          </h2>
        </FadeIn>

        {/* Accordion List */}
        <StaggerContainer delayChildren={0.2} staggerDelay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="space-y-4 rounded-none border-none md:space-y-5"
          >
            {faqData.map((item) => (
              <StaggerItem key={item.question}>
                <AccordionItem
                  value={item.question}
                  className={cn(
                    "group overflow-hidden rounded-xl border-[2.25px] border-[#064E3B] bg-[#F9FAF5] shadow-none transition-all duration-200"
                  )}
                >
                  <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between border-none p-5 outline-hidden select-none hover:no-underline md:p-6">
                    <span className="text-left font-sans text-base leading-snug font-normal tracking-tight text-[#1A1C19] md:text-2xl">
                      {item.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="bg-[#F9FAF5] px-5 pb-5 text-sm leading-relaxed text-[#594143] md:px-6 md:pb-6 md:text-[15px]">
                    <Separator className="mb-4 w-full bg-[#064E3B]/10" />
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
