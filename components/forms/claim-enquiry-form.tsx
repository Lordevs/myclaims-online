"use client"

import * as React from "react"
import { ShieldCheck, Lock, Play } from "lucide-react"
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

export interface ClaimEnquiryFormProps {
  /** Optional callback handler for successful form submissions */
  onSubmit?: (data: {
    name: string
    phone: string
    email: string
    vehicleType: string
    description: string
  }) => void
  /** Optional custom styling classes */
  className?: string
}

/**
 * Reusable, high-fidelity ClaimEnquiryForm component.
 * Features a frosted-glass, blur-filtered Neobrutalist design layout:
 * - Card Background: #FFFFFFB2 with backdropFilter blur(12px)
 * - Heading: Start Your Claim Now in #064E3B
 * - Inputs: #FFFFFF80 background, 1px solid #E0BEC1 border
 * - Vehicle Type: Absolute floating overlapping label inside a custom dropdown
 * - Action Button: #E6405E accent color
 * - Security Footer: border-top 1px solid #064E3B0D, lock and shield badges
 */
export function ClaimEnquiryForm({
  onSubmit,
  className,
}: ClaimEnquiryFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    description: "",
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
        alert(
          `Thank you, ${formData.name}! Your claims enquiry has been received. Our team will contact you shortly.`
        )
      }
      setFormData({
        name: "",
        phone: "",
        email: "",
        vehicleType: "",
        description: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-[#FFFFFF80] bg-[#FFFFFFB2] p-6 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A,0px_2px_4px_-1px_#0000000F,0px_4px_6px_-1px_#0000001A] backdrop-blur-[12px] sm:p-10",
        className
      )}
    >
      {/* Form Heading */}
      <h3 className="mb-6 text-xl font-extrabold tracking-tight text-[#064E3B] sm:text-2xl">
        Start Your Claim Now
      </h3>

      {/* Input Stack */}
      <div className="mb-6 flex flex-col gap-4 text-left">
        {/* Full Name */}
        <div className="relative">
          <Input
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(
              "h-auto w-full rounded-xl px-4 py-3.5 text-sm font-medium text-[#064E3B] transition-colors outline-none placeholder:text-[#A3A3A3]",
              "border border-[#E0BEC1] bg-[#FFFFFF80] focus:border-[#AF2144] focus-visible:border-[#AF2144] focus-visible:ring-0"
            )}
          />
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Phone Number */}
          <div className="relative">
            <Input
              required
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={cn(
                "h-auto w-full rounded-xl px-4 py-3.5 text-sm font-medium text-[#064E3B] transition-colors outline-none placeholder:text-[#A3A3A3]",
                "border border-[#E0BEC1] bg-[#FFFFFF80] focus:border-[#AF2144] focus-visible:border-[#AF2144] focus-visible:ring-0"
              )}
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <Input
              required
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={cn(
                "h-auto w-full rounded-xl px-4 py-3.5 text-sm font-medium text-[#064E3B] transition-colors outline-none placeholder:text-[#A3A3A3]",
                "border border-[#E0BEC1] bg-[#FFFFFF80] focus:border-[#AF2144] focus-visible:border-[#AF2144] focus-visible:ring-0"
              )}
            />
          </div>
        </div>

        {/* Vehicle Type Dropdown with Overlap Label */}
        <div className="relative">
          <label className="absolute -top-[9px] left-3.5 z-10 rounded-sm bg-white px-1.5 text-[10px] font-extrabold tracking-wider text-[#AF2144] uppercase">
            Vehicle Type
          </label>
          <div className="relative w-full">
            <Select
              required
              name="vehicleType"
              value={formData.vehicleType || undefined}
              onValueChange={(val) =>
                setFormData({ ...formData, vehicleType: val })
              }
            >
              <SelectTrigger
                className={cn(
                  "!h-auto w-full cursor-pointer appearance-none rounded-xl px-4 py-3.5 text-sm text-[#064E3B] outline-hidden transition-all",
                  "!focus-visible:ring-0 border border-[#E0BEC1] bg-[#FFFFFF80] font-semibold focus:border-[#AF2144] focus:bg-white focus-visible:border-[#AF2144] data-[placeholder]:font-medium data-[placeholder]:text-[#A3A3A3] data-[state=open]:border-[#AF2144] data-[state=open]:bg-white [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#064E3B]"
                )}
              >
                <SelectValue placeholder="Select Vehicle Type" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="rounded-xl border border-[#E0BEC1] bg-white/95 font-semibold text-[#064E3B] shadow-xl backdrop-blur-md"
              >
                <SelectItem
                  value="Car"
                  className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                >
                  Car
                </SelectItem>
                <SelectItem
                  value="Taxi"
                  className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                >
                  Taxi / Private Hire
                </SelectItem>
                <SelectItem
                  value="Motorbike"
                  className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                >
                  Motorcycle
                </SelectItem>
                <SelectItem
                  value="Cycle"
                  className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                >
                  Bicycle / E-Scooter
                </SelectItem>
                <SelectItem
                  value="Electric Vehicle"
                  className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                >
                  Electric Vehicle
                </SelectItem>
                <SelectItem
                  value="Other"
                  className="cursor-pointer py-2 font-semibold focus:bg-[#F4F8E5] focus:text-[#064E3B] data-[state=checked]:bg-[#F4F8E5] data-[state=checked]:text-[#064E3B]"
                >
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Accident Description */}
        <div className="relative">
          <Textarea
            required
            placeholder="Accident Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className={cn(
              "min-h-[100px] w-full rounded-xl px-4 py-3.5 text-sm leading-relaxed font-medium text-[#064E3B] transition-colors outline-none placeholder:text-[#A3A3A3]",
              "border border-[#E0BEC1] bg-[#FFFFFF80] focus:border-[#AF2144] focus-visible:border-[#AF2144] focus-visible:ring-0"
            )}
          />
        </div>
      </div>

      {/* Submit Action Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold text-white transition-all duration-200 select-none",
          "border-none bg-[#E6405E] hover:bg-[#d03350]! active:scale-[0.98] disabled:opacity-50"
        )}
      >
        <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
        {!isSubmitting && (
          <Play className="h-3.5 w-3.5 translate-x-0.5 fill-white text-white" />
        )}
      </Button>

      {/* Form Footer */}
      <div className="mt-6 grid grid-cols-2 items-center gap-4 border-t border-[#064E3B0D] pt-5 text-center">
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
      </div>
    </form>
  )
}

export default ClaimEnquiryForm
