import Link from "next/link"
import { StrapiImage } from "@/components/strapi/strapi-image"
import { Button } from "@/components/ui/button"
import type { BlogEntry } from "@/lib/strapi/types/blog"

interface BlogSidebarProps {
  relatedBlogs: BlogEntry[]
}

export function BlogSidebar({ relatedBlogs }: BlogSidebarProps) {
  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-8">
      {/* CARD 1: Free Claim Check */}
      <div className="rounded-[16px] border-2 border-[#0F172A] bg-[#FBFBF8] shadow-[4px_4px_0px_0px_#1A1C19] overflow-hidden flex flex-col">
        <div className="bg-[#064E3B] py-5 px-6 text-center">
          <h3 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">
            Free Claim Check
          </h3>
        </div>
        <div className="p-6 text-center flex flex-col items-center">
          <Button
            asChild
            className="w-full py-6 rounded-xl bg-[#E6405E] hover:bg-[#d03350]! text-white font-extrabold text-base transition-transform duration-150 active:scale-[0.98] active:translate-x-px active:translate-y-1px"
          >
            <Link href="/start-my-claim">
              Get My Assessment
            </Link>
          </Button>
          <span className="text-xs text-[#4B5563] mt-4 font-normal">
            Instant approval for most non-fault claims.
          </span>
        </div>
      </div>

      {/* CARD 2: Related Articles */}
      <div className="rounded-[24px]  bg-white p-6 border border-[#E5E7EB] flex flex-col gap-6">
        <h3 className="text-xl font-black text-[#0F172A]">
          Related Articles
        </h3>
        <div className="flex flex-col gap-6">
          {relatedBlogs.map((post) => (
            <Link
              key={post.id}
              href={`/articles/${post.slug}`}
              className="group flex items-center gap-4 text-left"
            >
              {/* Cover image thumbnail */}
              <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-100 bg-[#F4F8E5] shrink-0">
                <StrapiImage
                  image={post.coverImage}
                  fill
                  sizes="64px"
                  className="object-cover"
                  fallbackSrc="/contact-form.avif"
                />
              </div>
              <h4 className="text-sm font-bold leading-snug text-[#0F172A] group-hover:text-[#064E3B] transition-colors line-clamp-2">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* CARD 3: Why Choose ClaimIt */}
      <div className="rounded-[24px] bg-[#0D421B] p-8 text-white flex flex-col gap-6">
        <h3 className="md:text-2xl text-xl font-extrabold text-left">
          Why Choose ClaimIt
        </h3>
        <div className="flex flex-col gap-6 text-left">
          <div>
            <div className="text-3xl font-black text-[#A3E635]">98%</div>
            <div className="text-xs text-white mt-0.5">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#A3E635]">2.5k+</div>
            <div className="text-xs text-white mt-0.5">Claims Settled</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#A3E635]">£15M+</div>
            <div className="text-xs text-white mt-0.5">Recovered for Clients</div>
          </div>
        </div>
      </div>
    </div>
  )
}
