import Link from "next/link"
import type { Metadata } from "next"
import { FileQuestion, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-[#F9FAF5] px-4 py-16 text-center font-sans">
      <div className="group relative mx-auto mb-10 w-full max-w-[340px] sm:max-w-[400px]">
        {/* Rotated decorative lime card behind */}
        <div className="absolute -inset-2 transform rotate-3 rounded-2xl border-2 border-[#064E3B] bg-[#CEEE8D] shadow-[4px_4px_0px_0px_#064E3B] transition-all duration-300 group-hover:rotate-0 group-hover:scale-[1.02]" />

        {/* Main card */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#064E3B] bg-white p-8 sm:p-10 shadow-none">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#064E3B] bg-[#CEEBC7] text-[#064E3B]">
            <FileQuestion className="h-10 w-10" />
          </div>

          <span className="text-7xl font-extrabold tracking-tighter text-[#064E3B] sm:text-8xl">
            404
          </span>
          <div className="mt-2 h-1.5 w-16 rounded-full bg-[#E94E6B]" />
        </div>
      </div>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-[#064E3B] sm:text-4xl md:text-5xl">
        Page Not Found
      </h1>

      <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-[#4C6549] sm:text-base">
        The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
        Let&apos;s get you back on track to resolving your claim.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#064E3B] bg-[#E94E6B] px-8 py-4 text-sm font-bold text-white shadow-[4px_4px_0px_0px_#064E3B] transition-all hover:bg-[#d0425c] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#064E3B] active:translate-y-[4px] active:shadow-none sm:text-base"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  )
}
