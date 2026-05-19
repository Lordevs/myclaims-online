import * as React from "react"
import { Contact, UserCheck, MessageSquare, Wallet } from "lucide-react"
import { StepsGridSection, StepItem } from "./steps-grid-section"

/**
 * High-fidelity "How It Works" section configured in Neo-Brutalist styling.
 * Displays step-by-step path, decorative pink numbers, red outline icons,
 * and elegant connector arrows.
 */
export function HowItWorks() {
  const steps: StepItem[] = [
    {
      icon: Contact,
      title: "Submit Your Enquiry",
      description: "Provide your details and a brief overview of the accident.",
    },
    {
      icon: UserCheck,
      title: "Case Review",
      description: "A dedicated handler reviews your situation.",
    },
    {
      icon: MessageSquare,
      title: "We Contact You",
      description: "We explain how we can assist and next steps.",
    },
    {
      icon: Wallet,
      title: "We Handle Everything",
      description: "We manage your claim, vehicle, and insurer communication.",
    },
  ]

  return (
    <StepsGridSection
      title="How It Works"
      titleHighlight="Works"
      items={steps}
    />
  )
}

export default HowItWorks
