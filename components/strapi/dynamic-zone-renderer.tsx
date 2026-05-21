import type { DynamicZoneSection } from "@/lib/strapi/types/sections"
import { FormHero } from "@/components/sections/form-hero"
import { Hero } from "@/components/sections/hero"
import { TextColumnsSection } from "@/components/sections/text-columns-section"
import { InfoBanner } from "@/components/sections/info-banner"
import { ImageWithListSection } from "@/components/sections/image-with-list-section"
import { ClaimFormSection } from "@/components/sections/claim-form-section"
import { ClaimsSupport } from "@/components/sections/claims-support"
import { StepsGridSection } from "@/components/sections/steps-grid-section"
import { FeaturesGridSection } from "@/components/sections/features-grid-section"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { FAQSection } from "@/components/sections/faq"
import { GreenCTASection } from "@/components/sections/green-cta-section"
import { ClaimsCardCTA } from "@/components/sections/claims-card-cta"
import { SimpleLinkCTA } from "@/components/sections/simple-link-cta"
import { OneCallCTA } from "@/components/sections/one-call-cta"
import { TrustBanner } from "@/components/sections/trust-banner"
import { ClaimsQuizSection } from "@/components/sections/claims-quiz-section"
import { ClaimsJourney } from "@/components/sections/claims-journey"
import { StrategicHubSection } from "@/components/sections/strategic-hub-section"

import { getStrapiMedia, resolveStrapiLink } from "@/lib/strapi/utils"

interface DynamicZoneRendererProps {
  sections: DynamicZoneSection[]
}

/**
 * Renders the page's DynamicZone blocks in order.
 *
 * Each section is identified by its `__component` discriminant and
 * narrowed to its specific type — TypeScript will error if you access
 * a field that doesn't exist on a given section type.
 */
export function DynamicZoneRenderer({ sections }: DynamicZoneRendererProps) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "sections.split-hero-section": {
            const listItems = section.listItems?.map((i) => i.text) || []
            const imageSrc = getStrapiMedia(section.Image?.file?.url) || ""
            const imageAlt = section.Image?.file?.alternativeText || ""

            if (section.layout === "hero_with_form") {
              return (
                <FormHero
                  key={section.id}
                  title={section.title}
                  description={section.subtitle || ""}
                  listItems={listItems}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  formTitle={section.form?.title || undefined}
                />
              )
            }

            // hero_with_media
            return (
              <Hero
                key={section.id}
                title={section.title}
                description={section.subtitle || ""}
                listItems={listItems}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                primaryBtnText={section.ctaButtons?.[0]?.label || undefined}
                primaryBtnHref={resolveStrapiLink(section.ctaButtons?.[0])}
                secondaryBtnText={section.ctaButtons?.[1]?.label || undefined}
                secondaryBtnHref={resolveStrapiLink(section.ctaButtons?.[1])}
              />
            )
          }

          case "sections.rich-text-section": {
            if (section.layout === "Single Column") {
              const paragraphs = section.content.map((c) => c.body || "")
              return (
                <InfoBanner
                  key={section.id}
                  title={section.title}
                  paragraphs={paragraphs}
                  variant={section.theme === "pink" ? "pink" : "green"}
                />
              )
            }

            // Two Columns
            const col1Text = section.content?.[0]?.body || ""
            const col2Text = section.content?.[1]?.body || ""
            return (
              <TextColumnsSection
                key={section.id}
                title={section.title}
                col1Text={col1Text}
                col2Text={col2Text}
              />
            )
          }

          case "sections.media-and-text": {
            const imageSrc = getStrapiMedia(section.image?.file?.url) || ""
            const imageAlt = section.image?.file?.alternativeText || ""
            const listItems = section.items?.map((i) => i.text) || []

            return (
              <ImageWithListSection
                key={section.id}
                title={section.title}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                listItems={listItems}
              />
            )
          }

          case "sections.form-section": {
            const imageSrc = getStrapiMedia(section.image?.file?.url) || "/contact-form.avif"
            const imageAlt = section.image?.file?.alternativeText || "Expert Claims Handler"

            return (
              <ClaimFormSection
                key={section.id}
                titleGreen={section.title}
                subtitle={section.subtitle || ""}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
              />
            )
          }

          case "sections.feature-grid": {
            if (section.layout === "horizontal_columns_5") {
              return (
                <ClaimsSupport
                  key={section.id}
                  title={section.title}
                  items={section.items}
                />
              )
            }

            if (section.layout === "horizontal_steps") {
              return (
                <StepsGridSection
                  key={section.id}
                  title={section.title}
                  items={section.items.map((i) => ({
                    icon: i.icon,
                    title: i.title,
                    description: i.description || "",
                  }))}
                />
              )
            }

            // grid_3_col layout
            if (section.sectionTheme === "pink") {
              return (
                <WhyChooseUs
                  key={section.id}
                  title={section.title}
                  items={section.items}
                />
              )
            }

            // grid_3_col layout (green theme / default)
            const offers = section.items.map((i) => ({
              icon: i.icon,
              title: i.title,
              description: i.description || "",
            }))

            const ctaBtn = section.ctaButton
            const buttonProp = ctaBtn
              ? {
                  label: ctaBtn.label,
                  href: resolveStrapiLink(ctaBtn),
                }
              : undefined

            return (
              <FeaturesGridSection
                key={section.id}
                title={section.title}
                items={offers}
                button={buttonProp}
              />
            )
          }

          case "sections.faq-section":
            return (
              <FAQSection
                key={section.id}
                title={section.title}
                faqs={section.faqs}
              />
            )

          case "sections.cta-section": {
            const cta = section.cta
            if (!cta) return null

            if (cta.layout === "full_width_banner") {
              const btn = cta.buttons?.[0]
              return (
                <GreenCTASection
                  key={section.id}
                  title={cta.title}
                  subtitle={cta.subtitle || ""}
                  buttonLabel={btn?.label}
                  buttonHref={resolveStrapiLink(btn)}
                />
              )
            }

            if (cta.layout === "boxed_card") {
              const btn1 = cta.buttons?.[0]
              const btn2 = cta.buttons?.[1]
              return (
                <ClaimsCardCTA
                  key={section.id}
                  title={cta.title}
                  description={cta.subtitle || ""}
                  primaryBtnText={btn1?.label}
                  primaryBtnHref={resolveStrapiLink(btn1)}
                  secondaryBtnText={btn2?.label}
                  secondaryBtnHref={resolveStrapiLink(btn2)}
                />
              )
            }

            if (cta.layout === "cta_strip") {
              const btn = cta.buttons?.[0]
              return (
                <SimpleLinkCTA
                  key={section.id}
                  headingText={cta.title}
                  linkText={btn?.label || ""}
                  linkHref={resolveStrapiLink(btn)}
                />
              )
            }

            if (cta.layout === "contact_grid") {
              const phoneItem = cta.contactItems?.find(
                (item) =>
                  item.icon?.iconName?.includes("phone") ||
                  item.linkUrl?.startsWith("tel:")
              ) || cta.contactItems?.[0]

              const submitItem = cta.contactItems?.find(
                (item) => !item.linkUrl?.startsWith("tel:")
              ) || cta.contactItems?.[1]

              return (
                <OneCallCTA
                  key={section.id}
                  title={cta.title}
                  subtitle={cta.subtitle || ""}
                  phoneLabel={phoneItem?.title || undefined}
                  phoneValue={phoneItem?.linkUrl?.replace("tel:", "") || phoneItem?.subtitle || undefined}
                  enquiryLabel={submitItem?.title || undefined}
                  enquiryHref={submitItem?.linkUrl || undefined}
                />
              )
            }

            return null
          }

          case "sections.trust-banner":
            return (
              <TrustBanner
                key={section.id}
                title={section.title}
                subtitle={section.subtitle || undefined}
                rating={section.rating || undefined}
              />
            )

          case "sections.quiz-section":
            return (
              <ClaimsQuizSection
                key={section.id}
                trustItems={section.trustBullets?.map((i) => i.text)}
                specialistPhone={section.supportPhone?.label || undefined}
                specialistDescription={section.supportText || undefined}
              />
            )

          case "sections.process-timeline":
            return (
              <ClaimsJourney
                key={section.id}
                title={section.title}
                steps={section.steps?.map((step, idx) => ({
                  number: `0${idx + 1}`,
                  title: step.title,
                  description: step.description || "",
                }))}
              />
            )

          case "sections.contact-with-map": {
            const strategicHubItems = section.items.map((item) => ({
              id: item.id,
              title: item.title,
              details: item.subtitle || "",
              icon: item.icon,
              iconBg: "pink",
            }))

            return (
              <StrategicHubSection
                key={section.id}
                title={section.title}
                description={section.subtitle || ""}
                items={strategicHubItems}
                buttonText={section.ctaButton?.label}
                buttonLink={
                  section.ctaButton?.file?.file?.url
                    ? getStrapiMedia(section.ctaButton.file.file.url) || "#"
                    : "#"
                }
                mapEmbedUrl={section.mapEmbedUrl || undefined}
              />
            )
          }

          default:
            return null
        }
      })}
    </>
  )
}
