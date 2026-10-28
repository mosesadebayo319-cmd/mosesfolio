import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import {
  experienceRoles,
  pageSeo,
  stats,
  processSteps,
} from '@/src/data/content'
import {
  getPublicProjects,
  getPublicTestimonials,
} from '@/src/lib/content-loader'
import {
  Burst,
  Arrow,
  Portrait,
  ProjectGallery,
  StartProject,
} from '@/src/components/CreativeUI'
import {
  Collaborators,
  ProjectCTA,
  SectionHeading,
} from '@/src/components/CreativeSections'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: { absolute: pageSeo.home.title },
  description: pageSeo.home.description,
  alternates: { canonical: '/' },
}
export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getPublicProjects(),
    getPublicTestimonials(),
  ])
  return (
    <>
      <section className="cr-hero cr-wrap">
        <div className="cr-hero-topline">
          <span className="cr-eyebrow">
            <span className="cr-dot" />
            INDEPENDENT MIND. CONNECTED SKILLS.
          </span>
          <span className="cr-location">ABUJA, NG</span>
        </div>
        <div className="cr-hero-grid">
          <div className="cr-hero-copy">
            <h1>
              Good ideas.
              <br />
              Bold moves.
              <br />
              <span className="cr-serif">Real impact.</span>
            </h1>
            <p>
              I’m Moses. A digital marketer & product developer connecting the
              dots between your next big idea and the people it’s made for.
            </p>
            <div className="cr-hero-actions">
              <Link href="/case-studies" className="cr-button cr-button-dark">
                Explore my work <Arrow />
              </Link>
              <StartProject className="cr-button-quiet" />
            </div>
          </div>
          <Portrait />
        </div>
        <div className="cr-hero-bottom">
          <div>
            <span className="cr-dot" />
            MARKETING MIND. BUILDER’S INSTINCT.
          </div>
          <a href="#selected-work">
            A little scroll goes a long way <span>↓</span>
          </a>
        </div>
      </section>
      <div className="cr-ribbon" aria-hidden="true">
        <div>
          {[0, 1].map((i) => (
            <span key={i}>
              STRATEGY{' '}
              <b>
                <Burst />
              </b>{' '}
              DIGITAL EXPERIENCES{' '}
              <b>
                <Burst />
              </b>{' '}
              MEANINGFUL GROWTH{' '}
              <b>
                <Burst />
              </b>{' '}
              IDEAS INTO ACTION{' '}
              <b>
                <Burst />
              </b>{' '}
            </span>
          ))}
        </div>
      </div>
      <section className="cr-section cr-wrap" id="selected-work">
        <SectionHeading
          label="01 / SELECTED WORK"
          title="Less talk. More making."
          link="All projects"
          href="/case-studies"
        />
        <ProjectGallery projects={projects.slice(0, 4)} compact />
      </section>
      <Collaborators />
      <section className="cr-section cr-ink">
        <div className="cr-wrap">
          <SectionHeading
            label="02 / WHAT I BRING"
            title="One curious mind. A useful mix."
          />
          <div className="cr-expertise-grid">
            {[
              {
                number: '01',
                title: 'Build a presence.',
                text: 'Websites and practical products that make your business easier to understand, use, and choose.',
                tags: 'WEBSITES / WEB PRODUCTS',
                mark: '↗',
              },
              {
                number: '02',
                title: 'Start a conversation.',
                text: 'Content, social strategy, and campaigns that help your message find the people who need it.',
                tags: 'CONTENT / SOCIAL / PAID ADS',
                mark: '✳︎',
              },
              {
                number: '03',
                title: 'Find your momentum.',
                text: 'Search visibility, measurement, and a clear plan to turn activity into informed next steps.',
                tags: 'SEO / ANALYTICS / STRATEGY',
                mark: '◎',
              },
            ].map((item) => (
              <Link
                href="/services"
                className="cr-expertise-card"
                key={item.number}
                data-reveal
              >
                <div className="cr-card-top">
                  <span>{item.number}</span>
                  <Arrow />
                </div>
                <span className="cr-expertise-mark" aria-hidden="true">
                  {item.mark === '↗' ? (
                    <Arrow />
                  ) : item.number === '02' ? (
                    <Burst />
                  ) : (
                    item.mark
                  )}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{item.tags}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="cr-section cr-wrap">
        <div className="cr-result-layout" data-reveal>
          <div>
            <p className="cr-eyebrow">03 / A CAMPAIGN, IN NUMBERS</p>
            <h2>
              Small campaign.
              <br />
              <span className="cr-serif">Visible reach.</span>
            </h2>
            <p>
              A three-day LinkedIn awareness campaign for Heroes Help’s Tickets
              for Troops initiative.
            </p>
            <Link
              className="cr-text-link"
              href="/case-studies#tickets-for-troops-linkedin"
            >
              See the complete story <Arrow />
            </Link>
          </div>
          <div className="cr-metric-grid">
            {stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
            <p>
              21–23 September 2026 · Awareness results. No leads or conversions
              recorded.
            </p>
          </div>
        </div>
      </section>
      <section className="cr-about-strip">
        <div className="cr-wrap cr-about-layout">
          <div className="cr-about-photo" data-reveal>
            <Image
              src="/about-moses.jpg"
              alt="Moses Adebayo"
              width={600}
              height={600}
              className="object-cover"
            />
            <span className="cr-photo-note">The person behind the pixels.</span>
          </div>
          <div data-reveal>
            <p className="cr-eyebrow">04 / A LITTLE ABOUT ME</p>
            <h2>
              Equal parts
              <br />
              strategy & <span className="cr-serif">getting it done.</span>
            </h2>
            <p>
              I like understanding how things work. Businesses, audiences,
              workflows. Then finding a clearer, more useful way forward.
            </p>
            <p>
              From building ImpactDesk for nonprofit reporting to running
              campaigns and mentoring new coders, I bring a practical approach
              to every brief.
            </p>
            <div className="cr-inline-actions">
              <Link href="/about" className="cr-button cr-button-dark">
                Meet Moses <Arrow />
              </Link>
              <a href="/Moses-Adebayo-CV.pdf" download className="cr-text-link">
                Download CV ↓
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="cr-section cr-wrap">
        <SectionHeading
          label="05 / ALWAYS BUILDING"
          title="Where I put it to work."
          link="My experience"
          href="/experience"
        />
        <div className="cr-role-preview">
          {experienceRoles.slice(0, 3).map((r, i) => (
            <Link href="/experience" key={r.company}>
              <span className="cr-role-index">0{i + 1}</span>
              <div>
                <h3>{r.company}</h3>
                <p>{r.role}</p>
              </div>
              <span className="cr-role-date">
                {r.period.replace(/–/g, 'to')}
              </span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="cr-section cr-process">
        <div className="cr-wrap">
          <SectionHeading
            label="06 / THE WAY WE WORK"
            title="A clear path from hello."
          />
          <div className="cr-process-grid">
            {processSteps.map((step) => (
              <div key={step.step} data-reveal>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description.replace(/—/g, '. ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {testimonials[0] && (
        <section className="cr-quote-section cr-wrap" data-reveal>
          <span className="cr-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            <p>{testimonials[0].text}</p>
            <footer>
              <strong>{testimonials[0].name}</strong>
              <span>{testimonials[0].role}</span>
              <Link href="/testimonials" className="cr-text-link">
                More kind words <Arrow />
              </Link>
            </footer>
          </blockquote>
        </section>
      )}
      <ProjectCTA />
    </>
  )
}
