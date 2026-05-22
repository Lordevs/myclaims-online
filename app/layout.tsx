import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/navigation/navbar"
import { Footer } from "@/components/layout/footer"
import { getGlobal } from "@/lib/strapi/services/global"
import { getStrapiMedia } from "@/lib/strapi/utils"

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getGlobal()
  const faviconUrl = getStrapiMedia(globalData?.favicon?.url)

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://myclaimsonline.co.uk"
    ),
    title: {
      default: globalData?.siteName || "My Claims Online",
      template: `%s | ${globalData?.siteName || "My Claims Online"}`,
    },
    description:
      globalData?.siteDescription ||
      "My Claims Online — fast, no-win no-fee accident claims, vehicle replacement, and personal injury support across the UK.",
    icons: {
      icon: faviconUrl || "/favicon.ico",
      shortcut: faviconUrl || "/favicon.ico",
    },
    openGraph: {
      siteName: globalData?.siteName || "My Claims Online",
      type: "website",
      locale: "en_GB",
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "My Claims Online" }],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const globalData = await getGlobal()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="flex min-h-screen flex-col bg-background">
        <ThemeProvider>
          <Navbar globalData={globalData} />
          <main className="flex-1 pt-20">{children}</main>
          <Footer globalData={globalData} />
        </ThemeProvider>
      </body>
    </html>
  )
}
