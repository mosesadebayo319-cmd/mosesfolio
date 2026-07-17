import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/src/data/content'

export const metadata = {
  title: 'Portfolio | Moses Oluwashina Adebayo',
  description:
    'Case studies and real results from digital marketing and project work.',
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Portfolio & Case Studies</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real projects, real results. Explore how I&apos;ve helped
              businesses achieve their digital marketing goals through strategic
              expertise and proven execution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="space-y-20">
            {caseStudies.map((study, i) => (
              <div
                key={study.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 relative h-96">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <p className="text-accent text-sm font-semibold mb-2">
                    {study.category}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                    {study.title}
                  </h2>
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold mb-3 text-accent">
                      The Challenge
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.problem}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold mb-3 text-accent">
                      The Strategy
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.strategy}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold mb-3 text-accent">
                      The Execution
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.execution}
                    </p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border mb-6">
                    <h3 className="font-heading font-semibold mb-4">Results</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-accent mb-1">
                          {study.results.metric1}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {study.results.label1}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-accent mb-1">
                          {study.results.metric2}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {study.results.label2}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-accent mb-1">
                          {study.results.metric3}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {study.results.label3}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-background rounded-xl border border-border">
                    <p className="text-muted-foreground italic mb-3">
                      &ldquo;{study.testimonial}&rdquo;
                    </p>
                    <p className="font-semibold text-sm">
                      {study.testimonialAuthor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let&apos;s discuss how I can help your business grow through
              strategic digital marketing and expert execution.
            </p>
            <Link href="/contact" className="cta-button">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
