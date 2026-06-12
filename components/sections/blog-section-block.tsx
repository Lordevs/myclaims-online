import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getBlogsPaginated } from "@/lib/strapi/services/blog"
import { Container } from "@/components/layout/container"
import { BlogCard } from "./blog-card"
import { StrapiImage } from "@/components/strapi/strapi-image"
import { cn } from "@/lib/utils"

interface BlogSectionBlockProps {
  title: string
  currentPage?: number
}

export async function BlogSectionBlock({ title, currentPage = 1 }: BlogSectionBlockProps) {
  // Fetch the absolute latest blog as the featured post (1 item)
  const featuredRes = await getBlogsPaginated(1, 1)
  const featuredPost = featuredRes.data[0] || null

  // Fetch the paginated grid blogs, excluding the featured post
  const { data: latest, pagination } = await getBlogsPaginated(
    currentPage,
    1,
    featuredPost?.id
  )

  const totalPages = pagination?.pageCount || 1
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  // Format date helper
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Generate pagination page numbers matching: < 1 2 3 ... 12 >
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const range = 1 // show current page, plus 1 before and 1 after

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...")
      }
    }
    return pages
  }

  return (
    <section className="bg-[#F9FAF5] py-12 md:py-16">
      <Container className="max-w-7xl px-4 md:px-6">

        {/* 1. FEATURED ARTICLE (Hero Card - Displayed on all pages) */}
        {featuredPost && (
          <div className="mb-16 bg-white overflow-hidden shadow-[0px_4px_12px_0px_#00000008] hover:shadow-[0px_8px_20px_0px_#00000014] transition-shadow">
            <Link href={`/articles/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[400px]">
              {/* Left Column: Image */}
              <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full bg-[#EAF5EE]">
                <StrapiImage
                  image={featuredPost.coverImage}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  fallbackSrc="/contact-form.avif"
                />
              </div>

              {/* Right Column: Content */}
              <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between text-left">
                <div className="flex flex-col">
                  {/* Badge */}
                  <span className="self-start inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-[#EAF5EE] text-[#0D421B] mb-6">
                    {featuredPost.category?.name}
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#0D421B] leading-tight mb-4 group-hover:text-[#064E3B] transition-colors">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-8 font-normal line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Footer block */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6">
                  {/* Author Row */}
                  <div className="flex items-center gap-3">
                    {featuredPost.author?.avatar ? (
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-100">
                        <StrapiImage
                          image={featuredPost.author.avatar}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A3E635] text-xs font-black text-[#023F1E]">
                        {featuredPost.author?.name ? featuredPost.author.name[0] : "C"}
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#111827]">
                        {featuredPost.author?.name || "Claims Specialist"}
                      </span>
                      <span className="text-[10px] text-[#4B5563]">
                        {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <span className="inline-block px-5 py-2.5 rounded-full bg-[#0D421B] text-white font-extrabold text-xs transition-colors hover:bg-[#064E3B]">
                    Read Article
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 2. LATEST ARTICLES TITLE & DESCRIPTION */}
        <div className="text-left mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#0D421B] mb-2">
            {title || "Latest Articles"}
          </h2>
          <p className="text-sm md:text-base text-[#4B5563] max-w-3xl">
            Browse our latest expert guides covering all aspects of personal injury law and legal rights.
          </p>
        </div>

        {/* 3. ARTICLES GRID */}
        {latest.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* 4. MODERN PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                {/* Prev Button */}
                <Link
                  href={hasPrev ? `?page=${currentPage - 1}` : "#"}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-gray-700 transition-all",
                    hasPrev
                      ? "hover:bg-gray-50 hover:border-gray-300"
                      : "cursor-not-allowed opacity-30 pointer-events-none"
                  )}
                  aria-disabled={!hasPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>

                {/* Number Buttons */}
                {getPageNumbers().map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="flex h-9 w-9 items-center justify-center text-sm text-gray-400 select-none"
                      >
                        ...
                      </span>
                    )
                  }

                  const isCurrent = page === currentPage
                  return (
                    <Link
                      key={`page-${page}`}
                      href={`?page=${page}`}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-[8px] text-sm font-semibold transition-all",
                        isCurrent
                          ? "bg-[#0D421B] text-white border border-[#0D421B]"
                          : "border border-[#E5E7EB] bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                      )}
                    >
                      {page}
                    </Link>
                  )
                })}

                {/* Next Button */}
                <Link
                  href={hasNext ? `?page=${currentPage + 1}` : "#"}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-gray-700 transition-all",
                    hasNext
                      ? "hover:bg-gray-50 hover:border-gray-300"
                      : "cursor-not-allowed opacity-30 pointer-events-none"
                  )}
                  aria-disabled={!hasNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 rounded-[24px] border border-dashed border-gray-300 bg-white">
            <p className="text-sm font-bold text-[#888888]">No articles found.</p>
          </div>
        )}
      </Container>
    </section>
  )
}
export default BlogSectionBlock
