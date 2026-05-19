import * as React from "react"
import { HeartHandshake, Car, Wrench, RefreshCw, PoundSterling, Key } from "lucide-react"
import { FeaturesGridSection, FeatureCardItem } from "./features-grid-section"

/**
 * High-fidelity "What We Offer" section configured in Neo-Brutalist styling.
 * Displays interactive cards, circular icon containers, specific color tokens,
 * and a bottom CTA button.
 */
export function WhatWeOffer() {
  const offerItems: FeatureCardItem[] = [
    {
      icon: HeartHandshake,
      title: "Personal Injury Support",
      description: "Expert guidance to help you and your passengers claim compensation for any injuries sustained.",
    },
    {
      icon: Car,
      title: "Like-for-Like Replacement Vehicles",
      description: "Get a similar replacement vehicle to keep you moving without disruption.",
    },
    {
      icon: Wrench,
      title: "Approved Repairs",
      description: "Your vehicle is repaired by trusted, certified professionals to the highest standards.",
    },
    {
      icon: RefreshCw,
      title: "24/7 Recovery",
      description: "Round-the-clock vehicle recovery whenever and wherever you need it.",
    },
    {
      icon: PoundSterling,
      title: "Loss of Earnings / Expenses",
      description: "Claims back all your out of pocket expenses.",
    },
    {
      icon: Key,
      title: "Fully Managed Claim",
      description: "We manage your claim so you don't have to and keep you updated along the way.",
    },
  ]

  return (
    <FeaturesGridSection
      title="What We Offer"
      items={offerItems}
      bgClass="bg-[#F8FAEE]"
      titleColorClass="text-[#064E3B]"
      cardBgClass="bg-white"
      cardRadiusClass="rounded-tl-[13.5px] rounded-tr-[13.5px] rounded-br-[13.5px] rounded-bl-none"
      cardPaddingClass="p-[36px]"
      cardBorderClass="border-[2.25px] border-[#0F172A]"
      cardHeadingColorClass="text-[#111111]"
      cardDescColorClass="text-[#444444]"
      cardShadowClass="shadow-[4.5px_4.5px_0px_0px_#1A1C19]"
      iconColorClass="text-[#1A5C3A]"
      iconBgClass="bg-[#EAF5EE]"
      button={{
        label: "Start my claim ›",
        href: "#enquiry-form",
        bgClass: "bg-[#E6405E] hover:bg-[#c9324e]!",
        borderClass: "border-[1.16px] border-white",
        textColorClass: "text-white font-bold",
      }}
    />
  )
}

export default WhatWeOffer
