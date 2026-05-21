import Link from "next/link"
import { Markdown } from "@/components/shared/markdown"
import { Logo } from "@/components/shared/logo"
import { Container } from "@/components/layout/container"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import { resolveStrapiLink } from "@/lib/strapi/utils"
import type { GlobalData } from "@/lib/strapi/types/global"

interface FooterProps {
  globalData?: GlobalData | null
}

export function Footer({ globalData }: FooterProps) {
  const footer = globalData?.footer

  if (!footer) return null

  return (
    <footer className="border-t-4 border-[#A3E635] bg-primary pt-16 pb-10 font-sans text-white">
      <Container>
        {/* Main top grid */}
        <div className="flex flex-col gap-12 pb-12 lg:flex-row lg:justify-between lg:gap-8">
          {/* Left Column */}
          <div className="flex max-w-lg flex-col">
            <Logo logo={globalData?.logo} className="h-6 w-auto" />
            {footer.description && (
              <p className="mt-6 text-[14px] leading-relaxed text-white/80">
                {footer.description}
              </p>
            )}
            {/* Social Icons — from Strapi */}
            {footer.socialLinks && footer.socialLinks.length > 0 && (
              <div className="mt-8 flex items-center gap-5">
                {footer.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 transition-colors hover:text-white"
                    aria-label={social.icon?.iconName}
                  >
                    <StrapiIcon icon={social.icon} size={24} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Columns — page links from Strapi */}
          {footer.pageLinks && footer.pageLinks.length > 0 && (
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 pr-4 text-[14px] font-medium lg:gap-x-24 lg:pr-8">
              {footer.pageLinks.map((col) => (
                <div key={col.id} className="flex flex-col gap-5">
                  {col.title && (
                    <span className="text-xs font-bold tracking-widest text-white/40 uppercase">
                      {col.title}
                    </span>
                  )}
                  {col.links.map((link) => {
                    const href = resolveStrapiLink(link)
                    return (
                      <Link
                        key={link.id}
                        href={href}
                        className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
                        {...(link.isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtle separator */}
        {(footer.pageLinks?.length > 0 ||
          footer.socialLinks?.length > 0 ||
          footer.description) && (
          <div className="border-t border-white/10 pt-8" />
        )}

        {/* Bottom Metadata & Disclaimer */}
        <div className="flex flex-col gap-8 text-xs leading-relaxed text-white/70 lg:flex-row lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3.5">
            {/* Company details — Strapi shared.rich-text */}
            {footer.companyDetails?.body && (
              <Markdown
                content={footer.companyDetails.body}
                className="text-xs leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
              />
            )}

            {/* Disclaimer — Strapi shared.rich-text */}
            {footer.disclaimer?.body && (
              <Markdown
                content={footer.disclaimer.body}
                className="mt-2 text-xs leading-relaxed text-white/50 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white/85"
              />
            )}
          </div>

          <div className="flex items-end lg:text-right">
            <p className="text-[13px] font-semibold tracking-wide whitespace-nowrap text-[#A3E635]">
              © {new Date().getFullYear()}{" "}
              {footer.copyright || "MyClaims Online. All rights reserved."}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
