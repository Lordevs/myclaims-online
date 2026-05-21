/**
 * Collection type and block content definitions.
 *
 * Covers all api::* content types in the CMS:
 *   api::page.page             → PageEntry
 *   api::faq.faq               → FAQEntry
 *   api::cta.cta               → CTAEntry
 *   api::form.form             → FormEntry
 *   api::form-submission.*     → FormSubmissionEntry
 *
 * Also exports StrapiBlockContent (Strapi Blocks rich-text format)
 * used by layout.footer fields.
 */

import type {
  LinkComponent,
  ContactItemComponent,
  FormStepComponent,
  ListItemComponent as ListItem,
  IconhubField,
} from "./shared"

// ─── Strapi Blocks (rich-text) ────────────────────────────────────────────────

/** A single text run inside a block node */
export interface StrapiBlockChild {
  type?: string
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

/** A single block node (paragraph, heading, list, quote, code, image, etc.) */
export interface StrapiBlockNode {
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "list-item"
    | "quote"
    | "code"
    | "image"
    | string
  children?: (StrapiBlockChild | StrapiBlockNode)[]
  level?: number // for heading
  format?: "ordered" | "unordered" // for list
}

/** Strapi Blocks rich-text field — array of block nodes */
export type StrapiBlockContent = StrapiBlockNode[]

// ─── api::faq.faq ─────────────────────────────────────────────────────────────

export interface FAQEntry {
  id: number
  documentId: string
  question: string
  answer: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

// ─── api::cta.cta ─────────────────────────────────────────────────────────────

export type CTALayout =
  | "full_width_banner"
  | "boxed_card"
  | "cta_strip"
  | "contact_grid"

export interface CTAEntry {
  id: number
  documentId: string
  /** internalName is private — not returned by the API */
  layout: CTALayout | null
  title: string
  subtitle: string | null
  /** icon — only present when layout === "cta_strip" */
  icon: IconhubField | null
  /** buttons — present when layout !== "contact_grid" */
  buttons: LinkComponent[]
  /** contactItems — present when layout === "contact_grid" */
  contactItems: ContactItemComponent[]
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

// ─── api::form.form ───────────────────────────────────────────────────────────

export interface FormEntry {
  id: number
  documentId: string
  title: string
  formId: string
  steps: FormStepComponent[]
  submitButtonText: string | null
  footerItems: ListItem[]
  successMessage: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

// ─── api::form-submission.form-submission ─────────────────────────────────────

export interface FormSubmissionEntry {
  id: number
  documentId: string
  /** Relation back to the form — usually omitted in responses */
  form?: Pick<FormEntry, "id" | "documentId" | "formId" | "title">
  /** JSON blob of submitted field values */
  data: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ─── api::page.page ───────────────────────────────────────────────────────────

/**
 * api::page.page — a CMS-managed page.
 * `blocks` is a DynamicZone of all 11 section types.
 * Import DynamicZoneSection from sections.ts to type `blocks`.
 */
export interface PageEntry {
  id: number
  documentId: string
  title: string
  slug: string
  /** Populated dynamically — type narrowed in sections.ts */
  blocks: import("./sections").DynamicZoneSection[]
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}
