import { getPageBySlug, getAllPages } from "@/lib/strapi/services/page"
import { DynamicZoneRenderer } from "@/components/strapi/dynamic-zone-renderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Don't duplicate the home page route under /home
  if (slug === "home") {
    return {
      title: "My Claims Online",
    }
  }

  const page = await getPageBySlug(slug).catch(() => null)
  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: `${page.title} | My Claims Online`,
    description: `Learn more about ${page.title} with My Claims Online. We handle your claims and vehicle replacement fast.`,
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params

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
      <DynamicZoneRenderer sections={page.blocks} />
    </div>
  )
}
