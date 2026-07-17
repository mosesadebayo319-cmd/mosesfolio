import Link from 'next/link'
import Image from 'next/image'
import { caseStudies, whatsappHireUrl } from '@/src/data/content'

export const metadata = {
  title: 'Case Studies',
  description:
    'Real marketing and growth case studies: social, SEO, ads, and content—with measurable outcomes.',
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Case Studies</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Challenge, strategy, execution, and results. Where possible,
              clients are named; some commercial projects stay confidential by
              request.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="space-y-24">
            {caseStudies.map((study, i) => (
              <article
                key={study.id}
                id={study.id}
                className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="rounded-xl overflow-hidden border border-border relative h-80 md:h-96">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <p className="text-accent text-sm font-semibold mb-2">
                    {study.category}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    {study.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6">
                    <span className="px-3 py-1 rounded-full border border-border">
                      {study.client}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-border">
                      {study.industry}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-border">
                      {study.timeframe}
                    </span>
                  </div>
                  <div className="space-y-5 mb-8">
                    <div>
                      <h3 className="font-semibold text-accent mb-2">
                        The challenge
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {study.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent mb-2">
                        The strategy
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {study.strategy}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent mb-2">
                        The execution
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {study.execution}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border mb-6">
                    <h3 className="font-semibold mb-4">Results</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        [study.results.metric1, study.results.label1],
                        [study.results.metric2, study.results.label2],
                        [study.results.metric3, study.results.label3],
                      ].map(([m, l]) => (
                        <div key={l} className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-accent mb-1">
                            {m}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 bg-background rounded-xl border border-border">
                    <p className="text-muted-foreground italic text-sm mb-2">
                      &ldquo;{study.testimonial}&rdquo;
                    </p>
                    <p className="font-semibold text-sm">
                      {study.testimonialAuthor}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="container text-center max-w-2xl">
          <h2 className="section-heading mb-4">Want results like these?</h2>
          <p className="text-muted-foreground mb-8">
            Share your goals—I&apos;ll tell you honestly if I&apos;m the right
            fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappHireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              WhatsApp Moses
            </a>
            <Link href="/contact" className="secondary-button">
              Send a project brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
