/**
 * Shared Strapi component types.
 * Mirrors every schema in src/components/shared/ of the Strapi project.
 */

import type { StrapiMediaComponent } from "./media";

// ─── Strapi Rich-Text Block Types ────────────────────────────────────────────

/** A single text run inside a block node */
export interface StrapiBlockChild {
  type?: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

/** A single block node (paragraph, heading, list, etc.) */
export interface StrapiBlockNode {
  type: "paragraph" | "heading" | "list" | "list-item" | "quote" | "code" | "image" | string;
  children?: (StrapiBlockChild | StrapiBlockNode)[];
  level?: number;
  format?: "ordered" | "unordered";
}

/** Strapi Blocks rich-text field — array of block nodes */
export type StrapiBlockContent = StrapiBlockNode[];

// ─── Iconhub ──────────────────────────────────────────────────────────────────

/**
 * The iconhub custom field stores both the icon name (for @iconify/react)
 * and the raw SVG data. Always prefer `iconName` on the frontend.
 */
export interface IconhubField {
  iconName: string; // e.g. "mdi:home" — use with <Icon icon={iconName} />
  iconData: string; // raw SVG string (fallback only)
}

// ─── Shared Components ────────────────────────────────────────────────────────

/** shared.link — internal page or external URL */
export interface LinkComponent {
  id: number;
  label: string;
  isExternal: boolean;
  externalLink: string | null;
  page: PageRelation | null;
}

/** Minimal page shape as it appears in relations (e.g. inside shared.link) */
export interface PageRelation {
  id: number;
  documentId: string;
  slug: string;
  title: string;
}

/** shared.seo */
export interface SEOComponent {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: import("./media").StrapiMediaFile | null;
}

/** shared.tag */
export interface TagComponent {
  id: number;
  name: string;
  isHighlighted: boolean;
}

/** shared.stat */
export interface StatComponent {
  id: number;
  value: string;
  label: string;
}

/** shared.check-item */
export interface CheckItem {
  id: number;
  text: string;
}

/** shared.meta-item (used in project-meta-section) */
export interface MetaItem {
  id: number;
  label: string;
  title: string;
  subtitle: string;
}

/** shared.rich-text */
export interface RichTextComponent {
  id: number;
  body: string;
}

/** shared.contact-item (used in footer) */
export interface ContactItem {
  id: number;
  icon: IconhubField;
  label: string;
  href: string;
}

/** shared.footer-column */
export interface FooterColumn {
  id: number;
  title: string;
  links: LinkComponent[];
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────

/** shared.mega-menu-item */
export interface MegaMenuItem {
  id: number;
  icon: IconhubField;
  label: string;
  description: string | null;
  page: PageRelation | null;
}

/** shared.mega-menu-category */
export interface MegaMenuCategory {
  id: number;
  title: string;
  items: MegaMenuItem[];
}

/** shared.mega-menu-featured */
export interface MegaMenuFeatured {
  id: number;
  title: string;
  description: string | null;
  link: LinkComponent | null;
  video: import("./media").StrapiVideoComponent | null;
}

/** blocks.mega-menu */
export interface MegaMenuBlock {
  id: number;
  label: string;
  categories: MegaMenuCategory[];
  featured: MegaMenuFeatured | null;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

/** A top-level nav item — either a simple link or a mega-menu trigger */
export interface NavItem {
  id: number;
  label: string;
  link: LinkComponent | null;
  megaMenu: MegaMenuBlock | null;
}

// ─── Media component alias ────────────────────────────────────────────────────
export type { StrapiMediaComponent };
