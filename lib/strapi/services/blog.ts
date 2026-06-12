import "server-only"
import { cache } from "react"
import { fetchStrapi } from "../fetch"
import { blogPopulate } from "../queries"
import { STRAPI_ENDPOINTS } from "../endpoints"
import type { StrapiListResponse, StrapiPagination } from "../types/api"
import type { BlogEntry } from "../types/blog"

// ─── Fetching Services ───────────────────────────────────────────────────────

/**
 * Fetches all blog entries (articles) from Strapi.
 * Returns an empty array if the API fails or returns no posts.
 */
export const getBlogs = cache(async (): Promise<BlogEntry[]> => {
  try {
    const response = await fetchStrapi<StrapiListResponse<BlogEntry>>(
      STRAPI_ENDPOINTS.BLOGS,
      {
        params: {
          populate: blogPopulate,
          sort: ["publishedAt:desc", "createdAt:desc"],
        },
        nextOptions: {
          next: { tags: ["blogs"], revalidate: 3600 },
        },
      }
    )

    return response.data ?? []
  } catch (error) {
    console.error("[getBlogs] Error fetching articles from Strapi:", error)
    return []
  }
})

/**
 * Fetches a single blog entry (article) by its slug.
 * Returns null if not found or the fetch fails.
 */
export const getBlogBySlug = cache(
  async (slug: string): Promise<BlogEntry | null> => {
    try {
      const response = await fetchStrapi<StrapiListResponse<BlogEntry>>(
        STRAPI_ENDPOINTS.BLOGS,
        {
          params: {
            filters: { slug: { $eq: slug } },
            populate: blogPopulate,
          },
          nextOptions: {
            next: { tags: [`blog-${slug}`, "blogs"], revalidate: 3600 },
          },
        }
      )

      return response.data?.[0] ?? null
    } catch (error) {
      console.error(
        `[getBlogBySlug] Error fetching article "${slug}" from Strapi:`,
        error
      )
      return null
    }
  }
)

/**
 * Fetches a paginated slice of blog entries (articles) from Strapi.
 */
export const getBlogsPaginated = cache(
  async (
    page: number = 1,
    pageSize: number = 9,
    excludeId?: number
  ): Promise<{ data: BlogEntry[]; pagination: StrapiPagination | null }> => {
    try {
      const response = await fetchStrapi<StrapiListResponse<BlogEntry>>(
        STRAPI_ENDPOINTS.BLOGS,
        {
          params: {
            populate: blogPopulate,
            sort: ["publishedAt:desc", "createdAt:desc"],
            pagination: { page, pageSize },
            ...(excludeId && { filters: { id: { $ne: excludeId } } }),
          },
          nextOptions: {
            next: { 
              tags: [
                `blogs-page-${page}`, 
                ...(excludeId ? [`exclude-${excludeId}`] : []), 
                "blogs"
              ], 
              revalidate: 3600 
            },
          },
        }
      )

      return {
        data: response.data ?? [],
        pagination: response.meta?.pagination ?? null,
      }
    } catch (error) {
      console.error(
        `[getBlogsPaginated] Error fetching articles (page ${page}) from Strapi:`,
        error
      )
      return { data: [], pagination: null }
    }
  }
)
