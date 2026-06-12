import Link from "next/link"
import { StrapiImage } from "@/components/strapi/strapi-image"
import { FadeIn } from "@/components/ui/animations"
import type { BlogEntry } from "@/lib/strapi/types/blog"

interface BlogCardProps {
  post: BlogEntry
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  // Calculate reading time
  let wordCount = 0
  if (post.sections && post.sections.length > 0) {
    post.sections.forEach((block) => {
      if (block.__component === "shared.rich-text" && block.body) {
        wordCount += block.body.split(/\s+/).length
      } else if (block.__component === "shared.quote" && block.quote) {
        wordCount += block.quote.split(/\s+/).length
      } else if (block.__component === "sections.article-cta") {
        if (block.title) wordCount += block.title.split(/\s+/).length
        if (block.description) wordCount += block.description.split(/\s+/).length
      }
    })
  } else if (post.content?.body) {
    wordCount = post.content.body.split(/\s+/).length
  }
  const readingTime = Math.ceil(wordCount / 225) || 1

  return (
    <FadeIn delay={0.05 * (index % 3)}>
      <Link href={`/articles/${post.slug}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-[20px] shadow-[0px_4px_12px_0px_#00000008] transition-all duration-200 hover:shadow-[0px_8px_20px_0px_#00000014] bg-white">
          {/* Cover image */}
          <div className="relative aspect-16/10 w-full overflow-hidden bg-[#F4F8E5]">
            <StrapiImage
              image={post.coverImage}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              fallbackSrc="/contact-form.avif"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              {/* Category tag */}
              <div className="mb-3.5 flex flex-wrap items-center">
                <span className="rounded-[4px] bg-[#F9FAF5] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0D421B]">
                  {post.category?.name || "General"}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-2.5 line-clamp-2 text-base font-extrabold leading-snug text-[#111827] group-hover:text-[#064E3B] transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mb-5 line-clamp-3 text-xs leading-relaxed text-[#4B5563] font-normal">
                {post.excerpt}
              </p>
            </div>

            {/* Footer info */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                {post.author?.avatar ? (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-100">
                    <StrapiImage
                      image={post.author.avatar}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center text-[10px] font-bold text-[#111827]">
                    {post.author?.name ? post.author.name[0] : "C"}
                  </div>
                )}
                <span className="text-xs font-bold text-[#1F2937] line-clamp-1">
                  {post.author?.name || "Claims Specialist"}
                </span>
              </div>

              <span className="text-xs text-[#4B5563] font-normal">
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  )
}
export default BlogCard
