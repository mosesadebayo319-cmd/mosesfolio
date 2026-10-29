import type { Metadata } from 'next'
import { pageSeo } from '@/src/data/content'
import { getPublicTestimonials } from '@/src/lib/content-loader'
import { PageIntro, ProjectCTA } from '@/src/components/CreativeSections'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: pageSeo.testimonials.title,
  description: pageSeo.testimonials.description,
  alternates: { canonical: '/testimonials' },
}
export default async function TestimonialsPage() {
  const testimonials = await getPublicTestimonials()
  return (
    <>
      <PageIntro
        label="IN THEIR WORDS"
        title="Good work."
        accent="Good company."
      >
        <p>A few words from the people I’ve worked alongside.</p>
      </PageIntro>
      <section className="cr-section cr-wrap cr-testimonial-grid">
        {testimonials.map((t) => (
          <article
            className="cr-testimonial"
            key={t.name + t.company}
            data-reveal
          >
            <span aria-hidden="true">“</span>
            <blockquote>
              <p>{t.text}</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
                {t.link && t.link !== '#' && (
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cr-text-link"
                  >
                    {t.company || 'Visit company'} ↗
                  </a>
                )}
              </footer>
            </blockquote>
          </article>
        ))}
      </section>
      <ProjectCTA />
    </>
  )
}
