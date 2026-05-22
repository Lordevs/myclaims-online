import type { MetadataRoute } from "next"
import { getAllPages } from "@/lib/strapi/services/page"

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://myclaimsonline.co.uk"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages().catch(() => [])

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug !== "home")
    .map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...pageRoutes,
  ]
}
