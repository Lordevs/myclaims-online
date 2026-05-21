import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

/**
 * Next.js on-demand cache revalidation endpoint.
 * Accepts secure webhook updates from Strapi v5 to clear cached data.
 *
 * Example payload from Strapi:
 * {
 *   "event": "entry.update",
 *   "createdAt": "2026-05-21T10:00:00.000Z",
 *   "model": "page", // or "api::page.page"
 *   "entry": {
 *     "id": 1,
 *     "title": "Home",
 *     "slug": "home",
 *     ...
 *   }
 * }
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const secret = process.env.REVALIDATION_SECRET

  // If a secret is configured, ensure the request has the correct Authorization header
  if (secret && authHeader !== `Bearer ${secret}`) {
    console.warn("[revalidate] Unauthorized revalidation attempt.")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { model, entry } = body

    if (!model) {
      return NextResponse.json({ message: "Missing model" }, { status: 400 })
    }

    // Standardize model name (Strapi v5 sends both singular uid e.g. "page" or full e.g. "api::page.page")
    const modelName = model.includes("::") ? model.split(".")[1] : model

    const revalidate = revalidateTag as any
    const revalidatedTags: string[] = []

    switch (modelName) {
      case "page":
        revalidate("pages")
        revalidatedTags.push("pages")
        if (entry?.slug) {
          revalidate(`page-${entry.slug}`)
          revalidatedTags.push(`page-${entry.slug}`)
        }
        break

      case "global":
        revalidate("global")
        revalidatedTags.push("global")
        break

      case "form":
        if (entry?.formId) {
          revalidate(`form-${entry.formId}`)
          revalidatedTags.push(`form-${entry.formId}`)
        }
        break

      default:
        // For other collection types, let's also purge "pages" or "global" just in case they're referenced.
        // E.g. FAQs are loaded dynamically, but pages might consume them.
        revalidate("pages")
        revalidatedTags.push("pages (fallback)")
        break
    }

    console.log(`[revalidate] Revalidated tags: ${revalidatedTags.join(", ")} for model: ${modelName}`)

    return NextResponse.json({
      revalidated: true,
      model: modelName,
      tags: revalidatedTags,
    })
  } catch (error: any) {
    console.error("[revalidate] Error processing webhook:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
