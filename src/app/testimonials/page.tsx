import type { Metadata } from 'next'
import Link from 'next/link'
import { pageSeo, whatsappHireUrl } from '@/src/data/content'
import { getPublicTestimonials } from '@/src/lib/content-loader'

export const metadata: Metadata = {
  title: pageSeo.testimonials.title,
  description: pageSeo.testimonials.description,
  alternates: { canonical: '/testimonials' },
}

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  const fullTestimonials = await getPublicTestimonials()

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-card">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="accent-line mx-auto mb-6" />
          <h1 className="section-heading mb-6">Client feedback</h1>
          <p className="text-xl text-muted-foreground">
            Leaders I&apos;ve supported with strategy and execution.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          {fullTestimonials.map((t) => (
            <blockquote
              key={t.name + t.company + t.text.slice(0, 20)}
              className="p-8 bg-card rounded-xl border border-border flex flex-col"
            >
              <div
                className="flex gap-1 mb-4 text-accent"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6 flex-1 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {[t.role, t.company].filter(Boolean).join(', ')}
                  {t.link && t.link !== '#' && (
                    <>
                      {' · '}
                      <a
                        href={t.link}
                        className="text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    </>
                  )}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="py-16 bg-card text-center border-t border-border">
        <div className="container flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/case-studies" className="secondary-button">
            See case studies
          </Link>
          <a
            href={whatsappHireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Work with me
          </a>
        </div>
      </section>
    </div>
  )
}
