'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (
      !el ||
      typeof IntersectionObserver === 'undefined' ||
      typeof el.animate !== 'function' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.animate(
          [
            { opacity: 0.8, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 450, delay, easing: 'ease-out' }
        )
        observer.disconnect()
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
