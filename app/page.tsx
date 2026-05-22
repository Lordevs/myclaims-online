import type { Metadata } from "next"
import { getPageBySlug } from "@/lib/strapi/services/page"
import { getGlobal } from "@/lib/strapi/services/global"
import { DynamicZoneRenderer } from "@/components/strapi/dynamic-zone-renderer"
import { getStrapiMedia } from "@/lib/strapi/utils"
import { notFound } from "next/navigation"

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getGlobal().catch(() => null)
  const seo = globalData?.defaultSeo

  return {
    title: seo?.metaTitle || "My Claims Online",
    description: seo?.metaDescription || undefined,
    openGraph: {
      images: seo?.shareImage?.url
        ? [getStrapiMedia(seo.shareImage.url) ?? ""]
        : [],
    },
  }
}

export default async function Page() {
  const page = await getPageBySlug("home").catch(() => null)

  if (page?.blocks?.length) {
    return <DynamicZoneRenderer sections={page.blocks} />
  }

  return notFound()
}
