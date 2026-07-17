import Link from 'next/link'
import {
  coreCompetencies,
  experienceRoles,
  leadershipTraits,
} from '@/src/data/content'

export const metadata = {
  title: 'Experience | Moses Oluwashina Adebayo',
  description:
    'Professional experience in digital marketing, mentoring, and project leadership.',
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Professional Experience</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive track record of driving digital transformation,
              building high-performing teams, and delivering measurable business
              results across diverse industries and roles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-10">
            {experienceRoles.map((role) => (
              <div
                key={role.role + role.company}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-heading font-semibold text-accent mb-1">
                      {role.role}
                    </h2>
                    <p className="text-lg font-medium">
                      {role.link ? (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {role.company}
                        </a>
                      ) : (
                        role.company
                      )}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2 md:mt-0">
                    {role.period}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {role.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-accent">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Impact</h3>
                    <ul className="space-y-2">
                      {role.impact.map((imp) => (
                        <li
                          key={imp}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-accent">✓</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Core Competencies</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {coreCompetencies.map((c) => (
              <span
                key={c}
                className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:border-accent transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Leadership Strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTraits.map((t) => (
              <div
                key={t.title}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all"
              >
                <h3 className="text-xl font-heading font-semibold mb-3 text-accent">
                  {t.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container text-center">
          <h2 className="section-heading mb-6">Let&apos;s Build Together</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looking for a digital marketing leader or project partner? Get in
            touch.
          </p>
          <Link href="/contact" className="cta-button">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
