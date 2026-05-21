"use client"

import React, { useActionState, useEffect } from "react"
import { LockKeyhole, Clock, ShieldCheck, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitForm } from "@/actions/form"
import type { FormEntry } from "@/lib/strapi/types/collections"
import { StrapiIcon } from "@/components/strapi/strapi-icon"

export interface DetailedEnquiryFormProps {
  /** Custom submit handler */
  onSubmit?: (data: Record<string, string>) => void
  /** Additional styling class */
  className?: string
  /** The fully populated Form entry from CMS */
  form?: FormEntry | null
}

/**
 * High-fidelity, neobrutalist DetailedEnquiryForm Component.
 * Extracted standalone form card:
 * - Card background: #FFFFFF
 * - Border: 2.25px solid #0F172A
 * - Card Box Shadow: 4.5px 4.5px 0px 0px #1A1C19
 * - Input borders: 2.25px solid #0F172A
 * - Submit button: #E94E6B with offset shadow
 * - Bottom security footer: bg-[#F1F5F9] with text/icons in #594143
 * - Dynamic: Renders form fields purely from backend CMS configuration
 */
export function DetailedEnquiryForm({
  onSubmit,
  className,
  form,
}: DetailedEnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitForm, {
    status: "idle",
    message: null,
  })

  const [formData, setFormData] = React.useState<Record<string, string>>({})

  // Trigger optional callback on success
  useEffect(() => {
    if (state.status === "success") {
      if (onSubmit) {
        onSubmit(formData)
      }
      setFormData({})
    }
  }, [state.status, onSubmit])

  // Flat list of all fields across all steps
  const cmsFields = form?.steps?.flatMap((step) => step.fields || []) || []

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-[24px] bg-white text-left",
          "border-[2.25px] border-[#0F172A]",
          "shadow-[4.5px_4.5px_0px_0px_#1A1C19]",
          className
        )}
      >
        <div className="flex flex-col items-center py-12 px-6 text-center select-none">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full border-[2.25px] border-[#0F172A] bg-[#10B981] text-white shadow-[3px_3px_0px_0px_#1A1C19]">
            <ShieldCheck className="size-10" />
          </div>
          <h3 className="mb-4 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Enquiry Sent!
          </h3>
          <p className="mb-4 max-w-md text-sm leading-relaxed font-bold text-[#594143] sm:text-base">
            {form?.successMessage || state.message || "Thank you! Your detailed claims enquiry has been received. We will contact you shortly."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[24px] bg-white text-left",
        "border-[2.25px] border-[#0F172A]",
        "shadow-[4.5px_4.5px_0px_0px_#1A1C19]",
        className
      )}
    >
      <input type="hidden" name="formId" value={form?.formId || "detail-enquiry-form"} />

      {/* Form Inputs Content Padding */}
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        {/* Global Error Banner */}
        {state.status === "error" && state.message && (
          <div className="flex items-start gap-2.5 rounded-xl border-[2.25px] border-[#0F172A] bg-[#AF2144]/10 p-4 text-sm font-bold text-[#AF2144]">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#AF2144]" />
            <span>{state.message}</span>
          </div>
        )}

        {/* Input Stack */}
        <div className="flex flex-col gap-4 text-left">
          {cmsFields.map((field) => {
            const fieldKey = field.label || `field_${field.id}`
            const fieldId = `detail-${field.id}`
            return (
              <div key={field.id} className="flex flex-col">
                <Label
                  htmlFor={fieldId}
                  className="mb-2 text-sm leading-none font-bold text-[#0F172A]"
                >
                  {field.label || ""}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    required={field.required !== false}
                    id={fieldId}
                    name={fieldKey}
                    placeholder={field.label || ""}
                    value={formData[fieldKey] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [fieldKey]: e.target.value,
                      }))
                    }
                    rows={4}
                    className={cn(
                      "min-h-[100px] w-full rounded-lg px-4 py-3 text-sm text-[#0F172A] transition-colors outline-none placeholder:text-[#888888]",
                      "border-[2.25px] border-[#0F172A] bg-white focus-visible:border-[#E94E6B] focus-visible:ring-0"
                    )}
                  />
                ) : field.type === "select" ? (
                  <div className="relative w-full">
                    <input
                      type="hidden"
                      name={fieldKey}
                      value={formData[fieldKey] || ""}
                    />
                    <Select
                      required={field.required !== false}
                      value={formData[fieldKey] || undefined}
                      onValueChange={(val) =>
                        setFormData((prev) => ({
                          ...prev,
                          [fieldKey]: val,
                        }))
                      }
                    >
                      <SelectTrigger
                        id={fieldId}
                        className={cn(
                          "!h-auto w-full cursor-pointer appearance-none rounded-lg px-4 py-3 text-sm text-[#0F172A] outline-hidden transition-all bg-white",
                          "!focus-visible:ring-0 border-[2.25px] border-[#0F172A] font-bold focus:border-[#E94E6B] focus:bg-white focus-visible:border-[#E94E6B] data-[placeholder]:font-medium data-[placeholder]:text-[#888888] data-[state=open]:border-[#E94E6B]"
                        )}
                      >
                        <SelectValue placeholder={`Select ${field.label || "Option"}`} />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="rounded-lg border-[2.25px] border-[#0F172A] bg-white/95 font-bold text-[#0F172A] shadow-xl backdrop-blur-md"
                      >
                        {field.selectOptions?.map((opt) => (
                          <SelectItem
                            key={opt.id}
                            value={opt.text}
                            className="cursor-pointer py-2 font-bold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                          >
                            {opt.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <Input
                    required={field.required !== false}
                    id={fieldId}
                    type={field.type}
                    name={fieldKey}
                    placeholder={field.label || ""}
                    value={formData[fieldKey] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [fieldKey]: e.target.value,
                      }))
                    }
                    className={cn(
                      "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#0F172A] transition-colors outline-none placeholder:text-[#888888]",
                      "border-[2.25px] border-[#0F172A] bg-white focus-visible:border-[#E94E6B] focus-visible:ring-0"
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Neobrutalist Pink Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-[16px] font-extrabold tracking-wide text-white transition-all duration-150 select-none active:scale-[0.98] sm:py-4 sm:text-[17px]",
            "bg-[#E94E6B] text-white hover:bg-[#d0425c]!",
            "mt-2 shadow-[4.5px_4.5px_0px_0px_#1A1C19] disabled:opacity-50"
          )}
        >
          <span>{isPending ? "Submitting..." : (form?.submitButtonText || "Submit Enquiry")}</span>
        </Button>
      </div>

      {/* Footer Security Badges Block inside the card */}
      <div
        className={cn(
          "flex w-full flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 text-[#594143] md:gap-x-6",
          "rounded-b-[21px]"
        )}
      >
        <Separator className="mb-4 bg-[#E2E2E2]" />
        {form?.footerItems && form.footerItems.length > 0 ? (
          form.footerItems.map((item) => (
            <div key={item.id} className="flex items-center gap-1.5">
              {item.icon ? (
                <StrapiIcon icon={item.icon} size={16} className="shrink-0 text-[#594143]" />
              ) : (
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#594143]" />
              )}
              <span className="text-base leading-none font-bold tracking-tight">
                {item.text}
              </span>
            </div>
          ))
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <LockKeyhole className="h-4 w-4 shrink-0 text-[#594143]" />
              <span className="text-base leading-none font-bold tracking-tight">
                No obligation
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 shrink-0 text-[#594143]" />
              <span className="text-base leading-none font-bold tracking-tight">
                Free consultation
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#594143]" />
              <span className="text-base leading-none font-bold tracking-tight">
                Data secure & never shared
              </span>
            </div>
          </>
        )}
      </div>
    </form>
  )
}

export default DetailedEnquiryForm
