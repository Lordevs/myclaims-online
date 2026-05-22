import { useState, useEffect } from "react"

/**
 * Hook to track window scroll position.
 * Useful for changing navbar background on scroll.
 */
export function useScroll(threshold = 0) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrolled
}
