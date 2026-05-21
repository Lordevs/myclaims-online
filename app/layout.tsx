import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/navigation/navbar"
import { Footer } from "@/components/layout/navigation/footer"
import { getGlobal } from "@/lib/strapi/services/global"

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
