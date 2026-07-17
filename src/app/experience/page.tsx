import Link from 'next/link'
import {
  coreCompetencies,
  experienceRoles,
  leadershipTraits,
  whatsappHireUrl,
} from '@/src/data/content'

export const metadata = {
  title: 'Experience',
  description:
    'Professional experience in digital marketing, mentoring, and project leadership.',
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Experience</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Digital transformation, team leadership, and measurable growth
              across education, non-profit, and service businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-3xl">
          <div className="pl-2">
            {experienceRoles.map((role) => (
              <div key={role.role + role.company} className="timeline-item">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-accent">
                      {role.role}
                    </h2>
                    <p className="font-medium">
                      {role.link ? (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent"
                        >
                          {role.company}
                        </a>
                      ) : (
                        role.company
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.period}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Focus</h3>
                    <ul className="space-y-1.5">
                      {role.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-accent">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Impact</h3>
                    <ul className="space-y-1.5">
                      {role.impact.map((imp) => (
                        <li
                          key={imp}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-accent">✓</span>
                          {imp}
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

      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="section-heading text-center mb-8">Competencies</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {coreCompetencies.map((c) => (
              <span
                key={c}
                className="px-4 py-2 bg-background border border-border rounded-lg text-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="section-heading text-center mb-12">
            Leadership strengths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipTraits.map((t) => (
              <div
                key={t.title}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <h3 className="font-semibold text-accent mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border text-center">
        <div className="container">
          <Link href="/about" className="secondary-button mr-3 mb-3 inline-flex">
            About Moses
          </Link>
          <a
            href={whatsappHireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex"
          >
            Hire me
          </a>
        </div>
      </section>
    </div>
  )
}
