import Link from 'next/link'
import { fullTestimonials } from '@/src/data/content'

export const metadata = {
  title: 'Testimonials | Moses Oluwashina Adebayo',
  description: 'What clients say about working with Moses Adebayo.',
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="section-heading mb-6">What Clients Say</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real feedback from leaders and organizations I&apos;ve had the
              privilege to work with. Their success is my success.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fullTestimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-4 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.role},{' '}
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {t.company}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container text-center">
          <h2 className="section-heading mb-6">Join These Success Stories</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to see similar results for your brand? Let&apos;s talk.
          </p>
          <Link href="/contact" className="cta-button">
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  )
}
