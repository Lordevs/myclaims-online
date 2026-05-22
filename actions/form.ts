"use server"

import { z } from "zod"
import { mutateStrapiData } from "@/lib/strapi/fetch"
import { STRAPI_ENDPOINTS } from "@/lib/strapi/endpoints"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormActionState {
  status: "idle" | "success" | "error" | "validation_error"
  message: string | null
  /** Field-level validation errors keyed by field label */
  fieldErrors?: Record<string, string[]>
}

// ─── Validation schema ────────────────────────────────────────────────────────

const FormSubmissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),
  /** Strapi document ID — passed as a hidden field so we skip the lookup fetch */
  formDocumentId: z.string().min(1, "Form document ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  data: z.record(z.string(), z.unknown()),
})

// ─── Server Action ────────────────────────────────────────────────────────────

/**
 * Submits a Strapi form.
 * Expects `formDocumentId` as a hidden field (set by the form component from
 * the CMS FormEntry), so no extra Strapi lookup is needed at submission time.
 */
export async function submitForm(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  // ── 1. Parse raw FormData into a plain object ──────────────────────────────
  const data: Record<string, unknown> = {}
  let fullName = ""
  let email = ""
  let phone = ""

  // Build a type-lookup map from the companion hidden inputs emitted by form components.
  // Each field renders: <input type="hidden" name={`__type__${fieldLabel}`} value={field.type} />
  // This eliminates the need for fragile label-normalization heuristics.
  const fieldTypes: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("__type__")) {
      fieldTypes[key.slice("__type__".length)] = value.toString()
    }
  }

  for (const [key, value] of formData.entries()) {
    if (
      key === "formId" ||
      key === "formDocumentId" ||
      key.startsWith("$ACTION_") ||
      key.startsWith("__type__")
    ) continue

    const strapiType = fieldTypes[key]

    if (strapiType === "email") {
      email = value.toString()
    } else if (strapiType === "tel") {
      phone = value.toString()
    } else if (strapiType === "text" || strapiType === "textarea" || strapiType === "select") {
      // For non-typed fields or plain text fields, fall back to label normalization
      // to detect the fullName field (there is no dedicated "fullName" Strapi type).
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "")
      if (normalizedKey.includes("fullname") || normalizedKey === "name") {
        fullName = value.toString()
      } else {
        if (data[key] !== undefined) {
          data[key] = Array.isArray(data[key])
            ? [...(data[key] as unknown[]), value]
            : [data[key], value]
        } else {
          data[key] = value
        }
      }
    } else {
      // Fallback for fields without a companion type marker (e.g. quiz answer hidden inputs)
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "")
      if (normalizedKey.includes("fullname") || normalizedKey === "name") {
        fullName = value.toString()
      } else if (normalizedKey.includes("email")) {
        email = value.toString()
      } else if (
        normalizedKey.includes("phone") ||
        normalizedKey.includes("mobile") ||
        normalizedKey.includes("telephone")
      ) {
        phone = value.toString()
      } else {
        if (data[key] !== undefined) {
          data[key] = Array.isArray(data[key])
            ? [...(data[key] as unknown[]), value]
            : [data[key], value]
        } else {
          data[key] = value
        }
      }
    }
  }

  const formId = formData.get("formId") as string
  const formDocumentId = formData.get("formDocumentId") as string

  // ── 2. Validate ────────────────────────────────────────────────────────────
  const parsed = FormSubmissionSchema.safeParse({
    formId,
    formDocumentId,
    fullName,
    email,
    phone,
    data,
  })

  if (!parsed.success) {
    return {
      status: "validation_error",
      message: "Please check your inputs and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    }
  }

  try {
    // ── 3. POST the submission ─────────────────────────────────────────────────
    await mutateStrapiData(STRAPI_ENDPOINTS.FORM_SUBMISSIONS, "POST", {
      data: {
        form: parsed.data.formDocumentId,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
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
