/**
 * Global single-type data shape.
 * Mirrors api::global.global — the actual schema in the CMS.
 *
 * Fields:
 *   siteName         string (required)
 *   siteDescription  text (required)
 *   favicon          media
 *   defaultSeo       shared.seo component
 *   logo             shared.media component
 *   navbarItems      DynamicZone of [shared.link, shared.dropdown]
 *   navbarCta        shared.link component
 *   footer           layout.footer component
 */

import type {
  LinkComponent,
  DropdownComponent,
  SocialMediaLinkComponent,
  LinkColumnComponent,
  SEOComponent,
  RichTextComponent,
} from "./shared"
import type { StrapiMediaComponent, StrapiMediaFile } from "./media"

// ─── Navbar Dynamic Zone ──────────────────────────────────────────────────────

/** A simple link in the navbar — shared.link with __component discriminant */
export interface NavLinkItem extends LinkComponent {
  __component: "shared.link"
}

/** A dropdown group in the navbar — shared.dropdown with __component discriminant */
export interface NavDropdownItem extends DropdownComponent {
  __component: "shared.dropdown"
}

/** Union of all navbar dynamic zone items */
export type NavbarItem = NavLinkItem | NavDropdownItem

// ─── Footer ───────────────────────────────────────────────────────────────────

/**
 * layout.footer component.
 * The global.footer field is non-repeatable (single object).
 */
export interface FooterData {
  id: number
  description: string | null
  socialLinks: SocialMediaLinkComponent[]
  companyDetails: RichTextComponent | null
  disclaimer: RichTextComponent | null
  copyright: string | null
  pageLinks: LinkColumnComponent[]
}

// ─── Global ───────────────────────────────────────────────────────────────────

/**
 * api::global.global — full single-type response data.
 * Fields match the Strapi schema exactly.
 */
export interface GlobalData {
  id: number
  documentId: string
  siteName: string
  siteDescription: string
  favicon: StrapiMediaFile | null
  defaultSeo: SEOComponent | null
  /** shared.media component wrapping the logo image */
  logo: StrapiMediaComponent | null
  /** Navbar CTA button — shared.link */
  navbarCta: LinkComponent | null
  /** Navbar nav items — DynamicZone of shared.link | shared.dropdown */
  navbarItems: NavbarItem[]
  /** WhatsApp contact number */
  whatsappNumber?: string | null
  /** Optional WhatsApp default message pre-filled */
  whatsappMessage?: string | null
  /** Footer — non-repeatable layout.footer component */
  footer: FooterData | null
  createdAt: string
  updatedAt: string
}
