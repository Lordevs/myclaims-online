import * as React from "react"
import { Award, Wallet, Car, Zap, Headphones, ShieldCheck } from "lucide-react"
import { FeaturesGridSection, FeatureCardItem } from "./features-grid-section"

/**
 * High-fidelity "Why Choose Us" section configured in Neo-Brutalist styling.
 * Displays interactive cards, raw pink icons, specific color tokens,
 * and no bottom CTA button to match the mockup design perfectly.
 */
export function WhyChooseUs() {
  const chooseItems: FeatureCardItem[] = [
    {
      icon: Award,
      title: "No Win No Fee",
      description: "You only pay if your claim is successful.",
    },
    {
      icon: Wallet,
      title: "No Upfront Costs",
      description: "You only pay if your claim is successful.",
    },
    {
      icon: Car,
      title: "All Vehicle Types Covered",
      description: "Cars, taxis, vans, bikes and more.",
    },
    {
      icon: Zap,
      title: "Fast Response",
      description: "We aim to contact you as quickly as possible.",
    },
    {
      icon: Headphones,
      title: "Dedicated Handlers",
      description: "A personal case manager from start to finish.",
    },
    {
      icon: ShieldCheck,
      title: "25+ Years Experience",
      description: "Industry expertise you can trust.",
    },
  ]

  return (
    <FeaturesGridSection
      title="Why Choose Us ?"
      items={chooseItems}
      bgClass="bg-[#F9FAF5]"
      titleColorClass="text-[#0F172A]"
      cardBgClass="bg-white"
      cardBorderClass="border-[2.25px] border-[#0F172A]"
      cardHeadingColorClass="text-[#0F172A]"
      cardDescColorClass="text-[#594143]"
      cardShadowClass="shadow-[4.5px_4.5px_0px_0px_#1A1C19]"
      iconColorClass="text-[#E94E6B]"
      iconBgClass={undefined} // No circular background container
    />
  )
}

export default WhyChooseUs
