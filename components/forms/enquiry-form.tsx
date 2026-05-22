"use client"

import React, { useActionState, useEffect } from "react"
import { ShieldCheck, Play, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { submitForm } from "@/actions/form"
import type { FormEntry } from "@/lib/strapi/types/collections"
import { StrapiIcon } from "@/components/strapi/strapi-icon"

export interface EnquiryFormProps {
  /** Optional form submission handler */
  onSubmit?: (data: Record<string, string>) => void
  /** Custom heading inside the form card */
  title?: string
  /** Custom subtitle under the heading */
  subtitle?: string
  /** Optional additional styling classes */
  className?: string
  /** The fully populated Form entry from CMS */
  form?: FormEntry | null
}

/**
 * Reusable, high-fidelity EnquiryForm Component.
 * Implements a modern, clean form card:
 * - Pure white background (#FFFFFF) with solid border (1.2px solid #E2E2E2)
 * - Premium ambient box shadow (0px 4.8px 36.02px 0px #00000017)
 * - Input elements styled in #E2E2E2 with high contrast
 * - High-converting red-pink action button (#E6405E)
 * - Lock/Shield security warning footer in #888888
 * - Under-form "Google Reviews" trust rating prompt
 */
export function EnquiryForm({
  onSubmit,
  title = "Start Your Claim Now",
  subtitle = "Enter your details and our team will contact you quickly to discuss your claim.",
  className,
  form,
}: EnquiryFormProps) {
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
      // Defer reset to avoid calling setState synchronously inside an effect
      Promise.resolve().then(() => setFormData({}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, onSubmit])

  // Flat list of all fields across all steps
  const cmsFields = form?.steps?.flatMap((step) => step.fields || []) || []

  return (
    <div
      className={cn("flex w-full flex-col items-center select-none", className)}
    >
      {state.status === "success" ? (
        <div
          className={cn(
            "flex w-full flex-col rounded-2xl bg-white p-6 text-center md:p-8",
            "border-[1.2px] border-[#E2E2E2]",
            "shadow-[0px_4.8px_36.02px_0px_rgba(0,0,0,0.09)]"
          )}
        >
          <div className="flex flex-col items-center py-10 text-center select-none">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full border-2 border-[#10B981] bg-[#10B981]/10 text-[#10B981]">
              <ShieldCheck className="size-8" />
            </div>
            <h2 className="mb-2 text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
              Thank You!
            </h2>
            <p className="max-w-xs text-xs leading-relaxed font-semibold text-[#888888] sm:text-sm">
              {form?.successMessage ||
                state.message ||
                "Your enquiry has been received. Our team will contact you shortly."}
            </p>
          </div>
        </div>
      ) : (
        /* White Form Box */
        <form
          action={formAction}
          className={cn(
            "flex w-full flex-col rounded-2xl bg-white p-6 text-center md:p-8",
            "border-[1.2px] border-[#E2E2E2]",
            "shadow-[0px_4.8px_36.02px_0px_rgba(0,0,0,0.09)]"
          )}
        >
          <input
            type="hidden"
            name="formId"
            value={form?.formId || "contact-form"}
          />
          <input
            type="hidden"
            name="formDocumentId"
            value={form?.documentId || ""}
          />

          {/* Form Title & Subtitle */}
          <h2 className="mb-2 text-lg font-bold tracking-tight text-[#111111] sm:text-xl md:text-[22px]">
            {title}
          </h2>
          <p className="mb-6 px-1 text-xs leading-relaxed font-normal text-[#888888] sm:text-sm">
            {subtitle}
          </p>

          {/* Global Error Banner */}
          {state.status === "error" && state.message && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-[#AF2144]/20 bg-[#AF2144]/10 p-3 text-left text-xs font-semibold text-[#AF2144]">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-[#AF2144]" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Input stack */}
          <div className="mb-5 flex flex-col gap-3.5 text-left">
            {cmsFields.map((field) => {
              const fieldKey = field.label || `field_${field.id}`
              return (
                <div key={field.id} className="relative">
                  {/* Companion type marker — lets the server action route this field by its Strapi type */}
                  <input type="hidden" name={`__type__${fieldKey}`} value={field.type || "text"} />
                  {field.type === "textarea" ? (
                    <Textarea
                      required={field.required !== false}
                      name={fieldKey}
                      placeholder={field.label || ""}
                      value={formData[fieldKey] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [fieldKey]: e.target.value,
                        }))
                      }
                      rows={3}
                      className={cn(
                        "min-h-[80px] w-full rounded-lg px-4 py-3 text-sm text-[#111111] transition-colors outline-none placeholder:text-[#888888]",
                        "border-[1.2px] border-[#E2E2E2] bg-white focus:border-[#E6405E] focus-visible:border-[#E6405E] focus-visible:ring-0"
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
                          className={cn(
                            "!h-auto w-full cursor-pointer appearance-none rounded-lg bg-white px-4 py-3 text-sm text-[#111111] outline-hidden transition-all",
                            "!focus-visible:ring-0 border-[1.2px] border-[#E2E2E2] font-semibold focus:border-[#E6405E] focus:bg-white focus-visible:border-[#E6405E] data-[placeholder]:font-medium data-[placeholder]:text-[#888888] data-[state=open]:border-[#E6405E]"
                          )}
                        >
                          <SelectValue
                            placeholder={`Select ${field.label || "Option"}`}
                          />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="rounded-lg border border-[#E2E2E2] bg-white/95 font-semibold text-[#111111] shadow-xl backdrop-blur-md"
                        >
                          {field.selectOptions?.map((opt) => (
                            <SelectItem
                              key={opt.id}
                              value={opt.text}
                              className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
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
                        "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#111111] transition-colors outline-none placeholder:text-[#888888]",
                        "border-[1.2px] border-[#E2E2E2] bg-white focus:border-[#E6405E] focus-visible:border-[#E6405E] focus-visible:ring-0"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Action Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3.5 font-bold text-white transition-all duration-200",
              "border-none bg-[#E6405E] text-[15px] shadow-none select-none hover:bg-[#d03350]! disabled:opacity-50"
            )}
          >
            <span>
              {isPending
                ? "Submitting..."
                : form?.submitButtonText || "Submit Enquiry"}
            </span>
            {!isPending && (
              <Play className="h-3.5 w-3.5 translate-x-0.5 fill-white text-white" />
            )}
          </Button>

          {/* Security Warning Footer */}
          <div className="mt-4.5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[#888888]">
            {form?.footerItems && form.footerItems.length > 0 ? (
              form.footerItems.map((item) => (
                <div key={item.id} className="flex items-center gap-1.5">
                  {item.icon ? (
                    <StrapiIcon
                      icon={item.icon}
                      size={14}
                      className="shrink-0 text-[#888888]"
                    />
                  ) : (
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#888888]" />
                  )}
                  <span className="text-[11.5px] leading-none font-normal">
                    {item.text}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#888888]" />
                <span className="text-[11.5px] leading-none font-normal">
                  Your data is secure and will never be shared.
                </span>
              </div>
            )}
          </div>
        </form>
      )}

      {/* Under-form Trust Badges */}
      <div className="mt-4 text-center">
        <p className="text-[13px] font-bold text-[#111111]">
          Excellent Rating on{" "}
          <span className="text-[#E6405E]">Google Reviews</span>
        </p>
      </div>
    </div>
  )
}

export default EnquiryForm
