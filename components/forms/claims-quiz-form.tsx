"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react"
import { FadeIn } from "@/components/ui/animations"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export interface QuizOption {
  id: string | number
  text: string
  value: string
}

export interface QuizQuestion {
  id: string | number
  questionText: string
  category: string
  options: QuizOption[]
}

export interface ClaimsQuizFormProps {
  /** Dynamic array of questions */
  questions?: QuizQuestion[]
  /** On completion event callback, returning answers and contact details */
  onComplete?: (answers: Record<string | number, string>) => void
  /** Custom extra styling classes */
  className?: string
}

const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: "Have you been involved in a road traffic accident?",
    category: "Getting the facts of the incident",
    options: [
      { id: "1a", text: "Yes, I've had an accident", value: "yes" },
      { id: "1b", text: "No, I haven't had an accident", value: "no" },
    ],
  },
  {
    id: 2,
    questionText: "Was the accident your fault?",
    category: "Determining liability",
    options: [
      { id: "2a", text: "No, it was someone else's fault", value: "no_fault" },
      { id: "2b", text: "Yes, it was my fault", value: "fault" },
      { id: "2c", text: "It was split liability / Not sure", value: "split_unsure" },
    ],
  },
  {
    id: 3,
    questionText: "When did the accident happen?",
    category: "Incident timeframe",
    options: [
      { id: "3a", text: "Within the last 3 months", value: "last_3_months" },
      { id: "3b", text: "Between 3 and 12 months ago", value: "last_12_months" },
      { id: "3c", text: "Over 12 months ago", value: "older" },
    ],
  },
  {
    id: 4,
    questionText: "What type of vehicle were you driving?",
    category: "Vehicle details",
    options: [
      { id: "4a", text: "Car", value: "car" },
      { id: "4b", text: "Taxi / Uber / Private Hire", value: "taxi" },
      { id: "4c", text: "Motorcycle", value: "motorcycle" },
      { id: "4d", text: "Bicycle / E-Scooter / Pedestrian", value: "cyclist_pedestrian" },
    ],
  },
  {
    id: 5,
    questionText: "Did you or any passenger sustain any injuries?",
    category: "Injury assessment",
    options: [
      { id: "5a", text: "Yes, minor or major injuries sustained", value: "yes_injuries" },
      { id: "5b", text: "No injuries", value: "no_injuries" },
    ],
  },
]

/**
 * Reusable Claims Quiz Form Component.
 * Contains multi-step questionnaire flows, Neobrutalist design states, and lead capture form logic.
 */
export function ClaimsQuizForm({
  questions = defaultQuestions,
  onComplete,
  className,
}: ClaimsQuizFormProps) {
  // State for tracking active step
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  // State for active selections
  const [answers, setAnswers] = useState<Record<string | number, string>>({})
  // Complete lead form state
  const [isFormStep, setIsFormStep] = useState(false)
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "", email: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const activeQuestion = questions[currentStepIndex]
  const totalSteps = questions.length
  // Progress calculations
  const progressPercent = totalSteps > 0 ? (currentStepIndex / totalSteps) * 100 : 0
  const selectedValue = activeQuestion ? answers[activeQuestion.id] : undefined

  // Navigation handlers
  const handleSelectOption = (value: string) => {
    if (!activeQuestion) return
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (!selectedValue) return

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      setIsFormStep(true)
    }
  }

  const handleBack = () => {
    if (isFormStep) {
      setIsFormStep(false)
      return
    }
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (onComplete) {
      onComplete({
        ...answers,
        ...contactInfo,
      })
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStepIndex(0)
    setIsFormStep(false)
    setContactInfo({ name: "", phone: "", email: "" })
    setIsSubmitted(false)
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full col-span-1 lg:col-span-8", className)}>
      {/* Step & Progress Header */}
      {!isSubmitted && (
        <div className="flex flex-col gap-2">
          <div className="text-xs sm:text-sm font-extrabold tracking-widest text-[#AF2144] uppercase">
            {isFormStep ? "Final Step" : `Step ${currentStepIndex + 1} of ${totalSteps}`}
          </div>

          {/* Shadcn Neobrutalist Progress Bar */}
          <Progress
            value={isFormStep ? 100 : progressPercent}
            className="h-4 w-full rounded-full bg-[#E7E9E4] border-2 border-[#4C6549] p-[2px] [&>[data-slot=progress-indicator]]:bg-[#AF2144]"
          />

          <div className="text-xs sm:text-sm font-normal text-[#594143] tracking-wide">
            {isFormStep ? "Submit contact information to check claim eligibility" : activeQuestion?.category}
          </div>
        </div>
      )}

      {/* MAIN QUIZ CARD */}
      <div
        className="bg-[#F9FAF5] border-2 border-[#4C6549] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[4px_4px_0px_0px_#344D32] transition-all duration-300"
      >
        {isSubmitted ? (
          /* Success Screen */
          <FadeIn delay={0.1} y={20} className="flex flex-col items-center text-center py-10">
            <div className="size-20 rounded-full bg-[#627E2A] flex items-center justify-center text-[#FAFFE7] mb-6 border-2 border-[#4C6549] shadow-[3px_3px_0px_0px_#344D32]">
              <ShieldCheck className="size-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A1C19] mb-4">
              Claim Details Received!
            </h3>
            <p className="text-[#594143] text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-medium">
              Thank you! Your assessment has been completed. A claims specialist will review your file and call you directly within 15 minutes.
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#AF2144] hover:bg-[#961a37] text-white border-2 border-[#4C6549] rounded-xl font-bold shadow-[4px_4px_0px_0px_#344D32] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#344D32] transition-all duration-200"
            >
              <RefreshCw className="size-4" /> Start Over
            </button>
          </FadeIn>
        ) : isFormStep ? (
          /* Premium Contact Details Form Step */
          <FadeIn delay={0.05} y={15}>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A1C19] tracking-tight leading-tight mb-3">
              Almost Eligible! Lock in your claim evaluation
            </h3>
            <p className="text-sm font-semibold text-[#594143] leading-relaxed mb-8">
              We have successfully captured your claim responses. Please share your contact info so we can assign an advisor.
            </p>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-black text-[#1A1C19]" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-5 py-4 bg-[#F3F4EF] border-2 border-[#4C6549] rounded-xl text-[#1A1C19] font-bold placeholder-[#594143]/50 focus:outline-none focus:ring-2 focus:ring-[#AF2144]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-black text-[#1A1C19]" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  placeholder="07123 456789"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-5 py-4 bg-[#F3F4EF] border-2 border-[#4C6549] rounded-xl text-[#1A1C19] font-bold placeholder-[#594143]/50 focus:outline-none focus:ring-2 focus:ring-[#AF2144]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-black text-[#1A1C19]" htmlFor="emailAddress">
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-5 py-4 bg-[#F3F4EF] border-2 border-[#4C6549] rounded-xl text-[#1A1C19] font-bold placeholder-[#594143]/50 focus:outline-none focus:ring-2 focus:ring-[#AF2144]/20 transition-all"
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#4C6549]/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-black text-[#594143] hover:text-[#1A1C19] transition-colors focus:outline-none"
                >
                  <ArrowLeft className="size-4" /> Back to questions
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-4 bg-[#AF2144] hover:bg-[#961a37] text-white border-2 border-[#4C6549] rounded-2xl font-black shadow-[4px_4px_0px_0px_#344D32] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#344D32] transition-all duration-200 focus:outline-none"
                >
                  Submit My Claim <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          </FadeIn>
        ) : (
          /* Dynamic Question Step */
          <FadeIn key={currentStepIndex} delay={0.05} y={15}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1C19] tracking-tight leading-snug sm:leading-tight mb-8">
              {activeQuestion?.questionText}
            </h3>

            {/* Options List */}
            <div className="flex flex-col gap-4">
              {activeQuestion?.options.map((option) => {
                const isSelected = selectedValue === option.value
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.value)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-5 rounded-2xl border-2 border-[#4C6549] text-left cursor-pointer transition-all duration-200 select-none",
                      isSelected
                        ? "bg-[#E7E9E4] border-[#4C6549] ring-2 ring-[#4C6549]/15"
                        : "bg-[#F3F4EF] hover:bg-[#EAECE5] hover:border-[#4C6549] border-[#4C6549]"
                    )}
                  >
                    {/* Premium Custom Radio Circle */}
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#4C6549] bg-white flex items-center justify-center transition-all duration-200"
                    >
                      {isSelected && (
                        <div className="w-3.5 h-3.5 rounded-full bg-[#AF2144] animate-in zoom-in-50 duration-200" />
                      )}
                    </div>

                    <span className="text-[#1A1C19] text-sm sm:text-base font-extrabold leading-tight">
                      {option.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#4C6549]/10">
              {currentStepIndex > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#594143] hover:text-[#1A1C19] transition-colors focus:outline-none"
                >
                  <ArrowLeft className="size-4" /> Back
                </button>
              ) : (
                <div /> // Empty block to align button right
              )}

              <button
                onClick={handleNext}
                disabled={!selectedValue}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-white border-2 border-[#4C6549] rounded-2xl font-black transition-all duration-200 focus:outline-none",
                  selectedValue
                    ? "bg-[#AF2144] hover:bg-[#961a37] shadow-[4px_4px_0px_0px_#344D32] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#344D32] cursor-pointer"
                    : "bg-[#AF2144]/40 border-[#4C6549]/40 text-white/50 cursor-not-allowed shadow-none"
                )}
              >
                Next <ArrowRight className="size-4" />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}
