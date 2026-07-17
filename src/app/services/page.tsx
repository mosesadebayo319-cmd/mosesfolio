import Link from 'next/link'
import {
  processSteps,
  servicePackages,
  whatsappHireUrl,
} from '@/src/data/content'
import { getPublicServices } from '@/src/lib/content-loader'

export const metadata = {
  title: 'Services',
  description:
    'Growth marketing, web presence, SEO, social, ads, and consulting for Nigerian brands and founders.',
}

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const services = await getPublicServices()

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Clear packages for growth—and detailed services when you know
              exactly what you need. Flagship offers are marked below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-heading">Start with a package</h2>
            <p className="section-subtitle">
              Pick the level of partnership that matches your stage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent card-hover flex flex-col"
              >
                <h3 className="text-2xl font-display font-bold mb-3 text-accent">
                  {pkg.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {pkg.description}
                </p>
                <ul className="space-y-2 mb-5 text-sm">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-muted-foreground">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mb-2">
                  <strong className="text-foreground">Best for:</strong>{' '}
                  {pkg.bestFor}
                </p>
                <p className="text-xs text-muted-foreground mb-5">
                  <strong className="text-foreground">Not for:</strong>{' '}
                  {pkg.notFor}
                </p>
                <p className="text-accent font-semibold text-sm mt-auto mb-4">
                  {pkg.pricing}
                </p>
                <a
                  href={whatsappHireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button text-sm !py-2.5 w-full"
                >
                  Discuss this package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-heading">All services</h2>
            <p className="section-subtitle">
              Deep-dive offerings—flagship services highlighted
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-28 p-8 bg-background rounded-xl border border-border hover:border-accent transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  {service.flagship && (
                    <span className="text-[10px] uppercase tracking-wide font-bold text-accent-foreground bg-accent px-2 py-1 rounded">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                  {service.description}
                </p>
                {service.bestFor && (
                  <p className="text-xs text-muted-foreground mb-4">
                    <strong className="text-foreground">Best for:</strong>{' '}
                    {service.bestFor}
                  </p>
                )}
                {!!service.benefits.length && (
                  <div className="mb-5">
                    <h4 className="font-semibold text-sm mb-2">Key benefits</h4>
                    <ul className="space-y-1.5">
                      {service.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex gap-2 text-muted-foreground text-sm"
                        >
                          <span className="text-accent">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!service.deliverables.length && (
                  <div className="mb-5 pb-5 border-b border-border">
                    <h4 className="font-semibold text-sm mb-2">Deliverables</h4>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex gap-2 text-muted-foreground text-sm"
                        >
                          <span className="text-accent">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-accent font-semibold text-sm mb-4">
                  {service.pricing}
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-foreground hover:text-accent"
                >
                  Enquire about {service.title} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-heading">How we work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-card rounded-xl border border-border text-center"
              >
                <p className="text-3xl font-display font-bold text-accent mb-3">
                  {step.step}
                </p>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="container text-center max-w-2xl">
          <h2 className="section-heading mb-4">Not sure which fit?</h2>
          <p className="text-muted-foreground mb-8">
            Message me with your goal—I&apos;ll recommend a package or a single
            service.
          </p>
          <a
            href={whatsappHireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Get a recommendation
          </a>
        </div>
      </section>
    </div>
  )
}
