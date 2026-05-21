"use client"

import React, { useActionState, useEffect } from "react"
import { ShieldCheck, Play, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { submitForm } from "@/actions/form"

export interface EnquiryFormProps {
  /** Optional form submission handler */
  onSubmit?: (data: { name: string; email: string; phone: string }) => void
  /** Custom heading inside the form card */
  title?: string
  /** Custom subtitle under the heading */
  subtitle?: string
  /** Optional additional styling classes */
  className?: string
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
}: EnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitForm, {
    status: "idle",
    message: null,
  })

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  })

  // Trigger optional callback on success
  useEffect(() => {
    if (state.status === "success") {
      if (onSubmit) {
        onSubmit(formData)
      }
      setFormData({ name: "", email: "", phone: "" })
    }
  }, [state.status, onSubmit])

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
            <h3 className="mb-2 text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
              Thank You!
            </h3>
            <p className="max-w-xs text-xs leading-relaxed font-semibold text-[#888888] sm:text-sm">
              {state.message || "Your enquiry has been received. Our team will contact you shortly."}
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
          <input type="hidden" name="formId" value="contact-form" />

          {/* Form Title & Subtitle */}
          <h3 className="mb-2 text-lg font-bold tracking-tight text-[#111111] sm:text-xl md:text-[22px]">
            {title}
          </h3>
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
            {/* Full Name */}
            <Input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#111111] transition-colors outline-none placeholder:text-[#888888]",
                "border-[1.2px] border-[#E2E2E2] bg-white focus:border-[#E6405E] focus-visible:border-[#E6405E] focus-visible:ring-0"
              )}
            />

            {/* Email Address */}
            <Input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={cn(
                "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#111111] transition-colors outline-none placeholder:text-[#888888]",
                "border-[1.2px] border-[#E2E2E2] bg-white focus:border-[#E6405E] focus-visible:border-[#E6405E] focus-visible:ring-0"
              )}
            />

            {/* Phone Number */}
            <Input
              required
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={cn(
                "h-auto w-full rounded-lg px-4 py-3 text-sm text-[#111111] transition-colors outline-none placeholder:text-[#888888]",
                "border-[1.2px] border-[#E2E2E2] bg-white focus:border-[#E6405E] focus-visible:border-[#E6405E] focus-visible:ring-0"
              )}
            />
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
            <span>{isPending ? "Submitting..." : "Submit Enquiry"}</span>
            {!isPending && (
              <Play className="h-3.5 w-3.5 translate-x-0.5 fill-white text-white" />
            )}
          </Button>

          {/* Security Warning Footer */}
          <div className="mt-4.5 flex items-center justify-center gap-2 text-[#888888]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#888888]" />
            <span className="text-[11.5px] leading-none font-normal">
              Your data is secure and will never be shared.
            </span>
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

