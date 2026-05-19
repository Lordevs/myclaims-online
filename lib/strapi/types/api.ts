/**
 * Generic Strapi v5 REST API response wrappers.
 * All API responses follow this envelope pattern.
 */

/** A single resource's data envelope */
export interface StrapiData<T> {
  id: number;
  documentId: string;
  attributes?: T; // Strapi v4 compat (v5 flattens, but kept for safety)
  [key: string]: unknown; // Strapi v5 flattens fields directly onto the object
}

/** Pagination metadata returned in list responses */
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** Meta object on list responses */
export interface StrapiMeta {
  pagination?: StrapiPagination;
}

/** Single-item response (Single Types and detail endpoints) */
export interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string };
  meta: StrapiMeta;
}

/** List response (Collection Types) */
export interface StrapiListResponse<T> {
  data: Array<T & { id: number; documentId: string }>;
  meta: StrapiMeta;
}

/** Strapi error response shape */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}
