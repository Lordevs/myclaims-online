import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/ui/animations"
import { cn } from "@/lib/utils"
import { Markdown } from "@/components/shared/markdown"

export interface TextColumnsSectionProps {
  /** Main section heading text */
  title: string
  /** Text content for the left column */
  col1Text: string
  /** Text content for the right column */
  col2Text: string
  /** Optional custom styling class */
  className?: string
}

/**
 * Reusable TextColumnsSection Component.
 * Features a modern, content-focused split layout:
 * - White background with a subtle border-bottom (1.13px solid #E2E3DE)
 * - Large left-aligned heading in pine green (#022C22)
 * - High-readability split text grid (2 columns on desktop) with color #594143
 */
export function TextColumnsSection({
  title,
  col1Text,
  col2Text,
  className,
}: TextColumnsSectionProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-white py-16 select-none md:py-20",
        "border-b-[1.13px] border-[#E2E3DE]",
        className
      )}
    >
      <Container>
        <FadeIn delay={0.1}>
          <div className="flex flex-col text-left">
            {/* Bold Left-aligned Heading */}
            <h2 className="mb-8 text-2xl leading-tight font-bold tracking-tight text-[#022C22] md:mb-10 md:text-3xl lg:text-[48px]">
              {title}
            </h2>

            {/* Split Paragraph Grid — dynamically adjusts layout if only one column is populated */}
            <div
              className={cn(
                "grid w-full grid-cols-1 gap-8 lg:gap-16",
                col2Text?.trim() ? "md:grid-cols-2 md:gap-12" : "max-w-3xl"
              )}
            >
              {/* Left Column Text */}
              <Markdown
                content={col1Text}
                variant="light"
                className="text-sm leading-relaxed font-normal text-[#594143] md:text-base lg:text-2xl"
              />

              {/* Right Column Text — only rendered if present */}
              {col2Text?.trim() && (
                <Markdown
                  content={col2Text}
                  variant="light"
                  className="text-sm leading-relaxed font-normal text-[#594143] md:text-base lg:text-2xl"
                />
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default TextColumnsSection
