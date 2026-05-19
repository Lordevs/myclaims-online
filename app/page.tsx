import { TrustBanner } from "@/components/sections/trust-banner"
import { FAQSection } from "@/components/sections/faq"
import { GetInTouch } from "@/components/sections/get-in-touch"

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#F9FAF5] flex flex-col">
      <TrustBanner />
      <FAQSection />
      <GetInTouch />
    </div>
  )
}
