import "server-only"
import { cache } from "react"
import { fetchStrapi } from "../fetch"
import { pagePopulate } from "../queries"
import type { StrapiListResponse } from "../types/api"
import type { PageEntry } from "../types/collections"

/**
 * Fetches a single page by its slug, including all DynamicZone sections.
 *
 * Wrapped in React cache() to deduplicate requests.
 */
export const getPageBySlug = cache(
  async (slug: string): Promise<PageEntry | null> => {
    try {
      const response = await fetchStrapi<StrapiListResponse<PageEntry>>(
        "/api/pages",
        {
          params: {
            filters: { slug: { $eq: slug } },
            populate: pagePopulate,
          },
          nextOptions: {
            next: { tags: [`page-${slug}`, "pages"], revalidate: 3600 },
          },
        }
      )

      return response.data?.[0] ?? null
    } catch (error) {
      console.error(`[getPageBySlug] Error fetching page "${slug}":`, error)
      return null
    }
  }
)

/**
 * Fetches all pages. Useful for generateStaticParams().
 */
export const getAllPages = cache(async (): Promise<PageEntry[]> => {
  try {
    const response = await fetchStrapi<StrapiListResponse<PageEntry>>(
      "/api/pages",
      {
        params: {
          fields: ["slug", "title"], // Only fetch what's needed for routing
        },
        nextOptions: { next: { tags: ["pages"], revalidate: 3600 } },
      }
    )
    return response.data ?? []
  } catch (error) {
    console.error("[getAllPages] Error fetching pages:", error)
    return []
  }
})
