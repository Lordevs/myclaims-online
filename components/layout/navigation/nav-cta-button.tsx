import Link from "next/link"
import { cn } from "@/lib/utils"
import { resolveStrapiLink } from "@/lib/strapi/utils"
import { LinkComponent } from "@/lib/strapi/types/shared"
import { Button } from "@/components/ui/button"

interface NavCTAButtonProps {
  className?: string
  onClick?: () => void
  /** Strapi CTA link */
  ctaButton?: LinkComponent | null
}

export function NavCTAButton({
  className,
  onClick,
  ctaButton,
}: NavCTAButtonProps) {
  if (!ctaButton) return null

  const label = ctaButton.label
  const href = resolveStrapiLink(ctaButton)

  return (
    <Button
      asChild
      variant="secondary"
      className={cn(
        "h-11 cursor-pointer rounded-xl px-6 text-[13px] font-extrabold tracking-wide uppercase shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-lg active:translate-y-0 active:scale-[0.97]",
        className
      )}
    >
      <Link
        href={href}
        onClick={onClick}
        {...(ctaButton.isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {label}
      </Link>
    </Button>
  )
}
