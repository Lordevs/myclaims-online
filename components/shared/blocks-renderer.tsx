import React from "react"
import { cn } from "@/lib/utils"
import type { StrapiBlockContent, StrapiBlockNode } from "@/lib/strapi/types/collections"

interface BlocksRendererProps {
  content: StrapiBlockContent
  className?: string
}

/**
 * Renders Strapi Blocks rich-text content.
 *
 * Supports: paragraph, heading (h1-h6), list (ordered/unordered), quote, code.
 * Inline marks: bold, italic, underline, strikethrough, code.
 *
 * Usage:
 *   <BlocksRenderer content={footer.companyDetails} className="text-sm text-white/80" />
 */
export function BlocksRenderer({ content, className }: BlocksRendererProps) {
  if (!content?.length) return null

  return (
    <div className={cn("space-y-2", className)}>
      {content.map((node, i) => (
        <BlockNode key={i} node={node} />
      ))}
    </div>
  )
}

function BlockNode({ node }: { node: StrapiBlockNode }) {
  const children = node.children?.map((child, i) => {
    // Leaf text node
    if ("text" in child) {
      let el: React.ReactNode = child.text
      if (child.bold) el = <strong key={i}>{el}</strong>
      if (child.italic) el = <em key={i}>{el}</em>
      if (child.underline) el = <u key={i}>{el}</u>
      if (child.strikethrough) el = <s key={i}>{el}</s>
      if (child.code) el = <code key={i} className="rounded bg-white/10 px-1 font-mono text-xs">{el}</code>
      return <span key={i}>{el}</span>
    }
    // Nested block node
    return <BlockNode key={i} node={child as StrapiBlockNode} />
  })

  switch (node.type) {
    case "paragraph":
      return <p className="m-0">{children}</p>
    case "heading": {
      const level = node.level ?? 2
      const Tag = `h${level}` as keyof React.JSX.IntrinsicElements
      return React.createElement(Tag, null, children)
    }
    case "list":
      if (node.format === "ordered") {
        return <ol className="list-decimal pl-5">{children}</ol>
      }
      return <ul className="list-disc pl-5">{children}</ul>
    case "list-item":
      return <li>{children}</li>
    case "quote":
      return (
        <blockquote className="border-l-2 border-white/20 pl-3 italic text-white/60">
          {children}
        </blockquote>
      )
    case "code":
      return (
        <pre className="overflow-x-auto rounded bg-white/10 p-3 font-mono text-xs">
          <code>{children}</code>
        </pre>
      )
    default:
      return <p className="m-0">{children}</p>
  }
}
