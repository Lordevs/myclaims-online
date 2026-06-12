"use client"

import React, { useActionState, useEffect } from "react"
import { ShieldCheck, Lock, Play, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
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

export interface ClaimEnquiryFormProps {
  /** Optional callback handler for successful form submissions */
  onSubmit?: (data: Record<string, string>) => void
  /** Optional custom styling classes */
  className?: string
  /** The fully populated Form entry from CMS */
  form?: FormEntry | null
}

/**
 * Reusable, high-fidelity ClaimEnquiryForm component.
 * Features a frosted-glass, blur-filtered Neobrutalist design layout:
 * - Card Background: #FFFFFFB2 with backdropFilter blur(12px)
 * - Heading: Start Your Claim Now in #064E3B
 * - Inputs: #FFFFFF80 background, 1px solid #E0BEC1 border
 * - Accent: #E6405E action color
 * - Security Footer: border-top 1px solid #064E3B0D, lock and shield badges
 * - Dynamic: Renders form fields purely from the backend configuration
 */
export function ClaimEnquiryForm({
  onSubmit,
  className,
  form,
}: ClaimEnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitForm, {
    status: "idle",
    message: null,
  })

  const [formData, setFormData] = React.useState<Record<string, string>>({})

  // Trigger optional callback on successful submit and reset form data
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

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-xl border border-[#FFFFFF80] bg-[#FFFFFFB2] p-6 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A,0px_2px_4px_-1px_#0000000F,0px_4px_6px_-1px_#0000001A] backdrop-blur-[12px] sm:p-10",
          className
        )}
      >
        <div className="flex flex-col items-center py-10 text-center select-none">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full border-2 border-[#064E3B] bg-[#10B981] text-white shadow-[0px_4px_10px_rgba(16,185,129,0.3)]">
            <ShieldCheck className="size-10" />
          </div>
          <h3 className="mb-4 text-2xl font-black tracking-tight text-[#064E3B] sm:text-3xl">
            Enquiry Received!
          </h3>
          <p className="mb-8 max-w-lg text-sm leading-relaxed font-semibold text-[#4C6549] sm:text-base">
            {form?.successMessage ||
              state.message ||
              "Thank you! Your claims enquiry has been received. Our team will contact you shortly."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-[#FFFFFF80] bg-[#FFFFFFB2] p-6 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A,0px_2px_4px_-1px_#0000000F,0px_4px_6px_-1px_#0000001A] backdrop-blur-[12px] sm:p-10",
        className
      )}
    >
      <input
        type="hidden"
        name="formId"
        value={form?.formId || "enquiry-form"}
      />

      {/* Form Heading */}
      <h3 className="mb-6 text-xl font-extrabold tracking-tight text-[#064E3B] sm:text-2xl">
        Start Your Claim Now
      </h3>

      {/* Global Error Banner */}
      {state.status === "error" && state.message && (
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border-2 border-[#AF2144] bg-[#AF2144]/10 p-4 text-sm font-bold text-[#AF2144]">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Input Stack */}
      <div className="mb-6 flex flex-col gap-4 text-left">
        {cmsFields.map((field) => {
          const fieldKey = field.label || `field_${field.id}`
          return (
            <div key={field.id} className="relative">
              {/* Companion type marker — lets the server action route this field by its Strapi type */}
              <input
                type="hidden"
                name={`__type__${fieldKey}`}
                value={field.type || "text"}
              />
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
                    "min-h-[100px] w-full rounded-xl px-4 py-3.5 text-sm leading-relaxed font-medium text-[#064E3B] transition-colors outline-none placeholder:text-[#A3A3A3]",
                    "border border-[#E0BEC1] bg-[#FFFFFF80] focus:border-[#AF2144] focus-visible:border-[#AF2144] focus-visible:ring-0"
                  )}
                />
              ) : field.type === "select" ? (
                <div className="relative">
                  {/* Overlap Label for Premium Aesthetics */}
                  <label className="absolute -top-[9px] left-3.5 z-10 rounded-sm bg-white px-1.5 text-[10px] font-extrabold tracking-wider text-[#AF2144] uppercase">
                    {field.label || "Select Option"}
                  </label>
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
                          "!h-auto w-full cursor-pointer appearance-none rounded-xl px-4 py-3.5 text-sm text-[#064E3B] outline-hidden transition-all",
                          "!focus-visible:ring-0 border border-[#E0BEC1] bg-[#FFFFFF80] font-semibold focus:border-[#AF2144] focus:bg-white focus-visible:border-[#AF2144] data-[placeholder]:font-medium data-[placeholder]:text-[#A3A3A3] data-[state=open]:border-[#AF2144] data-[state=open]:bg-white [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#064E3B]"
                        )}
                      >
                        <SelectValue
                          placeholder={`Select ${field.label || "Option"}`}
                        />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="rounded-xl border border-[#E0BEC1] bg-white/95 font-semibold text-[#064E3B] shadow-xl backdrop-blur-md"
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
                    "h-auto w-full rounded-xl px-4 py-3.5 text-sm font-medium text-[#064E3B] transition-colors outline-none placeholder:text-[#A3A3A3]",
                    "border border-[#E0BEC1] bg-[#FFFFFF80] focus:border-[#AF2144] focus-visible:border-[#AF2144] focus-visible:ring-0"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Submit Action Button */}
      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold text-white transition-all duration-200 select-none",
          "border-none bg-[#E6405E] hover:bg-[#d03350]! active:scale-[0.98] disabled:opacity-50"
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

      {/* Form Footer */}
      <div
        className={cn(
          "mt-6 items-center gap-4 border-t border-[#064E3B0D] pt-5 text-center",
          form?.footerItems && form.footerItems.length > 0
            ? "flex flex-wrap justify-center gap-x-6 gap-y-2"
            : "grid grid-cols-2"
        )}
      >
        {form?.footerItems && form.footerItems.length > 0 ? (
          form.footerItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center gap-2 text-[#064E3B99] transition-opacity hover:opacity-80"
            >
              {item.icon ? (
                <StrapiIcon
                  icon={item.icon}
                  size={14}
                  className="shrink-0 text-[#AF2144]"
                />
              ) : (
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#AF2144]" />
              )}
              <span className="text-[10px] font-extrabold tracking-wider uppercase sm:text-[11px]">
                {item.text}
              </span>
            </div>
          ))
        ) : (
          <>
            {/* No Obligation */}
            <div className="flex items-center justify-center gap-2 text-[#064E3B99] transition-opacity hover:opacity-80">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#AF2144]" />
              <span className="text-[10px] font-extrabold tracking-wider uppercase sm:text-[11px]">
                No Obligation
              </span>
            </div>

            {/* Secure Data */}
            <div className="flex items-center justify-center gap-2 text-[#064E3B99] transition-opacity hover:opacity-80">
              <Lock className="h-3.5 w-3.5 shrink-0 text-[#AF2144]" />
              <span className="text-[10px] font-extrabold tracking-wider uppercase sm:text-[11px]">
                Secure Data
              </span>
            </div>
          </>
        )}
      </div>
    </form>
  )
}

export default ClaimEnquiryForm
