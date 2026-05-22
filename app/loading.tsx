export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center font-sans">
      {/* Isolated background blur layer to ensure 60FPS animation rendering */}
      <div className="absolute inset-0 -z-10 bg-[#F9FAF5]/10 backdrop-blur-md transform-gpu" />

      <div className="relative flex items-center justify-center">
        {/* Decorative outer pulsing accent circle */}
        <div
          className="absolute h-24 w-24 animate-ping rounded-full bg-[#CEEE8D]/40 transform-gpu"
          style={{ animationDuration: "2s" }}
        />

        {/* Premium multi-layered spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center transform-gpu">
          {/* Accent Pink outer spinner */}
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#E94E6B] border-r-[#E94E6B]"
            style={{ animationDuration: "1s" }}
          />

          {/* Pine Green inner counter-rotating spinner */}
          <div
            className="absolute h-10 w-10 animate-spin rounded-full border-4 border-transparent border-b-[#064E3B] border-l-[#064E3B]"
            style={{ animationDuration: "0.75s", animationDirection: "reverse" }}
          />

          {/* Center core brand dot */}
          <div className="h-3 w-3 rounded-full bg-[#064E3B]" />
        </div>
      </div>

      {/* Brand branding and indicators */}
      <div className="mt-8 flex gap-2 items-center justify-center text-center transform-gpu">
        <h2 className="text-lg font-extrabold tracking-tight text-[#064E3B] sm:text-xl">
          Loading
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#E94E6B]" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#064E3B]" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#CEEE8D]" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
