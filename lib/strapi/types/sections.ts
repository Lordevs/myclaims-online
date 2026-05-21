/**
 * DynamicZone section types.
 * Mirrors every schema in src/components/sections/ of the CMS.
 *
 * Every interface carries a `__component` literal discriminant so TypeScript
 * can narrow the union in DynamicZoneRenderer via a switch/if on __component.
 *
 * Section → CMS schema mapping:
 *   sections.split-hero-section  → SplitHeroSection
 *   sections.rich-text-section   → RichTextSection
 *   sections.media-and-text      → MediaAndTextSection
 *   sections.form-section        → FormSection
 *   sections.feature-grid        → FeatureGridSection
 *   sections.faq-section         → FAQSection
 *   sections.cta-section         → CTASection
 *   sections.trust-banner        → TrustBannerSection
 *   sections.quiz-section        → QuizSection
 *   sections.process-timeline    → ProcessTimelineSection
 *   sections.contact-with-map    → ContactWithMapSection
 */

import type {
  LinkComponent,
  ListItemComponent,
  TimelineStepComponent,
  RichTextComponent,
  ContactItemComponent,
  FileLinkComponent,
  FeatureCardComponent,
} from "./shared"
import type { StrapiMediaComponent } from "./media"
import type { FAQEntry, CTAEntry, FormEntry } from "./collections"

// ─── sections.split-hero-section ─────────────────────────────────────────────

export type SplitHeroLayout = "hero_with_media" | "hero_with_form"

export interface SplitHeroSection {
  __component: "sections.split-hero-section"
  id: number
  title: string
  subtitle: string | null
  listItems: ListItemComponent[]
  layout: SplitHeroLayout | null
  /** Capital I — matches the CMS field name exactly */
  Image: StrapiMediaComponent | null
  /** ctaButtons — present when layout === "hero_with_media", max 2 */
  ctaButtons: LinkComponent[]
  /** form relation — present when layout === "hero_with_form" */
  form: FormEntry | null
}

// ─── sections.rich-text-section ──────────────────────────────────────────────

export type RichTextLayout = "Single Column" | "Two Columns"
export type RichTextTheme = "pink" | "green"

export interface RichTextSection {
  __component: "sections.rich-text-section"
  id: number
  title: string
  layout: RichTextLayout | null
  /** theme — visible only when layout === "Single Column" */
  theme: RichTextTheme | null
  /** content — 1 or 2 shared.rich-text items */
  content: RichTextComponent[]
}

// ─── sections.media-and-text ─────────────────────────────────────────────────

export interface MediaAndTextSection {
  __component: "sections.media-and-text"
  id: number
  title: string
  items: ListItemComponent[]
  image: StrapiMediaComponent
}

// ─── sections.form-section ───────────────────────────────────────────────────

export type FormSectionLayout = "default_form" | "illustration_form"

export interface FormSection {
  __component: "sections.form-section"
  id: number
  title: string
  subtitle: string | null
  layout: FormSectionLayout | null
  /** listItems — only shown when layout === "illustration_form" */
  listItems: ListItemComponent[]
  image: StrapiMediaComponent | null
  form: FormEntry | null
}

// ─── sections.feature-grid ───────────────────────────────────────────────────

export type FeatureGridLayout =
  | "grid_3_col"
  | "horizontal_steps"
  | "horizontal_columns_5"
  | "asymmetric_row"

export type FeatureGridTheme = "pink" | "green"

export interface FeatureGridSection {
  __component: "sections.feature-grid"
  id: number
  title: string
  layout: FeatureGridLayout
  /** sectionTheme — only when layout === "grid_3_col" */
  sectionTheme: FeatureGridTheme | null
  items: FeatureCardComponent[]
  /** ctaButton — only when layout === "grid_3_col" */
  ctaButton: LinkComponent | null
}

// ─── sections.faq-section ────────────────────────────────────────────────────

export interface FAQSection {
  __component: "sections.faq-section"
  id: number
  title: string
  /** Populated relation to api::faq.faq */
  faqs: Pick<FAQEntry, "id" | "documentId" | "question" | "answer">[]
}

// ─── sections.cta-section ────────────────────────────────────────────────────

export interface CTASection {
  __component: "sections.cta-section"
  id: number
  /** Populated relation to api::cta.cta */
  cta: CTAEntry | null
}

// ─── sections.trust-banner ───────────────────────────────────────────────────

export interface TrustBannerSection {
  __component: "sections.trust-banner"
  id: number
  title: string
  subtitle: string | null
  rating: number | null
}

// ─── sections.quiz-section ───────────────────────────────────────────────────

export interface QuizSection {
  __component: "sections.quiz-section"
  id: number
  form: FormEntry | null
  trustTitle: string | null
  trustBullets: ListItemComponent[]
  supportTitle: string | null
  supportText: string | null
  supportPhone: LinkComponent | null
}

// ─── sections.process-timeline ───────────────────────────────────────────────

export interface ProcessTimelineSection {
  __component: "sections.process-timeline"
  id: number
  title: string
  steps: TimelineStepComponent[]
}

// ─── sections.contact-with-map ───────────────────────────────────────────────

export interface ContactWithMapSection {
  __component: "sections.contact-with-map"
  id: number
  title: string
  subtitle: string | null
  mapEmbedUrl: string | null
  items: ContactItemComponent[]
  ctaButton: FileLinkComponent | null
}

// ─── DynamicZone union ────────────────────────────────────────────────────────

/** Union of all 11 possible DynamicZone section types for api::page.page */
export type DynamicZoneSection =
  | SplitHeroSection
  | RichTextSection
  | MediaAndTextSection
  | FormSection
  | FeatureGridSection
  | FAQSection
  | CTASection
  | TrustBannerSection
  | QuizSection
  | ProcessTimelineSection
  | ContactWithMapSection
