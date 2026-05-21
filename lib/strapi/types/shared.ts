/**
 * Shared component types.
 * Mirrors every schema in src/components/shared/ and src/components/cards/
 * of the myclaims-online-cms Strapi project.
 *
 * Component name → TS interface mapping:
 *   shared.link             → LinkComponent
 *   shared.dropdown         → DropdownComponent
 *   shared.menu-item        → MenuItemComponent
 *   shared.contact-item     → ContactItemComponent
 *   shared.social-media-link→ SocialMediaLinkComponent
 *   shared.link-column      → LinkColumnComponent
 *   shared.list-item        → ListItemComponent
 *   shared.timeline-step    → TimelineStepComponent
 *   shared.rich-text        → RichTextComponent
 *   shared.media            → (re-exported from media.ts)
 *   shared.file             → (re-exported from media.ts)
 *   shared.file-link        → FileLinkComponent
 *   shared.form-option      → FormOptionComponent
 *   shared.form-fields      → FormFieldComponent
 *   shared.form-step        → FormStepComponent
 *   shared.seo              → SEOComponent
 *   cards.feature-card      → FeatureCardComponent
 */

import type {
  StrapiMediaComponent,
  StrapiFileComponent,
  StrapiMediaFile,
} from "./media"

// ─── Iconhub custom field ─────────────────────────────────────────────────────

/**
 * The iconhub custom field stores both the icon name (for @iconify/react)
 * and the raw SVG data.
 * Always use `iconName` on the frontend — pass it directly to <Icon icon={iconName} />.
 */
export interface IconhubField {
  iconName: string // e.g. "mdi:home" — use with @iconify/react
  iconData: string // raw SVG string (fallback, rarely needed)
}

// ─── Page relation stub ───────────────────────────────────────────────────────

/** Minimal page shape as it appears in relations (e.g. inside shared.link) */
export interface PageRelation {
  id: number
  documentId: string
  slug: string
  title: string
}

// ─── shared.link ─────────────────────────────────────────────────────────────

/** shared.link — internal page link or external URL */
export interface LinkComponent {
  id: number
  label: string
  isExternal: boolean
  externalLink: string | null
  page: PageRelation | null
}

// ─── shared.dropdown ─────────────────────────────────────────────────────────

/** shared.dropdown — a labelled group of menu items (used in navbar dynamic zone) */
export interface DropdownComponent {
  id: number
  label: string
  items: MenuItemComponent[]
}

// ─── shared.menu-item ────────────────────────────────────────────────────────

/** shared.menu-item — icon + label + optional page link */
export interface MenuItemComponent {
  id: number
  icon: IconhubField
  label: string
  page: PageRelation | null
}

// ─── shared.contact-item ─────────────────────────────────────────────────────

/** shared.contact-item — used in footer and contact-with-map section */
export interface ContactItemComponent {
  id: number
  icon: IconhubField
  title: string
  subtitle: string | null
  linkUrl: string | null
}

// ─── shared.social-media-link ────────────────────────────────────────────────

/** shared.social-media-link — icon + URL (used in footer) */
export interface SocialMediaLinkComponent {
  id: number
  icon: IconhubField
  url: string
}

// ─── shared.link-column ──────────────────────────────────────────────────────

/** shared.link-column — a titled column of links (used in footer) */
export interface LinkColumnComponent {
  id: number
  title: string | null
  links: LinkComponent[]
}

// ─── shared.list-item ────────────────────────────────────────────────────────

/** shared.list-item — optional icon + text bullet point */
export interface ListItemComponent {
  id: number
  icon: IconhubField | null
  text: string
}

// ─── shared.timeline-step ────────────────────────────────────────────────────

/** shared.timeline-step — used in process-timeline section */
export interface TimelineStepComponent {
  id: number
  title: string
  description: string | null
}

// ─── shared.rich-text ────────────────────────────────────────────────────────

/** shared.rich-text — Markdown body (richtext field) */
export interface RichTextComponent {
  id: number
  body: string | null
}

// ─── shared.seo ──────────────────────────────────────────────────────────────

/** shared.seo — meta title, description, and share image */
export interface SEOComponent {
  id: number
  metaTitle: string
  metaDescription: string
  shareImage: StrapiMediaFile | null
}

// ─── shared.file-link ────────────────────────────────────────────────────────

/** shared.file-link — a labelled downloadable file (used in contact-with-map CTA) */
export interface FileLinkComponent {
  id: number
  label: string
  file: StrapiFileComponent | null
}

// ─── shared.form-option ──────────────────────────────────────────────────────

export type FormOptionType = "default" | "quiz_option"

/** shared.form-option — a selectable option inside a select/quiz field */
export interface FormOptionComponent {
  id: number
  text: string
  type: FormOptionType
  additionalInfo: string | null // richtext, only for quiz_option
  isDisqualifying: boolean // only for quiz_option
}

// ─── shared.form-fields ──────────────────────────────────────────────────────

export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select"

/** shared.form-fields — a single form field definition */
export interface FormFieldComponent {
  id: number
  label: string | null
  type: FormFieldType
  required: boolean
  selectOptions: FormOptionComponent[] // populated only when type === "select"
}

// ─── shared.form-step ────────────────────────────────────────────────────────

/** shared.form-step — a named step containing multiple fields */
export interface FormStepComponent {
  id: number
  title: string | null
  description: string | null
  fields: FormFieldComponent[]
}

// ─── cards.feature-card ──────────────────────────────────────────────────────

/** cards.feature-card — icon + title + optional description */
export interface FeatureCardComponent {
  id: number
  icon: IconhubField | null
  title: string
  description: string | null
}

// ─── Re-exports from media.ts ─────────────────────────────────────────────────

export type { StrapiMediaComponent, StrapiFileComponent }
