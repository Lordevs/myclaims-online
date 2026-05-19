/**
 * All 23 Dynamic Zone section interfaces.
 * Every interface carries a `__component` literal discriminant so TypeScript
 * can narrow the union type in DynamicZoneRenderer.
 *
 * Mirrors every schema in src/components/sections/ of the Strapi project.
 */

// import type {
//   LinkComponent,
//   StatComponent,
//   CheckItem,
//   MetaItem,
//   TagComponent,
// } from "./shared";
// import type {
//   BentoCard,
//   CapabilityCard,
//   IconFeatureCard,
//   InfoCard,
//   IntegrationCard,
//   ServiceCard,
//   SplitCard,
//   StepCard,
// } from "./cards";
// import type { StrapiMediaComponent, StrapiSliderComponent } from "./media";

// ─── Shared collection relation stubs (avoid circular imports) ─────────────────

interface FAQRelation {
  id: number
  documentId: string
  question: string
  answer: string
}

export interface FAQSection {
  __component: "sections.faq-section"
  id: number
  title: string | null
  description: string | null
  faqs: FAQRelation[]
}

/** Union of all possible Dynamic Zone section types */
export type DynamicZoneSection = FAQSection
