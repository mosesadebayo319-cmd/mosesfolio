import Link from 'next/link'
import Image from 'next/image'
import {
  clients,
  coreExpertise,
  featuredProjects,
  homeTestimonials,
  processSteps,
  site,
  stats,
  whatsappHireUrl,
} from '@/src/data/content'
import { ServiceIcon } from '@/src/components/Icons'
import ScrollReveal from '@/src/components/ScrollReveal'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                Abuja · Digital growth partner
              </p>
              <div className="accent-line mb-8" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                I help Nigerian brands get more leads with marketing that
                measures up.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
                SEO, social media, paid campaigns, and conversion-focused
                websites—planned and executed so founders see clear results, not
                vanity metrics.
              </p>
              <p className="text-accent font-medium mb-8">{site.tagline}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappHireUrl}
                  className="cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
                <Link href="/case-studies" className="secondary-button">
                  See the work
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/40 shadow-2xl shadow-accent/10">
                  <Image
                    src="/hero/hero.jpg"
                    alt={`${site.name} — Digital Marketing Specialist`}
                    fill
                    priority
                    sizes="(max-width:768px) 320px, 384px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">How I help you grow</h2>
            <p className="section-subtitle">
              Three flagship offers—plus leadership when you need someone to own
              delivery end-to-end.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreExpertise.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 60}>
                <div className="p-8 h-full bg-card rounded-xl border border-border hover:border-accent card-hover">
                  <div className="text-accent mb-4">
                    <ServiceIcon name={item.icon} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="secondary-button">
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Trusted by
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Clients & partners
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {clients.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-background rounded-xl border border-border hover:border-accent transition-all flex flex-col items-center"
              >
                <div className="w-16 h-16 mb-3 relative">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain"
                    unoptimized
                    sizes="64px"
                  />
                </div>
                <h3 className="font-semibold text-sm text-center group-hover:text-accent">
                  {client.name}
                </h3>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {client.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies preview */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Selected work</h2>
            <p className="section-subtitle">Outcomes from real engagements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 80}>
                <article className="group overflow-hidden rounded-xl border border-border hover:border-accent card-hover bg-card h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-accent text-sm font-semibold mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {project.result}
                    </p>
                    <Link
                      href={project.href}
                      className="text-accent font-semibold text-sm hover:underline"
                    >
                      Read case study →
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center">
            <Link href="/case-studies" className="secondary-button">
              All case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">A simple process</h2>
            <p className="section-subtitle">From clarity to measurable growth</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-background rounded-xl border border-border text-center"
              >
                <p className="text-3xl font-display font-bold text-accent mb-3">
                  {step.step}
                </p>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">What clients say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeTestimonials.map((t) => (
              <blockquote
                key={t.name}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all flex flex-col"
              >
                <div
                  className="flex gap-1 mb-4 text-accent"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.role} ·{' '}
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {t.company}
                    </a>
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-card border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading mb-6">
              Ready for growth you can measure?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tell me your goal—leads, visibility, or a site that converts. I
              usually reply within {site.responseTime.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappHireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                WhatsApp me
              </a>
              <Link href="/contact" className="secondary-button">
                Send a brief
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
