'use client'

import * as React from "react"
import { LockKeyhole, Clock, ShieldCheck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"

export interface DetailedEnquiryFormProps {
  /** Custom submit handler */
  onSubmit?: (data: { name: string; email: string; phone: string; message: string }) => void
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
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(formData)
      } else {
        alert(`Thank you, ${formData.name}! Your claims enquiry has been sent. We'll be in touch shortly.`)
      }
      setFormData({ name: "", email: "", phone: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full bg-white rounded-[24px] flex flex-col text-left overflow-hidden",
        "border-[2.25px] border-[#0F172A]",
        "shadow-[4.5px_4.5px_0px_0px_#1A1C19]",
        className
      )}
    >
      {/* Form Inputs Content Padding */}
      <div className="p-6 sm:p-8 flex flex-col gap-5">
        {/* Name and Email side-by-side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <Label htmlFor="detail-name" className="text-[#0F172A] font-bold text-sm mb-2 leading-none">
              Name
            </Label>
            <Input
              required
              id="detail-name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                "w-full h-auto px-4 py-3 rounded-lg text-sm transition-colors text-[#0F172A] placeholder:text-[#888888] outline-none",
                "border-[2.25px] border-[#0F172A] bg-white focus-visible:ring-0 focus-visible:border-[#E94E6B]"
              )}
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <Label htmlFor="detail-email" className="text-[#0F172A] font-bold text-sm mb-2 leading-none">
              Email
            </Label>
            <Input
              required
              id="detail-email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(
                "w-full h-auto px-4 py-3 rounded-lg text-sm transition-colors text-[#0F172A] placeholder:text-[#888888] outline-none",
                "border-[2.25px] border-[#0F172A] bg-white focus-visible:ring-0 focus-visible:border-[#E94E6B]"
              )}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <Label htmlFor="detail-phone" className="text-[#0F172A] font-bold text-sm mb-2 leading-none">
            Phone Number
          </Label>
          <Input
            required
            id="detail-phone"
            type="tel"
            placeholder="07123 456 789"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={cn(
              "w-full h-auto px-4 py-3 rounded-lg text-sm transition-colors text-[#0F172A] placeholder:text-[#888888] outline-none",
              "border-[2.25px] border-[#0F172A] bg-white focus-visible:ring-0 focus-visible:border-[#E94E6B]"
            )}
          />
        </div>

        {/* Brief Message / Claim Details */}
        <div className="flex flex-col">
          <Label htmlFor="detail-message" className="text-[#0F172A] font-bold text-sm mb-2 leading-none">
            Brief Message / Claim Details
          </Label>
          <Textarea
            required
            id="detail-message"
            placeholder="Tell us about your incident..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className={cn(
              "w-full px-4 py-3 rounded-lg text-sm transition-colors text-[#0F172A] placeholder:text-[#888888] outline-none min-h-[100px]",
              "border-[2.25px] border-[#0F172A] bg-white focus-visible:ring-0 focus-visible:border-[#E94E6B]"
            )}
          />
        </div>

        {/* Neobrutalist Pink Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-auto py-3.5 sm:py-4 rounded-xl font-extrabold text-[16px] sm:text-[17px] tracking-wide transition-all active:scale-[0.98] duration-150 cursor-pointer text-white flex items-center justify-center gap-2 select-none",
            "bg-[#E94E6B] hover:bg-[#d0425c]! text-white",
            "shadow-[4.5px_4.5px_0px_0px_#1A1C19] disabled:opacity-50 mt-2"
          )}
        >
          <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
        </Button>
      </div>

      {/* Footer Security Badges Block inside the card */}
      <div
        className={cn(
          "w-full px-6 py-4 flex flex-row flex-wrap items-center justify-center gap-y-2 gap-x-4 md:gap-x-6 text-[#594143]",
          "rounded-b-[21px]"
        )}
      >
        <Separator className="bg-[#E2E2E2] mb-4" />
        <div className="flex items-center gap-1.5">
          <LockKeyhole className="w-4 h-4 shrink-0 text-[#594143]" />
          <span className="text-base font-bold leading-none tracking-tight">
            No obligation
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 shrink-0 text-[#594143]" />
          <span className="text-base font-bold leading-none tracking-tight">
            Free consultation
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#594143]" />
          <span className="text-base font-bold leading-none tracking-tight">
            Data secure & never shared
          </span>
        </div>
      </div>

    </form>
  )
}

export default DetailedEnquiryForm;
