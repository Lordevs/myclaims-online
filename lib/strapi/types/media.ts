/**
 * Strapi media/upload types.
 * Matches the shape returned by Strapi v5's Media Library (plugin::upload.file).
 */

// ─── Image format variants ────────────────────────────────────────────────────

export interface StrapiImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat
  small?: StrapiImageFormat
  medium?: StrapiImageFormat
  large?: StrapiImageFormat
}

// ─── Full media file ──────────────────────────────────────────────────────────

/** Full media object as returned by Strapi's upload plugin */
export interface StrapiMediaFile {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: StrapiImageFormats | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
}

// ─── Component wrappers ───────────────────────────────────────────────────────

/**
 * `shared.media` — wraps a single image file.
 * Used on logo, hero images, form illustration, etc.
 */
export interface StrapiMediaComponent {
  id: number
  file: StrapiMediaFile
}

/**
 * `shared.file` — wraps a single non-image file (PDFs, docs, etc.)
 * Used inside `shared.file-link`.
 */
export interface StrapiFileComponent {
  id: number
  file: StrapiMediaFile
}
