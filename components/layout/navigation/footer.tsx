import Link from "next/link"
import { Markdown } from "@/components/shared/markdown"
import { Logo } from "@/components/shared/logo"
import { Container } from "@/components/layout/container"
import { StrapiIcon } from "@/components/strapi/strapi-icon"
import { resolveStrapiLink } from "@/lib/strapi/utils"
import { ROUTES } from "@/constants/routes"
import type { GlobalData } from "@/lib/strapi/types/global"

interface FooterProps {
  globalData?: GlobalData | null
}

export function Footer({ globalData }: FooterProps) {
  const footer = globalData?.footer

  return (
    <footer className="border-t-4 border-[#A3E635] bg-primary pt-16 pb-10 font-sans text-white">
      <Container>
        {/* Main top grid */}
        <div className="flex flex-col gap-12 pb-12 lg:flex-row lg:justify-between lg:gap-8">
          {/* Left Column */}
          <div className="flex max-w-lg flex-col">
            <Logo className="h-6 w-auto" />
            <p className="mt-6 text-[14px] leading-relaxed text-white/80">
              {footer?.description ??
                "Helping individuals navigate the complexities of road traffic accident claims with modern technology and human care. We specialize in recovering what's rightfully yours."}
            </p>
            {/* Social Icons — from Strapi */}
            {footer?.socialLinks && footer.socialLinks.length > 0 ? (
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
            ) : (
              /* Fallback hardcoded social icons */
              <div className="mt-8 flex items-center gap-5">
                {FALLBACK_SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Columns — page links from Strapi or fallback */}
          {footer?.pageLinks && footer.pageLinks.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 pr-4 text-[14px] font-medium lg:gap-x-24 lg:pr-8">
              {footer.pageLinks.map((col) => (
                <div key={col.id} className="flex flex-col gap-5">
                  {col.title && (
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">
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
                        {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          ) : (
            /* Fallback hardcoded links */
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 pr-4 text-[14px] font-medium lg:gap-x-24 lg:pr-8">
              <div className="flex flex-col gap-5">
                <Link
                  href={ROUTES.LEGAL.PRIVACY_POLICY}
                  className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={ROUTES.LEGAL.COMPLAINTS}
                  className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
                >
                  Complaints
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                <Link
                  href={ROUTES.LEGAL.TERMS_OF_SERVICE}
                  className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
                >
                  Terms of Service
                </Link>
                <Link
                  href={ROUTES.LEGAL.COOKIE_POLICY}
                  className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Subtle separator */}
        <div className="border-t border-white/10 pt-8" />

        {/* Bottom Metadata & Disclaimer */}
        <div className="flex flex-col gap-8 text-xs leading-relaxed text-white/70 lg:flex-row lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3.5">
            {/* Company details — Strapi shared.rich-text or Markdown fallback */}
            {footer?.companyDetails?.body ? (
              <Markdown
                content={footer.companyDetails.body}
                className="text-xs leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
              />
            ) : (
              <>
                <Markdown
                  content="Northridge Solutions Ltd T/A My Claims Online | FCA FRN: XXXXXXX | Company No: **17154158**"
                  className="text-xs leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
                />
                <Markdown
                  content="**Registered Address:** Ground Floor, Citygate Longridge Road Preston PR2 5BQ"
                  className="text-xs leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
                />
              </>
            )}

            {/* Disclaimer — Strapi shared.rich-text or Markdown fallback */}
            {footer?.disclaimer?.body ? (
              <Markdown
                content={footer.disclaimer.body}
                className="mt-2 text-xs leading-relaxed text-white/50 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white/85"
              />
            ) : (
              <Markdown
                content="**Disclaimer:** My Claims Online is a Claims Management Company that is authorised and regulated by the Financial Conduct Authority (FCA) under Firm Reference Number XXXXXX. Our FCA-regulated activity is limited to the referral of clients to our panel of personal injury solicitors. All other services we provide including vehicle replacement, repair management, and roadside recovery — are not regulated by the FCA."
                className="mt-2 text-xs leading-relaxed text-white/50 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white/85"
              />
            )}
          </div>

          <div className="flex items-end lg:text-right">
            <p className="text-[13px] font-semibold tracking-wide whitespace-nowrap text-[#A3E635]">
              © {new Date().getFullYear()} {footer?.copyright ?? "MyClaims Online. All rights reserved."}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

// ─── Fallback hardcoded social icons ─────────────────────────────────────────

const FALLBACK_SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 17.99 4.388 22.954 10.125 23.854V15.469H7.078V11.999H10.125V9.357C10.125 6.35 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.923 17.344 4.923V7.876H15.83C14.339 7.876 13.874 8.801 13.874 9.75V12H17.202L16.67 15.47H13.874V23.855C19.612 22.954 24 17.989 24 12Z" fill="white" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.96 0H17.04C20.88 0 24 3.12 24 6.96V17.04C24 18.8859 23.2667 20.6562 21.9615 21.9615C20.6562 23.2667 18.8859 24 17.04 24H6.96C3.12 24 0 20.88 0 17.04V6.96C0 5.11409 0.733284 3.34379 2.03854 2.03854C3.34379 0.733284 5.11409 0 6.96 0ZM6.72 2.4C5.57427 2.4 4.47546 2.85514 3.6653 3.6653C2.85514 4.47546 2.4 5.57427 2.4 6.72V17.28C2.4 19.668 4.332 21.6 6.72 21.6H17.28C18.4257 21.6 19.5245 21.1449 20.3347 20.3347C21.1449 19.5245 21.6 18.4257 21.6 17.28V6.72C21.6 4.332 19.668 2.4 17.28 2.4H6.72ZM18.3 4.2C18.6978 4.2 19.0794 4.35804 19.3607 4.63934C19.642 4.92064 19.8 5.30218 19.8 5.7C19.8 6.09783 19.642 6.47936 19.3607 6.76066C19.0794 7.04197 18.6978 7.2 18.3 7.2C17.9022 7.2 17.5206 7.04197 17.2393 6.76066C16.958 6.47936 16.8 6.09783 16.8 5.7C16.8 5.30218 16.958 4.92064 17.2393 4.63934C17.5206 4.35804 17.9022 4.2 18.3 4.2ZM12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6ZM12 8.4C11.0452 8.4 10.1295 8.77928 9.45442 9.45442C8.77928 10.1295 8.4 11.0452 8.4 12C8.4 12.9548 8.77928 13.8705 9.45442 14.5456C10.1295 15.2207 11.0452 15.6 12 15.6C12.9548 15.6 13.8705 15.2207 14.5456 14.5456C15.2207 13.8705 15.6 12.9548 15.6 12C15.6 11.0452 15.2207 10.1295 14.5456 9.45442C13.8705 8.77928 12.9548 8.4 12 8.4Z" fill="white" />
      </svg>
    ),
  },
]
