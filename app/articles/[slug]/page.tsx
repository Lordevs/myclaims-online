import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { StrapiImage } from "@/components/strapi/strapi-image"
import { getBlogBySlug, getBlogs } from "@/lib/strapi/services/blog"
import { getPageBySlug } from "@/lib/strapi/services/page"
import { getStrapiMedia } from "@/lib/strapi/utils"
import { BlogSidebar } from "@/components/sections/blog-sidebar"
import { BlogExplore } from "@/components/sections/blog-explore"
import { DynamicZoneRenderer } from "@/components/strapi/dynamic-zone-renderer"
import { ArticleZoneRenderer } from "@/components/strapi/article-zone-renderer"

export const revalidate = 3600 

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return { title: "Article Not Found" }
  }

  const title = `${blog.title} | Claims Advice`
  const description = blog.excerpt || undefined
  const coverImageUrl = blog.coverImage?.file?.url
    ? getStrapiMedia(blog.coverImage.file.url)
    : null

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: blog.author?.name ? [blog.author.name] : [],
      ...(coverImageUrl && {
        images: [
          { url: coverImageUrl, width: 1200, height: 630, alt: blog.title },
        ],
      }),
    },
  }
}

// Generate static params for all dynamic articles (SSG)
export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const [allBlogs, articlesPage] = await Promise.all([
    getBlogs(),
    getPageBySlug("articles").catch(() => null),
  ])

  // Filter out the current article and list up to 3 related ones
  const relatedBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 3)

  const formattedDate = new Date(
    blog.publishedAt || blog.createdAt
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  let wordCount = 0
  if (blog.sections && blog.sections.length > 0) {
    blog.sections.forEach((block) => {
      if (block.__component === "shared.rich-text" && block.body) {
        wordCount += block.body.split(/\s+/).length
      } else if (block.__component === "shared.quote" && block.quote) {
        wordCount += block.quote.split(/\s+/).length
      } else if (block.__component === "sections.article-cta") {
        if (block.title) wordCount += block.title.split(/\s+/).length
        if (block.description) wordCount += block.description.split(/\s+/).length
      }
    })
  } else if (blog.content?.body) {
    wordCount = blog.content.body.split(/\s+/).length
  }
  const readingTime = Math.ceil(wordCount / 225) || 1

  return (
    <div className="min-h-screen bg-white select-none">
      {/* FULL WIDTH HERO SECTION */}
      <section className="bg-[#F4F8E5] py-16">
        <Container className="max-w-7xl">
          {/* Category Tag */}
          <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-[#A3E635] text-[#023F1E] mb-6">
            {blog.category?.name || "Expert Advice"}
          </span>

          {/* Title */}
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-[#064E3B] sm:text-4xl md:text-5xl lg:text-[54px] max-w-5xl mb-8">
            {blog.title}
          </h1>

          {/* Author & Meta Row */}
          <div className="flex items-center gap-3.5 mb-10">
            {blog.author?.avatar ? (
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#0F172A] bg-white">
                <StrapiImage
                  image={blog.author.avatar}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0F172A] bg-[#A3E635] text-sm font-black text-[#023F1E]">
                {blog.author?.name ? blog.author.name[0] : "C"}
              </div>
            )}
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-[#111827]">
                {blog.author?.name || "Claims Specialist"}
              </span>
              <span className="text-xs font-nomal text-[#4B5563]">
                Claims Specialist • {formattedDate} • {readingTime} min read
              </span>
            </div>
          </div>

          {/* Clean Rounded Cover Image */}
          <div className="relative aspect-video md:aspect-21/9 w-full overflow-hidden rounded-t-[24px]">
            <StrapiImage
              image={blog.coverImage}
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
              fallbackSrc="/contact-form.avif"
            />
          </div>
        </Container>
      </section>

      {/* Main Grid Content Layout */}
      <Container className="my-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">

          {/* LEFT COLUMN: Main Blog Post Content (Width: 8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <FadeIn delay={0.1}>
              {/* Article Content Card */}
              <div className="flex flex-col gap-8">
                <ArticleZoneRenderer
                  blocks={blog.sections}
                  fallbackContent={blog.content?.body}
                />

                {/* Bottom Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="border-t border-[#E2E8F0] pt-6 flex items-center gap-3">
                    <span className="text-sm font-black text-[#0F172A]">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#F9FAF5] border border-[#E5E7EB] text-[#4B5563]"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Spotlights (Width: 4 columns) */}
          <div className="lg:col-span-4">
            <FadeIn delay={0.2}>
              <BlogSidebar relatedBlogs={relatedBlogs} />
            </FadeIn>
          </div>

        </div>
      </Container>

      {/* Explore More Articles */}
      <BlogExplore relatedBlogs={relatedBlogs} />

    </div>
  )
}
