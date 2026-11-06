'use client'
import { useState } from 'react'
import type { PublicTestimonial } from '@/src/lib/content-loader'
export default function TestimonialSlider({
  testimonials,
}: {
  testimonials: PublicTestimonial[]
}) {
  const [index, setIndex] = useState(0)
  const item = testimonials[index]
  if (!item) return null
  return (
    <div className="jl-testimonial-card">
      <div aria-live="polite" aria-atomic="true">
        <blockquote key={index}>
          <p>{item.text}</p>
          <footer>
            <strong>{item.name}</strong>
            <span>{item.role}</span>
            {item.link && item.link !== '#' && (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.company}
              </a>
            )}
          </footer>
        </blockquote>
      </div>
      <div className="jl-testimonial-controls">
        <div>
          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={testimonials.length < 2}
            onClick={() =>
              setIndex((index - 1 + testimonials.length) % testimonials.length)
            }
          >
            Previous
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            disabled={testimonials.length < 2}
            onClick={() => setIndex((index + 1) % testimonials.length)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
