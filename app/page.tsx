import { TrustBanner } from "@/components/sections/trust-banner"
import { OneCallCTA } from "@/components/sections/one-call-cta"
import { GreenCTASection } from "@/components/sections/green-cta-section"
import { ClaimsJourney } from "@/components/sections/claims-journey"
import { WhatWeOffer } from "@/components/sections/what-we-offer"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { FAQSection } from "@/components/sections/faq"
import { GetInTouch } from "@/components/sections/get-in-touch"
import { ClaimsSupport } from "@/components/sections/claims-support"
import { InfoBanner } from "@/components/sections/info-banner"
import { ImageWithListSection } from "@/components/sections/image-with-list-section"
import { ClaimsCardCTA } from "@/components/sections/claims-card-cta"
import { SimpleLinkCTA } from "@/components/sections/simple-link-cta"
import { TextColumnsSection } from "@/components/sections/text-columns-section"
import { ClaimFormSection } from "@/components/sections/claim-form-section"
import { FormHero } from "@/components/sections/form-hero"
import Hero from "@/components/sections/hero"
import DetailedEnquirySection from "@/components/sections/detailed-enquiry-section"
import { StrategicHubSection } from "@/components/sections/strategic-hub-section"
import { ClaimsQuizSection } from "@/components/sections/claims-quiz-section"
import { getPageBySlug } from "@/lib/strapi/services/page"
import { DynamicZoneRenderer } from "@/components/strapi/dynamic-zone-renderer"

export default async function Page() {
  const page = await getPageBySlug("home").catch(() => null)

  if (page?.blocks?.length) {
    return <DynamicZoneRenderer sections={page.blocks} />
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAF5]">
      {/* High-converting Form Hero Section with 2-column checklist and lead form */}
      <FormHero
        title="Had an Accident? Need a Replacement Vehicle Fast?"
        description="We manage your entire claim, provide a like for like replacement vehicle, and deal with insurers so you don't have to."
        listItems={[
          "Car, Taxi, Motorbike, Cycle & E-Scooter Claims",
          "Replacement Vehicles Within 24 Hours",
          "Approved Repairs at Trusted Garages",
          "No Upfront Costs & Nationwide Service",
          "Expert Claims Management & Support",
          "Direct Insurance Company Liaison",
          "Vehicle Recovery & Towing Services",
          "Free Legal Consultation & Advice",
        ]}
        imageSrc="/form-hero-placeholder.avif"
        imageAlt="Instant Vehicle Replacement Diagram"
      />

      <WhatWeOffer />
      <ClaimsSupport />
      <Hero
        title="Electric Vehicle Accident Claim"
        description="If you have been involved in a non fault car accident, we manage your claim, provide a like for like Electric vehicle, and deal with insurers so you do not have to."
      />

      {/* Specialist Vehicle Support Section with Offset Decorative Image */}
      <ImageWithListSection
        title="Specialist Car Vehicle Support"
        imageSrc="/car_claims_illustration.png"
        imageAlt="Specialist Car Vehicle Support Collision Graphic"
        listItems={[
          "Safe handling of high voltage battery systems",
          "Recovery by trained EV specialists",
          "Repairs by EV approved centres",
          "Correct assessment of battery damage",
          "Compliance with manufacturer standards",
        ]}
      />

      {/* Taxi, Uber and Private Hire Accident Claims UK Split Text Section */}
      <TextColumnsSection
        title="Taxi, Uber and Private Hire Accident Claims UK"
        col1Text="For most drivers, an accident is an inconvenience. For a taxi or private hire driver, it's a potential disaster for their livelihood. Our mission is to minimize downtime and ensure that professional drivers are not unfairly penalized for non-fault accidents. Whether you operate in London, Manchester, Birmingham, or any other UK city, our nationwide network provides local support with the power of a national organization."
        col2Text="Minimizing downtime is our priority. We understand that every day your car is in the garage is a day you aren't earning. That's why we focus on immediate replacement vehicle provision and rapid repair authorization. Our dedicated handlers are experts in the specific requirements of licensing authorities, ensuring that your replacement vehicle is fully compliant and ready for work the moment it arrives."
      />

      {/* Green Variant: Car Accident Claims Made Simple */}
      <InfoBanner
        variant="green"
        title="Car Accident Claims Made Simple"
        paragraphs="Being involved in a road traffic accident is stressful enough without the headache of insurance paperwork and finding a temporary car. At My Claims Online, we specialise in helping drivers who weren't at fault get back on the road immediately. We bypass the long wait times of traditional insurers to provide a direct, human-centric recovery and replacement service."
      />

      {/* The Claims Journey horizontal process steps section */}
      <ClaimsJourney />

      {/* Card Call-To-Action Banner: Motorcycle Accident Claims */}
      <ClaimsCardCTA
        title="Motorcycle accident that was not your fault?"
        description="Let us handle everything so you can focus on recovery. Our team is ready to get you back on the road."
        primaryBtnText="Start My Claim"
        primaryBtnHref="#enquiry-form"
        secondaryBtnText="Call Now"
        secondaryBtnHref="tel:07930444467"
      />

      {/* Green Premium Gradient Call-To-Action Section */}
      <GreenCTASection
        title="Speak to a Specialist Today"
        subtitle="We provide immediate legal support and vehicle recovery."
        buttonLabel="0800 123 4567"
        buttonHref="tel:08001234567"
      />

      <WhyChooseUs />

      {/* Pink Variant: Non-Fault Car Accident Claims UK */}
      <InfoBanner
        variant="pink"
        title="Non-Fault Car Accident Claims UK"
        paragraphs={[
          "If you have been involved in a car accident that was not your fault, you have specific legal rights under UK law. Many drivers believe they must only contact their insurance company, but using a dedicated claims management service often results in better replacement vehicle options and more personalized support.",
          "We specialize in the recovery of reasonable expenses, including car hire costs and loss of earnings. Our legal partners ensure that the negligent party's insurance company fulfills their obligations to return you to the position you were in before the incident occurred.",
        ]}
      />

      {/* Simple Link CTA: Cycle or E-scooter accident */}
      <SimpleLinkCTA
        badgeText="Last chance to claim"
        headingText="Cycle or e-scooter accident that was not your fault?"
        linkText="Check your eligibility now in 60 seconds"
        linkHref="#enquiry-form"
      />
      <ClaimsQuizSection />
      <ClaimFormSection />
      <OneCallCTA />
      <TrustBanner />

      {/* Detailed Neobrutalist Enquiry Contact form section */}
      <DetailedEnquirySection />

      <StrategicHubSection mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751425.615026245!2d10.70729312483807!3d47.66617990769023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4772450c52567ecd%3A0xe5f31a6eaf21f6c8!2sMyClaims%20Schadensregulierung%20e.U.!5e0!3m2!1sen!2s!4v1779262825760!5m2!1sen!2s" />

      <FAQSection />
      <GetInTouch />
    </div>
  )
}
