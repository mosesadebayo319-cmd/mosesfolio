import type { Metadata } from 'next'
import { pageSeo, experienceRoles, leadershipTraits } from '@/src/data/content'
import {
  PageIntro,
  SectionHeading,
  ProjectCTA,
} from '@/src/components/CreativeSections'
export const metadata: Metadata = {
  title: pageSeo.experience.title,
  description: pageSeo.experience.description,
  alternates: { canonical: '/experience' },
}
export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        label="THE JOURNEY SO FAR"
        title="Different teams."
        accent="A shared drive."
      >
        <p>
          Marketing, project coordination, coding mentorship, and product
          development. Experience shaped by the people and problems along the
          way.
        </p>
        <a
          href="/Moses-Adebayo-CV.pdf"
          download
          className="cr-button cr-button-dark"
        >
          Download my CV ↓
        </a>
      </PageIntro>
      <section className="cr-section cr-wrap">
        {experienceRoles.map((r, i) => (
          <article className="cr-role" key={r.company + r.role} data-reveal>
            <div className="cr-role-head">
              <div>
                <p className="cr-eyebrow">0{i + 1} / EXPERIENCE</p>
                <h2>
                  {r.link ? (
                    <a href={r.link} target="_blank" rel="noopener noreferrer">
                      {r.company} ↗
                    </a>
                  ) : (
                    r.company
                  )}
                </h2>
              </div>
              <div>
                <h3>{r.role}</h3>
                <span>{r.period.replace(/–/g, 'to')}</span>
              </div>
            </div>
            {(r.responsibilities.length > 0 || r.impact.length > 0) && (
              <div className="cr-role-list">
                <div>
                  <h4>THE FOCUS</h4>
                  <ul>
                    {r.responsibilities.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>THE CONTRIBUTION</h4>
                  <ul>
                    {r.impact.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>
      <section className="cr-section cr-process">
        <div className="cr-wrap">
          <SectionHeading label="BEYOND A JOB TITLE" title="How I show up." />
          <div className="cr-values">
            {leadershipTraits.map((t) => (
              <div key={t.title}>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProjectCTA />
    </>
  )
}
