"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertOctagon, RefreshCw, Home, ChevronRight, Terminal } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.error("[AppError]", error)
  }, [error])

  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-[#F9FAF5] px-4 py-16 text-center font-sans">
      <div className="group relative mx-auto mb-10 w-full max-w-[340px] sm:max-w-[400px]">
        {/* Rotated decorative pink card behind */}
        <div className="absolute -inset-2 transform -rotate-3 rounded-2xl border-2 border-[#064E3B] bg-[#E94E6B] shadow-[4px_4px_0px_0px_#064E3B] transition-all duration-300 group-hover:rotate-0 group-hover:scale-[1.02]" />
        
        {/* Main card */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#064E3B] bg-white p-8 sm:p-10 shadow-none">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#064E3B] bg-red-100 text-[#E94E6B]">
            <AlertOctagon className="h-10 w-10 text-[#E94E6B]" />
          </div>
          
          <span className="text-3xl font-extrabold tracking-tight text-[#064E3B] sm:text-4xl">
            System Error
          </span>
          <div className="mt-2 h-1.5 w-16 rounded-full bg-[#E94E6B]" />
        </div>
      </div>

      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-[#064E3B] sm:text-3xl md:text-4xl">
        Something went wrong
      </h1>
      
      <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-[#4C6549] sm:text-base">
        Our website encountered an unexpected error. Don&apos;t worry, your claim progress is safe. 
        Please try refreshing the page or head back to our homepage.
      </p>

      {/* Styled Developer details drawer */}
      {error && (
        <div className="mx-auto mb-10 w-full max-w-xl text-left">
          <div className="overflow-hidden rounded-xl border-2 border-[#064E3B] bg-[#F4F8E5] shadow-none">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between p-4 font-sans text-sm font-bold text-[#064E3B] transition-colors hover:bg-[#CEEBC7]/40"
            >
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#064E3B]" />
                <span>Technical details (Developer reference)</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
            
            <div
              className={`transition-all duration-300 ${
                isOpen ? "max-h-60 border-t-2 border-[#064E3B] p-4 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="max-h-48 overflow-y-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs text-green-400">
                <p className="font-semibold text-white mb-1">Error: {error.message || "Unknown error"}</p>
                {error.digest && <p className="text-zinc-400 mb-1">Digest: {error.digest}</p>}
                {error.stack && (
                  <pre className="mt-2 overflow-x-auto whitespace-pre text-[10px] text-zinc-500">
                    {error.stack}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        <button
          onClick={() => {
            startTransition(() => {
              router.refresh()
              reset()
            })
          }}
          disabled={isPending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#064E3B] bg-[#E94E6B] px-8 py-4 text-sm font-bold text-white shadow-[4px_4px_0px_0px_#064E3B] transition-all hover:bg-[#d0425c] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#064E3B] active:translate-y-[4px] active:shadow-none cursor-pointer sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-5 w-5 transition-transform ${isPending ? "animate-spin" : "group-hover:rotate-45"}`} />
          <span>{isPending ? "Retrying..." : "Try Again"}</span>
        </button>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#064E3B] bg-white px-8 py-4 text-sm font-bold text-[#064E3B] transition-all hover:bg-slate-50 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#064E3B] active:translate-y-[4px] active:shadow-none sm:text-base"
        >
          <Home className="h-5 w-5 text-[#064E3B]" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  )
}
