import { TrustBanner } from "@/components/sections/trust-banner"
import { OneCallCTA } from "@/components/sections/one-call-cta"
import { HowItWorks } from "@/components/sections/how-it-works"
import { WhatWeOffer } from "@/components/sections/what-we-offer"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { FAQSection } from "@/components/sections/faq"
import { GetInTouch } from "@/components/sections/get-in-touch"

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#F9FAF5] flex flex-col">
      <WhatWeOffer />
      <HowItWorks />
      <WhyChooseUs />
      <OneCallCTA />
      <TrustBanner />
      <FAQSection />
      <GetInTouch />
    </div>
  )
}
