import { Skeleton } from "@/components/ui/skeleton"

export default function SlugLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAF5] font-sans">
      {/* 1. HERO SKELETON WITH ROTATED FRAMES */}
      <div 
        className="w-full py-20 md:py-24"
        style={{
          background:
            "linear-gradient(109.99deg, #F4F8E5 0%, #F4F8E5 35%, #F4F8E5 70%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Content Column */}
            <div className="col-span-1 flex flex-col justify-center lg:col-span-7">
              {/* Tag pill placeholder */}
              <Skeleton className="h-6 w-32 rounded-full bg-[#E2E7D5] mb-6" />
              
              {/* Mega Title placeholder */}
              <div className="mb-6 flex flex-col gap-3">
                <Skeleton className="h-10 w-11/12 rounded-xl bg-[#E2E7D5] md:h-12" />
                <Skeleton className="h-10 w-8/12 rounded-xl bg-[#E2E7D5] md:h-12" />
              </div>
              
              {/* Description Paragraph placeholder */}
              <div className="mb-8 flex flex-col gap-2">
                <Skeleton className="h-4 w-full rounded-full bg-[#E2E7D5]" />
                <Skeleton className="h-4 w-11/12 rounded-full bg-[#E2E7D5]" />
                <Skeleton className="h-4 w-9/12 rounded-full bg-[#E2E7D5]" />
              </div>
              
              {/* Check items list placeholder */}
              <div className="mb-10 flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    {/* Circle checkbox indicator */}
                    <Skeleton className="h-6 w-6 shrink-0 rounded-full bg-[#E2E7D5]" />
                    {/* Text item line */}
                    <Skeleton className="h-4 w-1/2 rounded-full bg-[#E2E7D5]" />
                  </div>
                ))}
              </div>
              
              {/* Button placeholder row */}
              <div className="flex gap-4">
                {/* Primary Button */}
                <Skeleton className="h-12 w-40 rounded-xl bg-[#E2E7D5] border-2 border-transparent shadow-[4px_4px_0px_0px_#E2E7D5]" />
                {/* Secondary Button */}
                <Skeleton className="h-12 w-32 rounded-xl bg-white border-2 border-[#E2E7D5]" />
              </div>
            </div>
            
            {/* Right rotated illustration placeholder */}
            <div className="relative col-span-1 lg:col-span-5">
              <div className="relative mx-auto aspect-[1.15/1] w-full max-w-[500px] lg:max-w-none">
                {/* Rotated frame behind */}
                <div className="absolute -inset-4 rounded-xl border-[1.81px] border-[#E2E7D5] bg-[#EAF0D8] z-0 -rotate-2 transform" />
                {/* Front White canvas */}
                <Skeleton className="absolute inset-0 z-10 rounded-xl bg-white border-[1.81px] border-[#E2E7D5] flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-[#EAF0D8]/40 flex items-center justify-center">
                    <div className="h-8 w-8 rounded bg-[#EAF0D8]" />
                  </div>
                </Skeleton>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* 2. THREE-COLUMN FEATURES GRID SKELETON */}
      <div className="w-full py-16 md:py-24 bg-[#F9FAF5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section title skeleton */}
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <Skeleton className="h-5 w-24 rounded-full bg-[#E2E7D5]" />
            <Skeleton className="h-8 w-64 rounded-xl bg-[#E2E7D5]" />
            <Skeleton className="h-4 w-96 rounded-full bg-[#E2E7D5]" />
          </div>
          
          {/* Features cards grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className="rounded-2xl border-2 border-[#E2E7D5] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] flex flex-col gap-4"
              >
                {/* Icon blob */}
                <Skeleton className="h-12 w-12 rounded-xl bg-[#E2E7D5]" />
                
                {/* Title */}
                <Skeleton className="h-6 w-3/4 rounded-lg bg-[#E2E7D5] mt-2" />
                
                {/* Divider */}
                <div className="h-0.5 w-full bg-[#E2E7D5]/40 my-1" />
                
                {/* Description lines */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3.5 w-full rounded-full bg-[#E2E7D5]" />
                  <Skeleton className="h-3.5 w-5/6 rounded-full bg-[#E2E7D5]" />
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}
