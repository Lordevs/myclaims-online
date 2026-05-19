/**
 * Strapi media/upload types.
 * Matches the shape returned by Strapi's Media Library.
 */

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

/** Full media object as returned by Strapi */
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

/** The `shared.media` component wraps a single file */
export interface StrapiMediaComponent {
  id: number
  file: StrapiMediaFile
}

/** The `shared.slider` component wraps multiple files */
export interface StrapiSliderComponent {
  id: number
  files: StrapiMediaFile[]
}

/** The `shared.video` component wraps a single video file */
export interface StrapiVideoComponent {
  id: number
  video: StrapiMediaFile
}
