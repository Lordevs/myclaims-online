/**
 * Generic Strapi v5 REST API response wrappers.
 *
 * Strapi v5 flattens all fields directly onto the data object.
 * There is no `attributes` wrapper anymore (that was v4).
 */

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiMeta {
  pagination?: StrapiPagination
}

// ─── Response envelopes ───────────────────────────────────────────────────────

/** Single-item response — Single Types and detail endpoints */
export interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string }
  meta: StrapiMeta
}

/** List response — Collection Types */
export interface StrapiListResponse<T> {
  data: Array<T & { id: number; documentId: string }>
  meta: StrapiMeta
}

// ─── Error ────────────────────────────────────────────────────────────────────

export interface StrapiError {
  status: number
  name: string
  message: string
  details?: Record<string, unknown>
}

export interface StrapiErrorResponse {
  error: StrapiError
}
