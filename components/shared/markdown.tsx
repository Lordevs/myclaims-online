import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MarkdownProps {
  content: string
  className?: string
}

/**
 * Premium, reusable Markdown renderer driven by Tailwind's official @tailwindcss/typography (prose).
 * Simplifies rendering by relying on native utility classes while preserving custom theme accents,
 * font sizes, and Next.js SPA Link mapping for internal routes.
 */
export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none text-inherit leading-relaxed font-normal text-sm md:text-base",
        "prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4",
        "prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-7 prose-h2:mb-3.5",
        "prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3",
        "prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2",
        "prose-p:mb-4 last:prose-p:mb-0 prose-p:text-inherit prose-p:leading-relaxed",
        "prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ul:space-y-2",
        "prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-ol:space-y-2",
        "prose-li:text-inherit prose-li:pl-0.5",
        "prose-a:text-[#A3E635] hover:prose-a:text-[#A3E635]/80 prose-a:underline prose-a:underline-offset-4 prose-a:font-semibold prose-a:transition-colors prose-a:duration-150",
        "prose-blockquote:border-l-4 prose-blockquote:border-[#A3E635] prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-5 prose-blockquote:italic prose-blockquote:text-white/80 prose-blockquote:bg-white/5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic",
        "prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[13px] prose-code:text-white prose-code:border prose-code:border-white/5 prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-white/5 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono prose-pre:text-sm prose-pre:overflow-x-auto prose-pre:border prose-pre:border-white/10 prose-pre:my-5",
        "prose-hr:border-t prose-hr:border-white/10 prose-hr:my-7",
        "prose-strong:font-bold prose-strong:text-white",
        "prose-em:italic prose-em:text-white/90",
        className
      )}
    >
      <ReactMarkdown
        components={{
          // Bind internal links to client-side prefetching while keeping external anchors opening in new tabs
          a: ({ href, className: linkClassName, children, ...props }) => {
            const isInternal = href?.startsWith("/") || href?.startsWith("#")
            if (isInternal) {
              return (
                <Link
                  href={href || "#"}
                  className={linkClassName}
                  {...props}
                >
                  {children}
                </Link>
              )
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("inline-flex items-center", linkClassName)}
                {...props}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
