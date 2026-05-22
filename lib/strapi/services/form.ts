import "server-only"
import { cache } from "react"
import { fetchStrapi } from "../fetch"
import { formPopulate } from "../queries"
import { STRAPI_ENDPOINTS } from "../endpoints"
import type { StrapiListResponse } from "../types/api"
import type { FormEntry } from "../types/collections"

/**
 * Fetches a form definition by its `formId`.
 * Populates all steps, fields, and select options.
 */
export const getFormById = cache(
  async (formId: string): Promise<FormEntry | null> => {
    try {
      const response = await fetchStrapi<StrapiListResponse<FormEntry>>(
        STRAPI_ENDPOINTS.FORMS,
        {
          params: {
            filters: { formId: { $eq: formId } },
            populate: formPopulate,
          },
          nextOptions: { next: { tags: [`form-${formId}`], revalidate: 3600 } },
        }
      )

      return response.data?.[0] ?? null
    } catch (error) {
      console.error(`[getFormById] Error fetching form "${formId}":`, error)
      return null
    }
  }
)
