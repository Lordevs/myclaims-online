/**
 * fetchStrapi<T> — the single fetch utility for all Strapi REST API calls.
 *
 * Features:
 *  - Attaches Authorization: Bearer token automatically (server-only)
 *  - Accepts a `populate` object and serializes it via `qs` (Strapi's expected format)
 *  - Passes Next.js cache options through for ISR / on-demand revalidation
 *  - Throws a typed StrapiFetchError on non-2xx responses
 *  - All calls are server-side only (STRAPI_API_TOKEN is never exposed to client)
 */

import qs from "qs"
import { getStrapiURL } from "./utils"
import type { StrapiErrorResponse } from "./types/api"

// ─── Error class ──────────────────────────────────────────────────────────────

export class StrapiFetchError extends Error {
  status: number
  details?: Record<string, unknown>

  constructor(
    message: string,
    status: number,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.name = "StrapiFetchError"
    this.status = status
    this.details = details
  }
}

// ─── Options ──────────────────────────────────────────────────────────────────

export interface FetchStrapiOptions {
  /**
   * Strapi populate object — will be serialized to query string via qs.
   * Example: { populate: { navbarItems: { populate: { items: true } } } }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  /**
   * Next.js fetch cache options.
   * Use `{ next: { revalidate: 60 } }` for ISR or
   * `{ next: { tags: ['global'] } }` for on-demand revalidation.
   * Defaults to `{ next: { revalidate: 60 } }`.
   */
  nextOptions?: RequestInit
  /** Override the default Authorization header (e.g. pass undefined for public routes) */
  token?: string | null
}

// ─── Core fetcher ─────────────────────────────────────────────────────────────

/**
 * Fetches from Strapi REST API with auth, qs serialization, and Next.js caching.
 *
 * @param path  - Strapi API path, e.g. "/api/global" or "/api/pages"
 * @param options - populate params, Next.js cache options, token override
 *
 * @example
 * const data = await fetchStrapi<StrapiSingleResponse<GlobalData>>("/api/global", {
 *   params: { populate: globalPopulate },
 *   nextOptions: { next: { tags: ["global"] } },
 * })
 */
export async function fetchStrapi<T>(
  path: string,
  { params, nextOptions, token }: FetchStrapiOptions = {}
): Promise<T> {
  const queryString = params
    ? `?${qs.stringify(params, { encodeValuesOnly: true })}`
    : ""

  const url = getStrapiURL(`${path}${queryString}`)

  const authToken =
    token !== undefined ? token : (process.env.STRAPI_API_TOKEN ?? null)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  }

  const hasCacheProperty = nextOptions && "cache" in nextOptions

  const res = await fetch(url, {
    headers,
    // Default: revalidate every 60 seconds (ISR) unless a specific cache strategy is provided.
    ...(!hasCacheProperty ? { next: { revalidate: 60 } } : {}),
    ...(nextOptions ?? {}),
  })

  if (!res.ok) {
    let errorBody: StrapiErrorResponse | null = null
    try {
      errorBody = await res.json()
    } catch {
      // ignore parse errors
    }
    throw new StrapiFetchError(
      errorBody?.error?.message ??
        `Strapi API error: ${res.status} ${res.statusText}`,
      res.status,
      errorBody?.error?.details
    )
  }

  return res.json() as Promise<T>
}

// ─── Mutation helper (for Server Actions) ────────────────────────────────────

/**
 * POST/PUT/DELETE to Strapi. Used by server actions (form submissions, etc.)
 * Does NOT use Next.js data cache — always hits the network.
 */
export async function mutateStrapiData<T>(
  path: string,
  method: "POST" | "PUT" | "DELETE",
  body?: unknown,
  token?: string | null
): Promise<T> {
  const url = getStrapiURL(path)

  const authToken =
    token !== undefined ? token : (process.env.STRAPI_API_TOKEN ?? null)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  if (!res.ok) {
    let errorBody: StrapiErrorResponse | null = null
    try {
      errorBody = await res.json()
    } catch {
      // ignore parse errors
    }
    throw new StrapiFetchError(
      errorBody?.error?.message ??
        `Strapi ${method} error: ${res.status} ${res.statusText}`,
      res.status,
      errorBody?.error?.details
    )
  }

  return res.json() as Promise<T>
}
