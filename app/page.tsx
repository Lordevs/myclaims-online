import { TrustBanner } from "@/components/sections/trust-banner"
import { OneCallCTA } from "@/components/sections/one-call-cta"
import { HowItWorks } from "@/components/sections/how-it-works"
import { WhatWeOffer } from "@/components/sections/what-we-offer"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { FAQSection } from "@/components/sections/faq"
import { GetInTouch } from "@/components/sections/get-in-touch"
import { ClaimsSupport } from "@/components/sections/claims-support"
import { InfoBanner } from "@/components/sections/info-banner"

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#F9FAF5] flex flex-col">
      <WhatWeOffer />
      <ClaimsSupport />
      
      {/* Green Variant: Car Accident Claims Made Simple */}
      <InfoBanner
        variant="green"
        title="Car Accident Claims Made Simple"
        paragraphs="Being involved in a road traffic accident is stressful enough without the headache of insurance paperwork and finding a temporary car. At My Claims Online, we specialise in helping drivers who weren't at fault get back on the road immediately. We bypass the long wait times of traditional insurers to provide a direct, human-centric recovery and replacement service."
      />

      <HowItWorks />
      <WhyChooseUs />

      {/* Pink Variant: Non-Fault Car Accident Claims UK */}
      <InfoBanner
        variant="pink"
        title="Non-Fault Car Accident Claims UK"
        paragraphs={[
          "If you have been involved in a car accident that was not your fault, you have specific legal rights under UK law. Many drivers believe they must only contact their insurance company, but using a dedicated claims management service often results in better replacement vehicle options and more personalized support.",
          "We specialize in the recovery of reasonable expenses, including car hire costs and loss of earnings. Our legal partners ensure that the negligent party's insurance company fulfills their obligations to return you to the position you were in before the incident occurred."
        ]}
      />

      <OneCallCTA />
      <TrustBanner />
      <FAQSection />
      <GetInTouch />
    </div>
  )
}


