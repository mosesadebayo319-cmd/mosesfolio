import Link from 'next/link'
import Image from 'next/image'
import {
  clients,
  coreExpertise,
  featuredProjects,
  homeTestimonials,
} from '@/src/data/content'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/manus-storage/photo-output_1419f4d5.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="accent-line mb-8" />
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Digital Marketing Expert & Project Leader
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              I help businesses grow through strategic digital marketing, expert
              project management, and proven results. Let&apos;s transform your
              vision into measurable success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="cta-button group">
                Start Your Project
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link href="/portfolio" className="secondary-button">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Core Expertise</h2>
            <p className="section-subtitle">
              A comprehensive toolkit for digital success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreExpertise.map((item) => (
              <div
                key={item.title}
                className="p-8 bg-background rounded-xl border border-border hover:border-accent transition-all duration-300 card-hover"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Trusted By
            </p>
            <h2 className="section-heading">Clients & Partners</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-card rounded-xl border border-border hover:border-accent transition-all flex flex-col items-center"
              >
                <div className="w-20 h-20 mb-4 relative">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-center group-hover:text-accent transition-colors">
                  {client.name}
                </h3>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {client.description}
                </p>
              </a>
            ))}
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center mt-12 leading-relaxed">
            I&apos;ve had the privilege of working with innovative companies
            across tech, non-profit, ministry, and design sectors. Each
            partnership has strengthened my expertise in delivering measurable
            digital results.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subtitle">Real results from real clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-xl border border-border hover:border-accent transition-all duration-300 card-hover"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                <div className="p-6 bg-card">
                  <p className="text-accent text-sm font-semibold mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.result}
                  </p>
                  <Link
                    href="/portfolio"
                    className="text-accent font-semibold text-sm inline-flex items-center gap-2 hover:underline"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/portfolio" className="secondary-button">
              Explore All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Client Testimonials</h2>
            <p className="section-subtitle">
              What clients say about working with me
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeTestimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 bg-background rounded-xl border border-border hover:border-accent transition-all duration-300"
              >
                <div className="flex gap-1 mb-4 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-accent">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/abstract-digital-marketing.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Let&apos;s discuss your goals and create a strategy that delivers
              real results. Schedule a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="cta-button">
                Get In Touch
              </Link>
              <Link href="/portfolio" className="secondary-button">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
