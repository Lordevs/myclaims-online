import { getPageBySlug, getAllPages } from "@/lib/strapi/services/page"
import { getGlobal } from "@/lib/strapi/services/global"
import { DynamicZoneRenderer } from "@/components/strapi/dynamic-zone-renderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStrapiMedia } from "@/lib/strapi/utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Don't duplicate the home page route under /home
  if (slug === "home") {
    return { title: "My Claims Online" }
  }

  const [page, globalData] = await Promise.all([
    getPageBySlug(slug).catch(() => null),
    getGlobal().catch(() => null),
  ])

  if (!page) return { title: "Page Not Found" }

  // Cascade: per-page seo → global defaultSeo → static fallback
  const seo = page.seo
  const globalSeo = globalData?.defaultSeo
  const title = seo?.metaTitle ?? page.title
  const description =
    seo?.metaDescription ?? globalSeo?.metaDescription ?? undefined

  const ogImage = seo?.shareImage?.url
    ? getStrapiMedia(seo.shareImage.url)
    : globalSeo?.shareImage?.url
      ? getStrapiMedia(globalSeo.shareImage.url)
      : null

  return {
    title,
    description,
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
  }
}

// Generate static params for ISR/SSG
export async function generateStaticParams() {
  const pages = await getAllPages()
  // Filter out the home page as it is already handled by the root page.tsx
  return pages
    .filter((page) => page.slug !== "home")
    .map((page) => ({
      slug: page.slug,
    }))
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const currentPage = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) : 1

  // Redirect or not found if accessing /home explicitly, or just render it
  if (slug === "home") {
    notFound()
  }

  const page = await getPageBySlug(slug).catch(() => null)
  if (!page) {
    notFound()
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAF5]">
      <DynamicZoneRenderer sections={page.blocks} currentPage={currentPage} />
    </div>
  )
}
