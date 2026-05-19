'use client'

import * as React from "react"
import { ShieldCheck, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API request
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(formData)
      } else {
        alert(`Thank you ${formData.name}! Your enquiry has been received. Our team will contact you shortly.`)
      }
      setFormData({ name: "", email: "", phone: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className={cn("w-full flex flex-col items-center select-none", className)}>
      {/* White Form Box */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full bg-white rounded-2xl p-6 md:p-8 flex flex-col text-center",
          "border-[1.2px] border-[#E2E2E2]",
          "shadow-[0px_4.8px_36.02px_0px_rgba(0,0,0,0.09)]"
        )}
      >
        {/* Form Title & Subtitle */}
        <h3 className="text-[#111111] text-lg sm:text-xl md:text-[22px] font-bold tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-[#888888] text-xs sm:text-sm leading-relaxed mb-6 px-1 font-normal">
          {subtitle}
        </p>

        {/* Input stack */}
        <div className="flex flex-col gap-3.5 mb-5 text-left">
          {/* Full Name */}
          <Input
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(
              "w-full h-auto px-4 py-3 rounded-lg text-sm transition-colors text-[#111111] placeholder:text-[#888888] outline-none",
              "border-[1.2px] border-[#E2E2E2] focus:border-[#E6405E] bg-white focus-visible:ring-0 focus-visible:border-[#E6405E]"
            )}
          />

          {/* Email Address */}
          <Input
            required
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={cn(
              "w-full h-auto px-4 py-3 rounded-lg text-sm transition-colors text-[#111111] placeholder:text-[#888888] outline-none",
              "border-[1.2px] border-[#E2E2E2] focus:border-[#E6405E] bg-white focus-visible:ring-0 focus-visible:border-[#E6405E]"
            )}
          />

          {/* Phone Number */}
          <Input
            required
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={cn(
              "w-full h-auto px-4 py-3 rounded-lg text-sm transition-colors text-[#111111] placeholder:text-[#888888] outline-none",
              "border-[1.2px] border-[#E2E2E2] focus:border-[#E6405E] bg-white focus-visible:ring-0 focus-visible:border-[#E6405E]"
            )}
          />
        </div>

        {/* Action Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-auto py-3.5 rounded-lg font-bold transition-all duration-200 cursor-pointer text-white flex items-center justify-center gap-2",
            "bg-[#E6405E] hover:bg-[#d03350]! border-none shadow-none disabled:opacity-50 select-none text-[15px]"
          )}
        >
          <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
          {!isSubmitting && <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />}
        </Button>

        {/* Security Warning Footer */}
        <div className="flex items-center justify-center gap-2 mt-4.5 text-[#888888]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#888888]" />
          <span className="text-[11.5px] font-normal leading-none">
            Your data is secure and will never be shared.
          </span>
        </div>
      </form>

      {/* Under-form Trust Badges */}
      <div className="mt-4 text-center">
        <p className="text-[#111111] text-[13px] font-bold">
          Excellent Rating on <span className="text-[#E6405E]">Google Reviews</span>
        </p>
      </div>
    </div>
  )
}

export default EnquiryForm;
