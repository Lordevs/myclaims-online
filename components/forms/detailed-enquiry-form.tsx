"use client"

import React, { useActionState, useEffect } from "react"
import { LockKeyhole, Clock, ShieldCheck, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import { submitForm } from "@/actions/form"

export interface DetailedEnquiryFormProps {
  /** Custom submit handler */
  onSubmit?: (data: {
    name: string
    email: string
    phone: string
    message: string
  }) => void
  /** Additional styling class */
  className?: string
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
 */
export function DetailedEnquiryForm({
  onSubmit,
  className,
}: DetailedEnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitForm, {
    status: "idle",
    message: null,
  })

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Trigger optional callback on success
  useEffect(() => {
    if (state.status === "success") {
      if (onSubmit) {
        onSubmit(formData)
      }
      setFormData({ name: "", email: "", phone: "", message: "" })
    }
  }, [state.status, onSubmit])

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
            {state.message || "Thank you! Your detailed claims enquiry has been received. We will contact you shortly."}
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
      <input type="hidden" name="formId" value="detail-enquiry-form" />

      {/* Form Inputs Content Padding */}
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        {/* Global Error Banner */}
        {state.status === "error" && state.message && (
          <div className="flex items-start gap-2.5 rounded-xl border-[2.25px] border-[#0F172A] bg-[#AF2144]/10 p-4 text-sm font-bold text-[#AF2144]">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#AF2144]" />
            <span>{state.message}</span>
          </div>
        )}

        {/* Name and Email side-by-side on larger screens */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div className="flex flex-col">
            <Label
              htmlFor="detail-name"
              className="mb-2 text-sm leading-none font-bold text-[#0F172A]"
            >
              Name
            </Label>
            <Input
              required
              id="detail-name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={cn(
                "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#0F172A] transition-colors outline-none placeholder:text-[#888888]",
                "border-[2.25px] border-[#0F172A] bg-white focus-visible:border-[#E94E6B] focus-visible:ring-0"
              )}
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <Label
              htmlFor="detail-email"
              className="mb-2 text-sm leading-none font-bold text-[#0F172A]"
            >
              Email
            </Label>
            <Input
              required
              id="detail-email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={cn(
                "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#0F172A] transition-colors outline-none placeholder:text-[#888888]",
                "border-[2.25px] border-[#0F172A] bg-white focus-visible:border-[#E94E6B] focus-visible:ring-0"
              )}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <Label
            htmlFor="detail-phone"
            className="mb-2 text-sm leading-none font-bold text-[#0F172A]"
          >
            Phone Number
          </Label>
          <Input
            required
            id="detail-phone"
            type="tel"
            name="phone"
            placeholder="07123 456 789"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={cn(
              "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#0F172A] transition-colors outline-none placeholder:text-[#888888]",
              "border-[2.25px] border-[#0F172A] bg-white focus-visible:border-[#E94E6B] focus-visible:ring-0"
            )}
          />
        </div>

        {/* Brief Message / Claim Details */}
        <div className="flex flex-col">
          <Label
            htmlFor="detail-message"
            className="mb-2 text-sm leading-none font-bold text-[#0F172A]"
          >
            Brief Message / Claim Details
          </Label>
          <Textarea
            required
            id="detail-message"
            name="message"
            placeholder="Tell us about your incident..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={4}
            className={cn(
              "min-h-[100px] w-full rounded-lg px-4 py-3 text-sm text-[#0F172A] transition-colors outline-none placeholder:text-[#888888]",
              "border-[2.25px] border-[#0F172A] bg-white focus-visible:border-[#E94E6B] focus-visible:ring-0"
            )}
          />
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
          <span>{isPending ? "Submitting..." : "Submit Enquiry"}</span>
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
      </div>
    </form>
  )
}

export default DetailedEnquiryForm
