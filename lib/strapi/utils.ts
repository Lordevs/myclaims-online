/**
 * Returns the base Strapi URL.
 * Uses STRAPI_URL (server) or falls back to NEXT_PUBLIC_STRAPI_URL (client).
 */
export function getStrapiURL(path = ""): string {
  const base =
    process.env.STRAPI_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1337";
  return `${base.replace(/\/$/, "")}${path}`;
}

/**
 * Resolves a Strapi media URL to an absolute URL.
 * Handles both relative paths (/uploads/...) and already-absolute URLs.
 * Returns null if the url is falsy.
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return getStrapiURL(url);
}

interface StrapiLinkField {
  isExternal?: boolean | null;
  externalLink?: string | null;
  page?: { slug?: string } | null;
}

/**
 * Resolves a Strapi link component to a valid route.
 * Automatically maps the "home" slug to the root "/" path.
 */
export function resolveStrapiLink(link: StrapiLinkField | null | undefined): string {
  if (!link) return "#";
  if (link.isExternal && link.externalLink) return link.externalLink;
  if (link.page?.slug) {
    return link.page.slug === "home" ? "/" : `/${link.page.slug}`;
  }
  return "#";
}
