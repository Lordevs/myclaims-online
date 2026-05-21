"use server"

import { z } from "zod"
import { mutateStrapiData } from "@/lib/strapi/fetch"
import type { FormEntry } from "@/lib/strapi/types/collections"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormActionState {
  status: "idle" | "success" | "error" | "validation_error"
  message: string | null
  /** Field-level validation errors keyed by field label */
  fieldErrors?: Record<string, string[]>
}

// ─── Validation schema ────────────────────────────────────────────────────────

/**
 * Base schema for all form submissions.
 * The `formId` field ties the submission to a specific Strapi form entry.
 * All other fields are dynamic — we validate presence but not shape here
 * (Strapi stores them as a JSON blob).
 */
const FormSubmissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),
  data: z.record(z.string(), z.unknown()),
})

// ─── Server Action ────────────────────────────────────────────────────────────

/**
 * Submits a Strapi form.
 *
 * Called from client components via useActionState:
 *   const [state, action, isPending] = useActionState(submitForm, initialState)
 *
 * Flow:
 *   1. Validate formId + data shape with Zod
 *   2. Look up the Strapi form entry by formId to get its documentId
 *   3. POST a form-submission entry to Strapi
 *   4. Return success/error state to the client
 */
export async function submitForm(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  // ── 1. Parse raw FormData into a plain object ──────────────────────────────
  const raw: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    if (key === "formId") continue
    // Handle multiple values for the same key (e.g. checkboxes)
    if (raw[key] !== undefined) {
      raw[key] = Array.isArray(raw[key])
        ? [...(raw[key] as unknown[]), value]
        : [raw[key], value]
    } else {
      raw[key] = value
    }
  }

  const formId = formData.get("formId")

  // ── 2. Validate ────────────────────────────────────────────────────────────
  const parsed = FormSubmissionSchema.safeParse({ formId, data: raw })

  if (!parsed.success) {
    return {
      status: "validation_error",
      message: "Please check your inputs and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  try {
    // ── 3. Find the form in Strapi by formId ──────────────────────────────────
    const { fetchStrapi } = await import("@/lib/strapi/fetch")
    const formsRes = await fetchStrapi<{ data: FormEntry[] }>("/api/forms", {
      params: {
        filters: { formId: { $eq: parsed.data.formId } },
        fields: ["id", "documentId", "formId"],
      },
      nextOptions: { cache: "no-store" } as RequestInit,
    })

    const form = formsRes.data?.[0]
    if (!form) {
      return {
        status: "error",
        message: "Form not found. Please refresh and try again.",
      }
    }

    // ── 4. POST the submission ─────────────────────────────────────────────────
    await mutateStrapiData("/api/form-submissions", "POST", {
      data: {
        form: form.documentId,
        data: parsed.data.data,
      },
    })

    return {
      status: "success",
      message: "Your submission has been received. We'll be in touch shortly.",
    }
  } catch (err) {
    console.error("[submitForm]", err)
    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    }
  }
}
