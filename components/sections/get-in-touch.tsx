import { Phone, Mail, Clock } from "lucide-react"
import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"

/**
 * High-fidelity "Get In Touch" contact section built in a Neo-Brutalism design style.
 * Displays interactive cards, custom thick borders (2.25px), custom sharp offsets,
 * and high-contrast color tokens specified for this section.
 */
export function GetInTouch() {
  const contactItems = [
    {
      icon: Phone,
      value: "07930 444467",
      label: "Whatsapp",
      href: "https://wa.me/447930444467",
    },
    {
      icon: Mail,
      value: "info@myclaimsonline.co.uk",
      label: "General Enquiries",
      href: "mailto:info@myclaimsonline.co.uk",
    },
    {
      icon: Clock,
      value: "24/7 Claims Line",
      label: "Always Available",
      href: "tel:07930444467",
    },
  ]

  return (
    <section className="bg-[#F9FAF5] py-20 font-sans md:py-28">
      <Container>
        <div className="mx-auto flex max-w-[865px] flex-col items-center rounded-3xl border-[2.25px] border-[#0F172A] bg-white px-6 py-12 text-center shadow-[4.5px_4.5px_0px_0px_#1A1C19] md:px-12 md:py-16 lg:px-20">
          {/* Section Heading & Tagline wrapped in FadeIn */}
          <FadeIn delay={0.1} className="flex flex-col items-center">
            <h2 className="mb-3.5 text-3xl leading-none font-extrabold tracking-tight text-[#0F172A] md:text-5xl">
              Get In Touch
            </h2>
            <p className="mb-5 max-w-lg text-sm leading-relaxed font-normal text-[#594143] md:mb-10 md:text-lg">
              Available 24/7 for all your claims questions and support.
            </p>
          </FadeIn>

          {/* Grid of Contact Elements with Stagger entry */}
          <StaggerContainer
            delayChildren={0.2}
            staggerDelay={0.1}
            className="w-full"
          >
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-10">
              {contactItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={idx}>
                    <div className="group flex flex-col items-center">
                      {/* Premium Circle Icon Link */}
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-[2.25px] border-[#0F172A] bg-[#ECFCCB] text-[#0F172A] transition-transform duration-200 group-hover:scale-105 active:scale-95"
                      >
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                      </a>

                      {/* Value Link */}
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mb-1 text-sm font-bold tracking-tight text-[#0F172A] hover:underline md:text-lg"
                      >
                        {item.value}
                      </a>

                      {/* Description Label */}
                      <span className="text-xs leading-none font-normal text-[#594143] md:text-base">
                        {item.label}
                      </span>
                    </div>
                  </StaggerItem>
                )
              })}
            </div>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
