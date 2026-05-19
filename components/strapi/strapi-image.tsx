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
 * Handles both localhost and Strapi Cloud absolute URLs transparently.
 *
 * Usage:
 *   <StrapiImage image={section.heroImage} width={1200} height={600} />
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

  const width = (props.width as number) ?? image?.file?.width ?? undefined
  const height = (props.height as number) ?? image?.file?.height ?? undefined

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={width}
      height={height}
      unoptimized={process.env.NODE_ENV === "development" || props.unoptimized}
      {...props}
    />
  )
}
