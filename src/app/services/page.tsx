import Link from 'next/link'
import { processSteps, services } from '@/src/data/content'

export const metadata = {
  title: 'Services | Moses Oluwashina Adebayo',
  description:
    'Digital marketing and web development solutions: SEO, social media, content, campaigns, email, consulting, and websites.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive digital marketing and web development solutions
              designed to grow your business. From SEO and social media to
              modern websites, I provide the expertise you need to succeed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all duration-300 card-hover"
              >
                <h3 className="text-2xl font-heading font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-muted-foreground text-sm"
                      >
                        <span className="text-accent">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6 pb-6 border-b border-border">
                  <h4 className="font-semibold mb-3">Deliverables:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex gap-2 text-muted-foreground text-sm"
                      >
                        <span className="text-accent">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-accent font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">My Process</h2>
            <p className="section-subtitle">
              How I deliver results for your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-background rounded-xl border border-border text-center"
              >
                <p className="text-3xl font-display font-bold text-accent mb-4">
                  {step.step}
                </p>
                <h3 className="text-lg font-heading font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let&apos;s discuss your goals and find the perfect service package
              for your business.
            </p>
            <Link href="/contact" className="cta-button">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
