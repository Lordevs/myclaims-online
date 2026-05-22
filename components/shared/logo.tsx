import Link from "next/link"
import { cn } from "@/lib/utils"
import { StrapiImage } from "@/components/strapi/strapi-image"
import type { StrapiMediaComponent } from "@/lib/strapi/types/media"

export const Logo = ({
  href = "/",
  className,
  containerClassName,
  logo,
}: {
  href?: string
  className?: string
  containerClassName?: string
  logo?: StrapiMediaComponent | null
}) => {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2", containerClassName)}
    >
      <StrapiImage
        image={logo}
        fallbackSrc="/logo.avif"
        alt="MyClaims Online"
        width={120}
        height={36}
        className={cn("h-6 w-auto object-contain", className)}
        preload
      />
    </Link>
  )
}
