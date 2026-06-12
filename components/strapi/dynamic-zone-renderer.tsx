import type {
  DynamicZoneSection,
  SplitHeroSection,
  RichTextSection,
  MediaAndTextSection,
  FormSection,
  FeatureGridSection,
  FAQSection as FAQSectionType,
  CTASection as CTASectionType,
  TrustBannerSection,
  QuizSection,
  ProcessTimelineSection,
  ContactWithMapSection,
  BlogSection,
} from "@/lib/strapi/types/sections"
import { BlogSectionBlock } from "@/components/sections/blog-section-block"
import { FormHero } from "@/components/sections/form-hero"
import { Hero } from "@/components/sections/hero"
import { TextColumnsSection } from "@/components/sections/text-columns-section"
import { InfoBanner } from "@/components/sections/info-banner"
import { ImageWithListSection } from "@/components/sections/image-with-list-section"
import { ClaimFormSection } from "@/components/sections/claim-form-section"
import { DetailedEnquirySection } from "@/components/sections/detailed-enquiry-section"
import { ClaimsSupport } from "@/components/sections/claims-support"
import { StepsGridSection } from "@/components/sections/steps-grid-section"
import { FeaturesGridSection } from "@/components/sections/features-grid-section"
import { AsymmetricRowSection } from "@/components/sections/asymmetric-row-section"
import { FAQSection } from "@/components/sections/faq"
import { CtaBoxed } from "@/components/sections/cta-boxed"
import { CtaStrip } from "@/components/sections/cta-strip"
import { CtaFullWidth } from "@/components/sections/cta-full-width"
import { CtaGrid } from "@/components/sections/cta-grid"
import { TrustBanner } from "@/components/sections/trust-banner"
import { ClaimsQuizSection } from "@/components/sections/claims-quiz-section"
import { ClaimsJourney } from "@/components/sections/claims-journey"
import { StrategicHubSection } from "@/components/sections/strategic-hub-section"

import { getStrapiMedia, resolveStrapiLink } from "@/lib/strapi/utils"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALLOWED_MAP_HOSTS = ["www.google.com", "maps.google.com", "google.com"]

function sanitizeMapEmbedUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    if (ALLOWED_MAP_HOSTS.includes(parsed.hostname)) return url
  } catch {
    // invalid URL
  }
  return undefined
}

// ─── Section Map ───────────────────────────────────────────────────────────────

/**
 * Maps every Strapi __component key to an adapter/render function.
 *
 * This keeps the renderer clean, modular, and extremely easy to scale, while
 * ensuring UI components remain pure, strictly-typed, and decoupled from the CMS.
 *
 * Using a mapped type ensures complete compiler verification: if you add a new
 * block type to DynamicZoneSection, TypeScript will force registration here.
 */
const SECTION_MAP: {
  [K in DynamicZoneSection["__component"]]: (
    section: Extract<DynamicZoneSection, { __component: K }>
  ) => React.ReactNode
} = {
  "sections.split-hero-section": (section: SplitHeroSection) => {
    const listItems = section.listItems?.map((i) => i.text) || []

    if (section.layout === "hero_with_form") {
      return (
        <FormHero
          key={section.id}
          title={section.title}
          description={section.subtitle || ""}
          listItems={listItems}
          image={section.Image}
          formTitle={section.form?.title || undefined}
          form={section.form}
        />
      )
    }

    return (
      <Hero
        key={section.id}
        title={section.title}
        description={section.subtitle || ""}
        listItems={listItems}
        image={section.Image}
        primaryBtnText={section.ctaButtons?.[0]?.label || undefined}
        primaryBtnHref={resolveStrapiLink(section.ctaButtons?.[0])}
        secondaryBtnText={section.ctaButtons?.[1]?.label || undefined}
        secondaryBtnHref={resolveStrapiLink(section.ctaButtons?.[1])}
        layout={section.layout || undefined}
      />
    )
  },

  "sections.rich-text-section": (section: RichTextSection) => {
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
  },

  "sections.media-and-text": (section: MediaAndTextSection) => {
    const listItems = section.items?.map((i) => i.text) || []

    return (
      <ImageWithListSection
        key={section.id}
        title={section.title}
        image={section.image}
        listItems={listItems}
      />
    )
  },

  "sections.form-section": (section: FormSection) => {
    if (section.layout === "illustration_form") {
      const listItems = section.listItems?.map((item) => item.text) || []
      return (
        <DetailedEnquirySection
          key={section.id}
          title={section.title}
          subtitle={section.subtitle || undefined}
          listItems={listItems.length > 0 ? listItems : undefined}
          arrowImage={section.image}
          form={section.form}
        />
      )
    }

    // Default layout: section.layout === "default_form" or null
    return (
      <ClaimFormSection
        key={section.id}
        titleGreen={section.title}
        subtitle={section.subtitle || ""}
        image={section.image}
        form={section.form}
      />
    )
  },

  "sections.feature-grid": (section: FeatureGridSection) => {
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

    if (section.layout === "asymmetric_row") {
      return (
        <AsymmetricRowSection
          key={section.id}
          title={section.title}
          items={section.items}
        />
      )
    }

    // Default or section.layout === "grid_3_col"
    const offers = section.items.map((i) => ({
      icon: i.icon,
      title: i.title,
      description: i.description || "",
    }))

    const ctaBtn = section.ctaButton
    const theme = section.sectionTheme === "pink" ? "pink" : "green"

    return (
      <FeaturesGridSection
        key={section.id}
        title={section.title}
        items={offers}
        theme={theme}
        button={
          ctaBtn
            ? {
                label: ctaBtn.label,
                href: resolveStrapiLink(ctaBtn),
              }
            : undefined
        }
      />
    )
  },

  "sections.faq-section": (section: FAQSectionType) => {
    return (
      <FAQSection key={section.id} title={section.title} faqs={section.faqs} />
    )
  },

  "sections.cta-section": (section: CTASectionType) => {
    const cta = section.cta
    if (!cta) return null

    if (cta.layout === "full_width_banner") {
      const phoneBtn =
        cta.buttons?.find((btn) => btn.externalLink?.startsWith("tel:")) ||
        cta.buttons?.[0]

      const enquiryBtn =
        cta.buttons?.find((btn) => !btn.externalLink?.startsWith("tel:")) ||
        cta.buttons?.[1]

      return (
        <CtaFullWidth
          key={section.id}
          title={cta.title}
          subtitle={cta.subtitle || ""}
          phoneLabel={phoneBtn?.label}
          phoneValue={phoneBtn?.externalLink?.replace("tel:", "") || ""}
          enquiryLabel={enquiryBtn?.label}
          enquiryHref={resolveStrapiLink(enquiryBtn)}
        />
      )
    }

    if (cta.layout === "boxed_card") {
      const btn1 = cta.buttons?.[0]
      const btn2 = cta.buttons?.[1]
      return (
        <CtaBoxed
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
        <CtaStrip
          key={section.id}
          headingText={cta.title}
          linkText={btn?.label || ""}
          linkHref={resolveStrapiLink(btn)}
        />
      )
    }

    if (cta.layout === "contact_grid") {
      return (
        <CtaGrid
          key={section.id}
          title={cta.title}
          subtitle={cta.subtitle || undefined}
          contactItems={cta.contactItems?.map((item) => ({
            id: item.id,
            icon: item.icon,
            title: item.title,
            subtitle: item.subtitle,
            linkUrl: item.linkUrl,
          }))}
        />
      )
    }

    return null
  },

  "sections.trust-banner": (section: TrustBannerSection) => {
    return (
      <TrustBanner
        key={section.id}
        title={section.title}
        subtitle={section.subtitle || undefined}
        rating={section.rating || undefined}
      />
    )
  },

  "sections.quiz-section": (section: QuizSection) => {
    const allSteps = section.form?.steps || []

    // The last step is the contact details form if it contains fields of type other than 'select'
    const hasContactStep =
      allSteps.length > 0 &&
      allSteps[allSteps.length - 1].fields?.some((f) => f.type !== "select")

    const quizSteps = hasContactStep ? allSteps.slice(0, -1) : allSteps
    const contactStep = hasContactStep ? allSteps[allSteps.length - 1] : null

    const questions = quizSteps.map((step) => {
      const field = step.fields?.[0]
      return {
        id: step.id,
        questionText: field?.label || step.title || "",
        category: step.description || step.title || "Assessment",
        options:
          field?.selectOptions?.map((opt) => ({
            id: opt.id,
            text: opt.text,
            value: opt.text,
            additionalInfo: opt.additionalInfo,
            isDisqualifying: opt.isDisqualifying,
          })) || [],
      }
    })

    return (
      <ClaimsQuizSection
        key={section.id}
        formId={section.form?.formId || undefined}
        formDocumentId={section.form?.documentId || undefined}
        questions={questions.length > 0 ? questions : undefined}
        contactStep={contactStep || undefined}
        trustItems={section.trustBullets?.map((i) => i.text)}
        trustTitle={section.trustTitle || undefined}
        specialistPhone={section.supportPhone?.label || undefined}
        specialistDescription={section.supportText || undefined}
        specialistTitle={section.supportTitle || undefined}
      />
    )
  },

  "sections.process-timeline": (section: ProcessTimelineSection) => {
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
  },

  "sections.contact-with-map": (section: ContactWithMapSection) => {
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
        mapEmbedUrl={sanitizeMapEmbedUrl(section.mapEmbedUrl || undefined)}
      />
    )
  },
  "sections.blog-section": (section: BlogSection, currentPage?: number) => {
    return (
      <BlogSectionBlock
        key={section.id}
        title={section.title}
        currentPage={currentPage}
      />
    )
  },
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

interface DynamicZoneRendererProps {
  sections: DynamicZoneSection[]
  currentPage?: number
}

export function DynamicZoneRenderer({ sections, currentPage }: DynamicZoneRendererProps) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        // TypeScript cannot narrow a discriminated union through a map lookup —
        // the SECTION_MAP mapped type guarantees compile-time completeness; the
        // cast to `any` here is the accepted workaround for this known limitation.
        const renderSection = SECTION_MAP[section.__component] as (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sec: any,
          page?: number
        ) => React.ReactNode

        if (!renderSection) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[DynamicZone] No component registered for: "${section.__component}"`
            )
          }
          return null
        }

        return renderSection(section, currentPage)
      })}
    </>
  )
}
