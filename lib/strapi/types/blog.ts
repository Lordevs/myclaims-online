import type { StrapiMediaComponent } from "./media"
import type { LinkComponent } from "./shared"

export type ArticleBodyBlock =
  | { __component: "shared.rich-text"; id: number; body: string }
  | { __component: "shared.quote"; id: number; quote: string }
  | {
      __component: "sections.article-cta"
      id: number
      title: string
      description: string | null
      link: LinkComponent | null
    }

/**
 * Types representing a Blog post / Article in the Strapi CMS.
 */
export interface BlogEntry {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content?: { body: string } | null
  sections?: ArticleBodyBlock[] | null
  tags?: { id: number; name: string }[] | null
  coverImage: StrapiMediaComponent | null
  author: { name: string; avatar?: StrapiMediaComponent } | null
  category: { name: string } | null
  isFeatured?: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}
