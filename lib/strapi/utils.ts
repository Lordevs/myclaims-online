/**
 * Strapi URL and media utilities.
 *
 * getStrapiURL    — builds an absolute URL against the Strapi base
 * getStrapiMedia  — resolves a media file URL (relative or absolute)
 * resolveStrapiLink — converts a shared.link component to a Next.js href
 */

import type { LinkComponent } from "./types/shared"

// ─── Base URL ─────────────────────────────────────────────────────────────────

/**
 * Returns the Strapi base URL.
 * Server-side: uses STRAPI_URL (never exposed to client).
 * Client-side: falls back to NEXT_PUBLIC_STRAPI_URL.
 * Local fallback: http://localhost:1337.
 */
export function getStrapiURL(path = ""): string {
  const base =
    process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1337"
  return `${base.replace(/\/$/, "")}${path}`
}

// ─── Media ────────────────────────────────────────────────────────────────────

/**
 * Resolves a Strapi media URL to an absolute URL.
 * - Relative paths (/uploads/...) are prefixed with the Strapi base URL.
 * - Already-absolute URLs (Strapi Cloud CDN, S3, etc.) are returned as-is.
 * - Returns null if the url is falsy.
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return getStrapiURL(url)
}

// ─── Link resolver ────────────────────────────────────────────────────────────

/**
 * Resolves a shared.link component to a valid Next.js route string.
 * - External links → returned as-is.
 * - Internal page links → "/{slug}" (home slug maps to "/").
 * - Falls back to "#" if no valid href can be determined.
 */
export function resolveStrapiLink(
  link: LinkComponent | null | undefined
): string {
  if (!link) return "#"
  if (link.isExternal && link.externalLink) return link.externalLink
  if (link.page?.slug) {
    return link.page.slug === "home" ? "/" : `/${link.page.slug}`
  }
  return "#"
}
