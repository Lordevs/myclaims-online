/**
 * Global single-type data shape.
 * Mirrors api::global.global from contentTypes.d.ts EXACTLY.
 *
 * Key notes from the Strapi schema:
 * - navbarItems is a DynamicZone of ['shared.link', 'blocks.mega-menu']
 * - footer is a repeatable component (array) of layout.footer
 * - Logo is capital L (top-level field on global)
 * - navbarCta is a shared.link component
 */

import type {
  SEOComponent,
  FooterColumn,
  ContactItem,
  LinkComponent,
} from "./shared"
import type { StrapiMediaComponent, StrapiMediaFile } from "./media"
import type { MegaMenuBlock } from "./shared"

// ─── Navbar Dynamic Zone items ─────────────────────────────────────────────────

/** A simple link in the navbar (shared.link with __component discriminant) */
export interface NavLinkItem extends LinkComponent {
  __component: "shared.link"
}

/** A mega-menu trigger in the navbar (blocks.mega-menu with __component) */
export interface NavMegaMenuItem extends MegaMenuBlock {
  __component: "blocks.mega-menu"
}

/** Union of navbar dynamic zone items */
export type NavbarItem = NavLinkItem | NavMegaMenuItem

// ─── Footer ────────────────────────────────────────────────────────────────────

/**
 * layout.footer component.
 * The global.footer field is repeatable=true, so it's an array.
 * In practice you'll use index 0.
 */
export interface FooterData {
  id: number
  logo: StrapiMediaComponent | null
  description: string | null
  contactList: ContactItem[]
  columns: FooterColumn[]
  copyrightText: string | null
  bgText: string | null
}

// ─── Global ────────────────────────────────────────────────────────────────────

/**
 * api::global.global — the full single-type response data.
 * Fields match the Strapi contentTypes.d.ts exactly.
 */
export interface GlobalData {
  id: number
  documentId: string
  siteName: string
  siteDescription: string
  /** Top-level Logo field (capital L) */
  Logo: StrapiMediaComponent | null
  /** Navbar CTA button */
  navbarCta: LinkComponent | null
  /** Navbar nav items — DynamicZone of link | mega-menu */
  navbarItems: NavbarItem[]
  /** Footer — non-repeatable component (single object) */
  footer: FooterData | null
  defaultSeo: SEOComponent | null
  favicon: StrapiMediaFile | null
  createdAt: string
  updatedAt: string
}
