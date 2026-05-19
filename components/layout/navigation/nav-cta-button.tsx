import Link from "next/link"
import { cn } from "@/lib/utils"
import { resolveStrapiLink } from "@/lib/strapi/utils"
import { ROUTES } from "@/constants/routes"
import { LinkComponent } from "@/lib/strapi/types/shared"
import { Button } from "@/components/ui/button"

interface NavCTAButtonProps {
  className?: string
  onClick?: () => void
  /** Strapi CTA link — overrides the hardcoded route when provided */
  ctaButton?: LinkComponent | null
}

export function NavCTAButton({ className, onClick, ctaButton }: NavCTAButtonProps) {
  const label = ctaButton?.label ?? "Start My Claim"
  const resolvedLink = resolveStrapiLink(ctaButton)
  const href = resolvedLink === "#" ? ROUTES.START_MY_CLAIM : resolvedLink

  return (
    <Button
      asChild
      variant="secondary"
      className={cn(
        "cursor-pointer font-extrabold tracking-wide text-[13px] uppercase px-6 h-11 rounded-xl shadow-md transition-all duration-300 hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        className
      )}
    >
      <Link
        href={href}
        onClick={onClick}
        {...(ctaButton?.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </Link>
    </Button>
  )
}
