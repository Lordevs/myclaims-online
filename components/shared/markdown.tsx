import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MarkdownProps {
  content: string
  className?: string
  variant?: "light" | "dark"
}

const FONT_SIZE_REGEX =
  /(^|\s)(?:[a-z]+:)?text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[\d+(\.\d+)?(px|rem|em|%|vh|vw)\])/

/**
 * Premium, reusable Markdown renderer driven by Tailwind's official @tailwindcss/typography (prose).
 * Simplifies rendering by relying on native utility classes while preserving custom theme accents,
 * font sizes, and Next.js SPA Link mapping for internal routes.
 */
export function Markdown({
  content,
  className,
  variant = "dark",
}: MarkdownProps) {
  const isDark = variant === "dark"

  // Check if the caller provided any custom font-size utility class (including responsive prefixes)
  const hasCustomSize = className ? FONT_SIZE_REGEX.test(className) : false

  return (
    <div
      className={cn(
        "prose max-w-none leading-relaxed font-normal text-inherit",
        !hasCustomSize && "text-sm md:text-base",
        isDark ? "prose-invert" : "",
        isDark
          ? "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white"
          : "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#064E3B]",
        "prose-h1:mt-8 prose-h1:mb-4 prose-h1:text-3xl md:prose-h1:text-4xl",
        "prose-h2:mt-7 prose-h2:mb-3.5 prose-h2:text-2xl md:prose-h2:text-3xl",
        "prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-xl md:prose-h3:text-2xl",
        "prose-h4:mt-5 prose-h4:mb-2 prose-h4:text-lg",
        "prose-p:mb-4 prose-p:leading-relaxed prose-p:text-inherit last:prose-p:mb-0",
        "prose-ul:mb-4 prose-ul:list-disc prose-ul:space-y-2 prose-ul:pl-6",
        "prose-ol:mb-4 prose-ol:list-decimal prose-ol:space-y-2 prose-ol:pl-6",
        "prose-li:pl-0.5 prose-li:text-inherit",
        isDark
          ? "prose-a:font-semibold prose-a:text-[#A3E635] prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors prose-a:duration-150 hover:prose-a:text-[#A3E635]/80"
          : "prose-a:font-semibold prose-a:text-[#E6405E] prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors prose-a:duration-150 hover:prose-a:text-[#E6405E]/80",
        isDark
          ? "prose-blockquote:my-5 prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-[#A3E635] prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:pl-4 prose-blockquote:text-white/80 prose-blockquote:italic prose-blockquote:not-italic"
          : "prose-blockquote:my-5 prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-[#E6405E] prose-blockquote:bg-black/5 prose-blockquote:py-2 prose-blockquote:pl-4 prose-blockquote:text-gray-800 prose-blockquote:italic prose-blockquote:not-italic",
        isDark
          ? "prose-code:rounded-md prose-code:border prose-code:border-white/5 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[13px] prose-code:text-white prose-code:before:content-none prose-code:after:content-none"
          : "prose-code:rounded-md prose-code:border prose-code:border-black/5 prose-code:bg-black/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[13px] prose-code:text-gray-900 prose-code:before:content-none prose-code:after:content-none",
        isDark
          ? "prose-pre:my-5 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-white/5 prose-pre:p-4 prose-pre:font-mono prose-pre:text-sm"
          : "prose-pre:my-5 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-black/10 prose-pre:bg-black/5 prose-pre:p-4 prose-pre:font-mono prose-pre:text-sm",
        isDark
          ? "prose-hr:my-7 prose-hr:border-t prose-hr:border-white/10"
          : "prose-hr:my-7 prose-hr:border-t prose-hr:border-black/10",
        isDark
          ? "prose-strong:font-bold prose-strong:text-white"
          : "prose-strong:font-bold prose-strong:text-gray-900",
        isDark
          ? "prose-em:text-white/90 prose-em:italic"
          : "prose-em:text-gray-800 prose-em:italic",
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
                <Link href={href || "#"} className={linkClassName} {...props}>
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
