import Link from "next/link"
import { Markdown } from "@/components/shared/markdown"
import { Button } from "@/components/ui/button"
import type { ArticleBodyBlock } from "@/lib/strapi/types/blog"
import { resolveStrapiLink } from "@/lib/strapi/utils"

interface ArticleZoneRendererProps {
  blocks?: ArticleBodyBlock[] | null
  fallbackContent?: string | null
}

export function ArticleZoneRenderer({ blocks, fallbackContent }: ArticleZoneRendererProps) {
  // Fallback to legacy single rich-text markdown content if blocks are empty/not configured
  if (!blocks || blocks.length === 0) {
    if (!fallbackContent) return null
    return (
      <Markdown
        content={fallbackContent}
        variant="light"
        className="text-base text-[#222222]"
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <Markdown
                key={block.id}
                content={block.body || ""}
                variant="light"
                className="text-base text-[#222222]"
              />
            )

          case "shared.quote":
            return (
              <div
                key={block.id}
                className="my-4 border border-[#A3E635] p-6"
              >
                <blockquote className="text-lg md:text-xl font-semibold leading-relaxed text-[#064E3B]">
                  "{block.quote}"
                </blockquote>
              </div>
            )

          case "sections.article-cta":
            const link = block.link
            const linkHref = link ? resolveStrapiLink(link) : "#"

            return (
              <div
                key={block.id}
                className="my-4 rounded-2xl bg-[#064E3B] p-8 md:p-10 text-white text-left"
              >
                <h3 className="text-xl md:text-2xl font-black mb-3">
                  {block.title}
                </h3>
                {block.description && (
                  <p className="text-sm font-normal text-[#E2E8F0] mb-6 leading-relaxed">
                    {block.description}
                  </p>
                )}
                {link && (
                  <Button
                    asChild
                    className="rounded-xl bg-[#E6405E] hover:bg-[#d03350] text-white font-bold px-6 py-3 h-auto"
                  >
                    <Link href={linkHref}>
                      {link.label || "Check Your Eligibility Now"}
                    </Link>
                  </Button>
                )}
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
