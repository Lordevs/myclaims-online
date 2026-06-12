/**
 * Centralised Strapi API endpoint constants.
 *
 * Use these instead of raw string literals so that a prefix change
 * (e.g. adding "/v1") only needs updating in one place.
 *
 * Usage:
 *   import { STRAPI_ENDPOINTS } from "@/lib/strapi/endpoints"
 *   await fetchStrapi(STRAPI_ENDPOINTS.PAGES, { ... })
 */

export const STRAPI_ENDPOINTS = {
  GLOBAL: "/api/global",
  PAGES: "/api/pages",
  FAQS: "/api/faqs",
  CTAS: "/api/ctas",
  FORMS: "/api/forms",
  FORM_SUBMISSIONS: "/api/form-submissions",
  BLOGS: "/api/articles",
} as const

export type StrapiEndpoint =
  (typeof STRAPI_ENDPOINTS)[keyof typeof STRAPI_ENDPOINTS]
