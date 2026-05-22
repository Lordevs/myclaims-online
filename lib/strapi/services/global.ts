import "server-only"
import { cache } from "react"
import { fetchStrapi } from "../fetch"
import { globalPopulate } from "../queries"
import { STRAPI_ENDPOINTS } from "../endpoints"
import type { StrapiSingleResponse } from "../types/api"
import type { GlobalData } from "../types/global"

/**
 * Fetches the Global single-type from Strapi.
 * Returns navbar, footer, default SEO, logo, and site-wide settings.
 *
 * Wrapped in React cache() to deduplicate requests across components during the same render pass.
 */
export const getGlobal = cache(async (): Promise<GlobalData | null> => {
  try {
    const response = await fetchStrapi<StrapiSingleResponse<GlobalData>>(
      STRAPI_ENDPOINTS.GLOBAL,
      {
        params: { populate: globalPopulate },
        nextOptions: { next: { tags: ["global"], revalidate: 3600 } },
      }
    )
    return response.data
  } catch (error) {
    console.error("[getGlobal] Error fetching global data:", error)
    return null
  }
})
