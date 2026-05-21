import { getPageBySlug } from "@/lib/strapi/services/page"
import { DynamicZoneRenderer } from "@/components/strapi/dynamic-zone-renderer"
import { notFound } from "next/navigation"

export default async function Page() {
  const page = await getPageBySlug("home").catch(() => null)

  if (page?.blocks?.length) {
    return <DynamicZoneRenderer sections={page.blocks} />
  }

  return notFound()
}
