import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import type { IconhubField } from "@/lib/strapi/types/shared"

export interface CtaGridProps {
  title?: string
  subtitle?: string
  contactItems?: {
    id?: number
    icon?: IconhubField | null
    title: string
    subtitle?: string | null
    linkUrl?: string | null
  }[]
}

/**
 * High-fidelity "Get In Touch" contact section built in a Neo-Brutalism design style.
 * Displays interactive cards, custom thick borders (2.25px), custom sharp offsets,
 * and high-contrast color tokens specified for this section.
 */
export function CtaGrid({ title, subtitle, contactItems }: CtaGridProps) {
  return (
    <section className="bg-[#F9FAF5] py-20 font-sans">
      <Container>
        <div className="mx-auto flex max-w-[865px] flex-col items-center rounded-3xl border-[2.25px] border-[#0F172A] bg-white px-6 py-12 text-center shadow-[4.5px_4.5px_0px_0px_#1A1C19] md:px-12 md:py-16 lg:px-20">
          {/* Section Heading & Tagline wrapped in FadeIn */}
          {(title || subtitle) && (
            <FadeIn delay={0.1} className="flex flex-col items-center">
              {title && (
                <h2 className="mb-3.5 text-3xl leading-none font-extrabold tracking-tight text-[#0F172A] md:text-5xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mb-5 max-w-lg text-sm leading-relaxed font-normal text-[#594143] md:mb-10 md:text-lg">
                  {subtitle}
                </p>
              )}
            </FadeIn>
          )}

          {/* Grid of Contact Elements with Stagger entry */}
          {contactItems && contactItems.length > 0 && (
            <StaggerContainer
              delayChildren={0.2}
              staggerDelay={0.1}
              className="w-full"
            >
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-10">
                {contactItems.map((item, idx) => {
                  const linkHref = item.linkUrl || "#"
                  const isHttp = linkHref.startsWith("http")

                  return (
                    <StaggerItem key={item.id || idx}>
                      <div className="group flex flex-col items-center">
                        {/* Premium Circle Icon Link */}
                        <a
                          href={linkHref}
                          target={isHttp ? "_blank" : undefined}
                          rel={isHttp ? "noopener noreferrer" : undefined}
                          aria-label={item.title}
                          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-[2.25px] border-[#0F172A] bg-[#ECFCCB] text-[#0F172A] transition-transform duration-200 group-hover:scale-105 active:scale-95"
                        >
                          <StrapiIcon
                            icon={item.icon}
                            size={20}
                            className="h-5 w-5 text-[#0F172A]"
                          />
                        </a>

                        {/* Value Link */}
                        <a
                          href={linkHref}
                          target={isHttp ? "_blank" : undefined}
                          rel={isHttp ? "noopener noreferrer" : undefined}
                          className="mb-1 text-sm font-bold tracking-tight text-[#0F172A] hover:underline md:text-lg"
                        >
                          {item.title}
                        </a>

                        {/* Description Label */}
                        {item.subtitle && (
                          <span className="text-xs leading-none font-normal text-[#594143] md:text-base">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </StaggerItem>
                  )
                })}
              </div>
            </StaggerContainer>
          )}
        </div>
      </Container>
    </section>
  )
}

export default CtaGrid
