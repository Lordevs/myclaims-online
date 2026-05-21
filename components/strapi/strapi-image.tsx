import Image, { type ImageProps } from "next/image"
import { getStrapiMedia } from "@/lib/strapi/utils"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

interface StrapiImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: StrapiMediaComponent | null | undefined
  alt?: string
  fallbackSrc?: string
}

/**
 * Thin wrapper around next/image that resolves Strapi's relative media URLs.
 *
 * - Handles both localhost (/uploads/...) and Strapi Cloud CDN (absolute URLs).
 * - Uses the file's alternativeText as the default alt — falls back to file name.
 * - Reads width/height from the media file if not provided as props.
 * - Disables Next.js image optimisation in development to avoid domain whitelist issues.
 *
 * Usage:
 *   <StrapiImage image={section.image} width={1200} height={600} />
 *   <StrapiImage image={global.logo} fill className="object-contain" />
 */
export function StrapiImage({
  image,
  alt,
  fallbackSrc,
  ...props
}: StrapiImageProps) {
  const src = getStrapiMedia(image?.file?.url) ?? fallbackSrc

  if (!src) return null

  const resolvedAlt =
    alt ?? image?.file?.alternativeText ?? image?.file?.name ?? ""

  const resolvedWidth =
    (props.width as number | undefined) ?? image?.file?.width ?? undefined

  const resolvedHeight =
    (props.height as number | undefined) ?? image?.file?.height ?? undefined

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={resolvedWidth}
      height={resolvedHeight}
      unoptimized={
        process.env.NODE_ENV === "development" || props.unoptimized
      }
      {...props}
    />
  )
}
