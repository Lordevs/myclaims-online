import Link from "next/link"
import { Container } from "../layout/container"
import { StrapiImage } from "@/components/strapi/strapi-image"
import type { BlogEntry } from "@/lib/strapi/types/blog"
import { FadeIn } from "@/components/ui/animations"

interface BlogExploreProps {
  relatedBlogs: BlogEntry[]
}

export function BlogExplore({ relatedBlogs }: BlogExploreProps) {
  if (!relatedBlogs || relatedBlogs.length === 0) return null

  return (
    <section className="border-b-[2.25px] border-[#0F172A] bg-[#F9FAF5] py-16 md:py-20 select-none">
      <Container className="max-w-7xl md:px-0">
        {/* Header containing Title on left and Link on right */}
        <div className="flex flex-row items-center justify-between mb-10 px-4 md:px-0">
          <h2 className="text-2xl font-black tracking-tight text-[#111827] uppercase sm:text-3xl">
            Explore More Articles
          </h2>
          <Link
            href="/articles"
            className="text-xs font-bold text-[#E6405E] hover:text-[#d03350] transition-colors uppercase tracking-wider underline decoration-2 underline-offset-4"
          >
            View all blog posts &rarr;
          </Link>
        </div>

        {/* Grid of 3 related articles */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedBlogs.slice(0, 3).map((post, index) => (
            <FadeIn key={post.id} delay={0.1 * index}>
              <Link href={`/articles/${post.slug}`} className="group block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border-[2.25px] border-[#0F172A] bg-white shadow-[6px_6px_0px_0px_#0F172A] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#0F172A] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0F172A]">
                  {/* Cover image */}
                  <div className="relative aspect-video w-full overflow-hidden border-b-[2.25px] border-[#0F172A] bg-[#F4F8E5]">
                    <StrapiImage
                      image={post.coverImage}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-102"
                      fallbackSrc="/contact-form.avif"
                    />
                  </div>

                  {/* Content details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Meta tag */}
                      <div className="mb-4">
                        <span className="rounded-md bg-[#F4F8E5] px-2.5 py-0.5 text-[10px] font-extrabold text-[#0D421B] uppercase tracking-widest">
                          {post.category?.name || "General"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-2.5 line-clamp-2 text-base leading-snug font-extrabold tracking-tight text-[#111827] group-hover:text-[#064E3B] transition-colors sm:text-lg">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="line-clamp-2 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
                        {post.excerpt || "Read our expert advice on how to navigate this complex legal process..."}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
