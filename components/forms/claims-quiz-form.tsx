"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react"
import { FadeIn } from "@/components/ui/animations"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Markdown } from "@/components/shared/markdown"

import type {
  FormStepComponent,
  ListItemComponent,
} from "@/lib/strapi/types/shared"
import { StrapiIcon } from "@/components/strapi/strapi-icon"

export interface QuizOption {
  id: string | number
  text: string
  value: string
  additionalInfo?: string | null
  isDisqualifying?: boolean
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
  /** Dynamic contact/lead capture step from CMS */
  contactStep?: FormStepComponent
  /** On completion event callback, returning answers and contact details */
  onComplete?: (answers: Record<string | number, string>) => void
  /** Dynamic success message from CMS form */
  successMessage?: string
  /** Dynamic footer items from CMS form */
  footerItems?: ListItemComponent[]
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
      {
        id: "2c",
        text: "It was split liability / Not sure",
        value: "split_unsure",
      },
    ],
  },
  {
    id: 3,
    questionText: "When did the accident happen?",
    category: "Incident timeframe",
    options: [
      { id: "3a", text: "Within the last 3 months", value: "last_3_months" },
      {
        id: "3b",
        text: "Between 3 and 12 months ago",
        value: "last_12_months",
      },
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
      {
        id: "4d",
        text: "Bicycle / E-Scooter / Pedestrian",
        value: "cyclist_pedestrian",
      },
    ],
  },
  {
    id: 5,
    questionText: "Did you or any passenger sustain any injuries?",
    category: "Injury assessment",
    options: [
      {
        id: "5a",
        text: "Yes, minor or major injuries sustained",
        value: "yes_injuries",
      },
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
  contactStep,
  onComplete,
  successMessage,
  footerItems,
  className,
}: ClaimsQuizFormProps) {
  // State for tracking active step
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  // State for active selections
  const [answers, setAnswers] = useState<Record<string | number, string>>({})
  // Complete lead form state
  const [isFormStep, setIsFormStep] = useState(false)
  const [contactInfo, setContactInfo] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, setState] = useState<{
    status: string
    message: string | null
  }>({
    status: "idle",
    message: null,
  })

  const activeQuestion = questions[currentStepIndex]
  const totalSteps = questions.length
  // Progress calculations
  const progressPercent =
    totalSteps > 0 ? (currentStepIndex / totalSteps) * 100 : 0
  const selectedValue = activeQuestion ? answers[activeQuestion.id] : undefined
  const selectedOption = activeQuestion?.options.find(
    (opt) => opt.value === selectedValue
  )
  const isDisqualified = selectedOption?.isDisqualifying || false

  // Navigation handlers
  const handleSelectOption = (value: string) => {
    if (!activeQuestion) return
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (!selectedValue || isDisqualified) return

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setState({ status: "idle", message: null })

    try {
      const { submitForm } = await import("@/actions/form")
      const formData = new FormData()
      formData.append("formId", "claims-quiz")

      contactStep?.fields?.forEach((field) => {
        const fieldKey = field.label || `field_${field.id}`
        formData.append(fieldKey, contactInfo[fieldKey] || "")
      })

      // Package quiz selections into the payload
      questions.forEach((q) => {
        const value = answers[q.id] || ""
        formData.append(q.questionText, value)
      })

      const res = await submitForm({ status: "idle", message: null }, formData)

      if (res.status === "success") {
        setIsSubmitted(true)
        if (onComplete) {
          onComplete({
            ...answers,
            ...contactInfo,
          })
        }
      } else {
        setState({
          status: "error",
          message:
            res.message || "Failed to submit claims quiz. Please try again.",
        })
      }
    } catch (err: unknown) {
      console.error("[ClaimsQuizForm] Submission error:", err)
      setState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during submission.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStepIndex(0)
    setIsFormStep(false)
    setContactInfo({})
    setIsSubmitted(false)
    setState({ status: "idle", message: null })
  }

  return (
    <div
      className={cn(
        "col-span-1 flex w-full flex-col gap-6 lg:col-span-8",
        className
      )}
    >
      {/* Step & Progress Header */}
      {!isSubmitted && (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-extrabold tracking-widest text-[#AF2144] uppercase sm:text-sm">
            {isFormStep
              ? "Final Step"
              : `Step ${currentStepIndex + 1} of ${totalSteps}`}
          </div>

          {/* Shadcn Neobrutalist Progress Bar */}
          <Progress
            value={isFormStep ? 100 : progressPercent}
            className="h-4 w-full rounded-full border-2 border-[#4C6549] bg-[#E7E9E4] p-[2px] [&>[data-slot=progress-indicator]]:bg-[#AF2144]"
          />

          <div className="text-xs font-normal tracking-wide text-[#594143] sm:text-sm">
            {isFormStep
              ? "Submit contact information to check claim eligibility"
              : activeQuestion?.category}
          </div>
        </div>
      )}

      {/* MAIN QUIZ CARD */}
      <div className="rounded-3xl border-2 border-[#4C6549] bg-[#F9FAF5] p-6 shadow-[4px_4px_0px_0px_#344D32] transition-all duration-300 sm:p-10 md:p-12">
        {isSubmitted ? (
          /* Success Screen */
          <FadeIn
            delay={0.1}
            y={20}
            className="flex flex-col items-center py-10 text-center"
          >
            <div className="mb-6 flex size-20 items-center justify-center rounded-full border-2 border-[#4C6549] bg-[#627E2A] text-[#FAFFE7] shadow-[3px_3px_0px_0px_#344D32]">
              <ShieldCheck className="size-10" />
            </div>
            <h3 className="mb-4 text-2xl font-black text-[#1A1C19] sm:text-3xl">
              Claim Details Received!
            </h3>
            <p className="mb-8 max-w-lg text-sm leading-relaxed font-medium text-[#594143] sm:text-base">
              {successMessage ||
                "Thank you! Your assessment has been completed. A claims specialist will review your file and call you directly within 15 minutes."}
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border-2 border-[#4C6549] bg-[#AF2144] px-6 py-3.5 font-bold text-white shadow-[4px_4px_0px_0px_#344D32] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#961a37] hover:shadow-[2px_2px_0px_0px_#344D32]"
            >
              <RefreshCw className="size-4" /> Start Over
            </button>
          </FadeIn>
        ) : isFormStep ? (
          /* Premium Contact Details Form Step */
          <FadeIn delay={0.05} y={15}>
            <h3 className="mb-3 text-2xl leading-tight font-black tracking-tight text-[#1A1C19] sm:text-3xl">
              {contactStep?.title ||
                "Almost Eligible! Lock in your claim evaluation"}
            </h3>
            {contactStep?.description ? (
              <div className="mb-8 text-sm leading-relaxed font-semibold text-[#594143]">
                <Markdown
                  content={contactStep.description}
                  variant="light"
                  className="prose-[#594143] prose-sm max-w-none"
                />
              </div>
            ) : (
              <p className="mb-8 text-sm leading-relaxed font-semibold text-[#594143]">
                We have successfully captured your claim responses. Please share
                your contact info so we can assign an advisor.
              </p>
            )}

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              {contactStep?.fields?.map((field) => {
                const fieldKey = field.label || `field_${field.id}`
                return (
                  <div key={field.id} className="flex flex-col gap-2">
                    {field.label && (
                      <label
                        className="text-xs font-black text-[#1A1C19] sm:text-sm"
                        htmlFor={`field_${field.id}`}
                      >
                        {field.label}
                      </label>
                    )}
                    {field.type === "textarea" ? (
                      <textarea
                        id={`field_${field.id}`}
                        name={field.label || ""}
                        required={field.required !== false}
                        placeholder={`Enter your ${field.label?.toLowerCase() || "details"}`}
                        value={contactInfo[fieldKey] || ""}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            [fieldKey]: e.target.value,
                          }))
                        }
                        className="min-h-[120px] w-full rounded-xl border-2 border-[#4C6549] bg-[#F3F4EF] px-5 py-4 font-bold text-[#1A1C19] placeholder-[#594143]/50 transition-all focus:ring-2 focus:ring-[#AF2144]/20 focus:outline-none"
                      />
                    ) : (
                      <input
                        id={`field_${field.id}`}
                        type={field.type}
                        name={field.label || ""}
                        required={field.required !== false}
                        placeholder={
                          field.type === "email"
                            ? "john@example.com"
                            : field.type === "tel"
                              ? "07123 456789"
                              : `Enter your ${field.label?.toLowerCase() || ""}`
                        }
                        value={contactInfo[fieldKey] || ""}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            [fieldKey]: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border-2 border-[#4C6549] bg-[#F3F4EF] px-5 py-4 font-bold text-[#1A1C19] placeholder-[#594143]/50 transition-all focus:ring-2 focus:ring-[#AF2144]/20 focus:outline-none"
                      />
                    )}
                  </div>
                )
              })}

              {/* Dynamic Footer Items inside contact form */}
              {footerItems && footerItems.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-start gap-x-4 gap-y-2 text-xs font-semibold text-[#594143]">
                  {footerItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-1.5">
                      {item.icon ? (
                        <StrapiIcon
                          icon={item.icon}
                          size={14}
                          className="shrink-0 text-[#594143]"
                        />
                      ) : (
                        <ShieldCheck className="h-4 w-4 shrink-0 text-[#594143]" />
                      )}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {state.status === "error" && state.message && (
                <div className="animate-in text-sm font-semibold text-[#AF2144] duration-200 fade-in">
                  {state.message}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-[#4C6549]/10 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-black text-[#594143] transition-colors hover:text-[#1A1C19] focus:outline-none"
                >
                  <ArrowLeft className="size-4" /> Back to questions
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border-2 border-[#4C6549] bg-[#AF2144] px-6 py-4 font-black text-white transition-all duration-200 focus:outline-none",
                    isSubmitting
                      ? "cursor-not-allowed border-[#4C6549]/40 bg-[#AF2144]/40 text-white/50 shadow-none"
                      : "shadow-[4px_4px_0px_0px_#344D32] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#961a37] hover:shadow-[2px_2px_0px_0px_#344D32]"
                  )}
                >
                  {isSubmitting ? "Submitting..." : "Submit My Claim"}{" "}
                  {!isSubmitting && <ArrowRight className="size-4" />}
                </button>
              </div>
            </form>
          </FadeIn>
        ) : (
          /* Dynamic Question Step */
          <FadeIn key={currentStepIndex} delay={0.05} y={15}>
            <h3 className="mb-8 text-2xl leading-snug font-extrabold tracking-tight text-[#1A1C19] sm:text-3xl sm:leading-tight md:text-4xl">
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
                      "flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-[#4C6549] px-6 py-5 text-left transition-all duration-200 select-none",
                      isSelected
                        ? "border-[#4C6549] bg-[#E7E9E4] ring-2 ring-[#4C6549]/15"
                        : "border-[#4C6549] bg-[#F3F4EF] hover:border-[#4C6549] hover:bg-[#EAECE5]"
                    )}
                  >
                    {/* Premium Custom Radio Circle */}
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#4C6549] bg-white transition-all duration-200">
                      {isSelected && (
                        <div className="h-3.5 w-3.5 animate-in rounded-full bg-[#AF2144] duration-200 zoom-in-50" />
                      )}
                    </div>

                    <span className="text-sm leading-tight font-extrabold text-[#1A1C19] sm:text-base">
                      {option.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Disqualifying Warning Panel */}
            {isDisqualified && selectedOption?.additionalInfo && (
              <div className="mt-6 w-full animate-in text-sm leading-relaxed font-semibold text-[#AF2144] duration-300 fade-in slide-in-from-top-1">
                <Markdown
                  content={selectedOption.additionalInfo}
                  className="prose-[#AF2144] prose-sm max-w-none"
                  variant="light"
                />
              </div>
            )}

            {/* Navigation row */}
            <div className="mt-10 flex items-center justify-between border-t border-[#4C6549]/10 pt-6">
              {currentStepIndex > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-extrabold text-[#594143] transition-colors hover:text-[#1A1C19] focus:outline-none sm:text-base"
                >
                  <ArrowLeft className="size-4" /> Back
                </button>
              ) : (
                <div /> // Empty block to align button right
              )}

              <button
                onClick={handleNext}
                disabled={!selectedValue || isDisqualified}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border-2 border-[#4C6549] px-6 py-4 font-black text-white transition-all duration-200 focus:outline-none",
                  selectedValue && !isDisqualified
                    ? "cursor-pointer bg-[#AF2144] shadow-[4px_4px_0px_0px_#344D32] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#961a37] hover:shadow-[2px_2px_0px_0px_#344D32]"
                    : "cursor-not-allowed border-[#4C6549]/40 bg-[#AF2144]/40 text-white/50 shadow-none"
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
