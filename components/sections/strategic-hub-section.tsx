import { MapPin, Phone, Mail, LucideIcon } from "lucide-react"
import { Container } from "@/components/layout/container"
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
}

export interface StrategicHubItem {
  id: string | number
  title: string
  details: string
  icon: "map-pin" | "phone" | "mail" | string
  iconBg: "pink" | "green" | string
}

export interface StrategicHubSectionProps {
  /** Section header title */
  title?: string
  /** Section subtitle / description paragraph */
  description?: string
  /** List of contact points / hub locations */
  items?: StrategicHubItem[]
  /** Call-to-action button text */
  buttonText?: string
  /** Call-to-action button link URL */
  buttonLink?: string
  /** Optional Google Maps embed iframe URL (e.g. from Strapi) */
  mapEmbedUrl?: string
  /** Label for the marker inside the mock map */
  mapMarkerTitle?: string
  /** Custom extra styling classes */
  className?: string
}

const defaultItems: StrategicHubItem[] = [
  {
    id: 1,
    title: "Head Office",
    details:
      "The Point , 173 to 175 Cheetham Hill Road, Road, Manchester, M8 BLG",
    icon: "map-pin",
    iconBg: "pink",
  },
  {
    id: 2,
    title: "Freephone",
    details: "0800 123 4567",
    icon: "phone",
    iconBg: "green",
  },
  {
    id: 3,
    title: "Email Support",
    details: "support@myclaimsonline.co.uk",
    icon: "mail",
    iconBg: "pink",
  },
]

/**
 * Reusable, high-fidelity Strategic Hub contact and map section.
 * Features a dual-layout white & cool-sage framed card:
 * - Card Border: 1px solid #E7E9E4
 * - Card Shadows: 0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A
 * - Headings: #064E3B
 * - Paragraphs: #4C6549
 * - Contact icon square backgrounds: #AF21441A (pink) or #D1FAE5 (green)
 * - Custom structured SVG street mock map or responsive Google Map iframe fallback
 */
export function StrategicHubSection({
  title = "The Strategic Hub",
  description = "Our central headquarters in Manchester coordinates all claims across the United Kingdom.",
  items = defaultItems,
  buttonText = "Download Claim Guide",
  buttonLink = "#",
  mapEmbedUrl,
  mapMarkerTitle = "Deansgate HQ",
  className,
}: StrategicHubSectionProps) {
  return (
    <section
      className={cn(
        "bg-[#F9FAF5] py-20 font-sans select-none md:py-28",
        className
      )}
    >
      <Container>
        <div className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[#E7E9E4] bg-white shadow-[0px_8px_10px_-6px_#0000001A,0px_20px_25px_-5px_#0000001A] lg:min-h-[700px] lg:grid-cols-12">
          {/* LEFT COLUMN: Content & Contacts */}
          <div className="col-span-1 flex flex-col justify-start px-6 py-12 text-left sm:px-12 sm:py-16 lg:col-span-5">
            <FadeIn delay={0.1}>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#064E3B] sm:text-4xl">
                {title}
              </h2>
              <p className="mb-10 max-w-xl text-sm leading-relaxed font-medium text-[#4C6549] sm:text-base">
                {description}
              </p>
            </FadeIn>

            {/* Staggered Contact List */}
            <StaggerContainer
              delayChildren={0.2}
              staggerDelay={0.08}
              className="mb-10 flex flex-col gap-6"
            >
              {items.map((item) => {
                const IconComponent = iconMap[item.icon] || MapPin
                return (
                  <StaggerItem key={item.id}>
                    <div className="group flex items-start">
                      {/* Styled Rounded Icon Background */}
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
                          item.iconBg === "green"
                            ? "bg-[#D1FAE5]"
                            : "bg-[#AF21441A]"
                        )}
                      >
                        <IconComponent
                          className="h-5 w-5 text-[#1A1C19]"
                          strokeWidth={2.25}
                        />
                      </div>

                      {/* Contact Text Row */}
                      <div className="ml-4 flex flex-col justify-center text-left">
                        <h4 className="text-sm font-bold text-[#064E3B]">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 max-w-md text-xs leading-relaxed font-medium text-[#4C6549] sm:text-sm">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>

            {/* Custom Double-Border Button */}
            <FadeIn delay={0.4} className="flex justify-start">
              <a
                href={buttonLink}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-[#064E3B] px-8 py-3.5 text-sm font-bold text-[#064E3B] transition-all hover:bg-[#064E3B] hover:text-white active:scale-98"
              >
                {buttonText}
              </a>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Full-Bleed Map Canvas with Grayscale Toggle */}
          <div className="relative col-span-1 min-h-[420px] overflow-hidden bg-[#E1E6E3] shadow-inner grayscale transition-all duration-700 ease-out group-hover:grayscale-0 lg:col-span-7 lg:min-h-0">
            {mapEmbedUrl ? (
              /* Dynamic Fallback: Render Google Map Embed Iframe from Strapi */
              <iframe
                src={mapEmbedUrl}
                className="h-full min-h-[420px] w-full border-none lg:min-h-full"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* Premium 1:1 Pixel-Perfect SVG/CSS Styled Dark slate mockup map full bleed */
              <div className="absolute inset-0 overflow-hidden bg-[#576460]">
                {/* SVG Street Lines Overlay */}
                <svg
                  className="absolute inset-0 h-full w-full fill-none stroke-white/20"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Rivers / Parks layout */}
                  <path
                    d="M -10,40 C 30,50 60,30 110,45"
                    stroke="#485350"
                    strokeWidth="6"
                  />

                  {/* Major freeways */}
                  <path
                    d="M 50,-10 C 45,30 55,60 50,110"
                    strokeWidth="2.2"
                    stroke="white/25"
                  />
                  <path
                    d="M -10,30 C 40,40 60,20 110,35"
                    strokeWidth="1.8"
                    stroke="white/25"
                  />
                  <path
                    d="M -10,75 C 50,65 70,85 110,70"
                    strokeWidth="1.8"
                    stroke="white/25"
                  />

                  {/* Diagonal minor lines */}
                  <path
                    d="M 0,10 L 100,90"
                    strokeWidth="0.8"
                    strokeDasharray="1,1"
                    stroke="white/15"
                  />
                  <path
                    d="M 100,10 L 0,90"
                    strokeWidth="0.8"
                    strokeDasharray="1,1"
                    stroke="white/15"
                  />

                  {/* Secondary streets */}
                  <path
                    d="M 20,0 L 20,100"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                  <path
                    d="M 40,0 L 40,100"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                  <path
                    d="M 60,0 L 60,100"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                  <path
                    d="M 80,0 L 80,100"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                  <path
                    d="M 0,20 L 100,20"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                  <path
                    d="M 0,50 L 100,50"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                  <path
                    d="M 0,80 L 100,80"
                    strokeWidth="0.8"
                    stroke="white/15"
                  />
                </svg>

                {/* Glowing Circular Hot-Spot Marker */}
                <div className="absolute top-[50%] left-[50%] z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <span className="absolute inline-flex h-10 w-10 animate-ping rounded-full bg-[#AF2144]/40 opacity-75" />
                  <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-[#AF2144] shadow-md" />
                </div>

                {/* Styled HQ Badge Tag */}
                <div className="absolute top-[38%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#064E3B] px-3 py-1 text-[10px] font-black tracking-widest whitespace-nowrap text-white uppercase shadow-md select-none">
                  {mapMarkerTitle}
                </div>

                {/* Overlay Description Card */}
                <div className="absolute bottom-6 left-6 max-w-[220px] rounded-xl border border-white/10 bg-[#2D3331]/95 p-4 text-left text-white shadow-xl backdrop-blur-sm">
                  <h4 className="text-xs leading-tight font-black tracking-wider text-white uppercase">
                    Deansgate,
                  </h4>
                  <p className="mt-1.5 text-[10px] leading-relaxed font-semibold text-white/75">
                    173-175 Cheetham Hill Road, Manchester, M8 BLG
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
