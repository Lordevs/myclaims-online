import { Phone, Mail, Clock } from "lucide-react"
import { Container } from "@/components/layout/container"

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
    <section className="bg-[#F9FAF5] py-20 md:py-28 font-sans">
      <Container>
        <div
          className="bg-white rounded-3xl px-6 py-12 md:py-16 md:px-12 lg:px-20 border-[2.25px] border-[#0F172A] flex flex-col items-center text-center max-w-[865px] mx-auto"
          style={{
            boxShadow: "4.5px 4.5px 0px 0px #1A1C19",
          }}
        >
          {/* Section Heading */}
          <h2 className="text-[#0F172A] text-3xl md:text-5xl font-extrabold tracking-tight leading-none mb-3.5">
            Get In Touch
          </h2>

          {/* Section Description */}
          <p className="text-[#594143] text-sm md:text-lg font-normal leading-relaxed md:mb-10 mb-5 max-w-lg">
            Available 24/7 for all your claims questions and support.
          </p>

          {/* Grid of Contact Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10 w-full">
            {contactItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex flex-col items-center group">
                  {/* Premium Circle Icon Link */}
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-14 h-14 rounded-full bg-[#ECFCCB] border-[2.25px] border-[#0F172A] flex items-center justify-center text-[#0F172A] transition-transform duration-200 group-hover:scale-105 active:scale-95 mb-4"
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.25} />
                  </a>

                  {/* Value Link */}
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[#0F172A] text-sm md:text-lg font-bold hover:underline tracking-tight mb-1"
                  >
                    {item.value}
                  </a>

                  {/* Description Label */}
                  <span className="text-[#594143] text-xs md:text-base font-normal leading-none">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
