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
import { Arrow, ProjectGallery } from '@/src/components/CreativeUI'
import {
  Collaborators,
  ProjectCTA,
  SectionHeading,
} from '@/src/components/CreativeSections'
import PortfolioHero from '@/src/components/PortfolioHero'
import PortfolioFAQ from '@/src/components/PortfolioFAQ'
import TestimonialSlider from '@/src/components/TestimonialSlider'
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
      <PortfolioHero />
      <Collaborators />
      <section className="jl-section cr-wrap jl-value-layout">
        <div data-reveal>
          <p className="cr-eyebrow">WHY WORK WITH ME</p>
          <h2>
            More than
            <br />a single skill.
          </h2>
          <p>
            Clear thinking, useful work, and a connected approach to your
            digital presence.
          </p>
          <Link href="/services" className="cr-text-link">
            Discover my services <Arrow />
          </Link>
        </div>
        <div className="jl-value-grid">
          {[
            {
              icon: '01',
              title: 'Strategy before tactics.',
              text: 'We start with your audience, goals, and priorities. Every channel and deliverable needs a reason to be there.',
            },
            {
              icon: '02',
              title: 'Built around your needs.',
              text: 'Marketing and development under one roof. A website, a campaign, or a practical product shaped around your brief.',
            },
            {
              icon: '03',
              title: 'Work you can examine.',
              text: 'See the scope, the process, and the evidence in each case study. Clear reporting, with context around the results.',
            },
            {
              icon: '04',
              title: 'A direct working relationship.',
              text: 'Speak with the person planning and building the work. Clear responsibilities and useful communication throughout.',
            },
          ].map((item) => (
            <article className="jl-value-card" key={item.icon} data-reveal>
              <span className="jl-card-index">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="jl-section cr-wrap" id="selected-work">
        <SectionHeading
          label="PROJECTS & CAMPAIGNS"
          title="Good thinking. Tangible work."
          link="View all case studies"
          href="/case-studies"
        />
        <ProjectGallery projects={projects.slice(0, 3)} compact />
      </section>
      <section className="jl-results cr-wrap" data-reveal>
        <div className="jl-results-heading">
          <div>
            <p className="cr-eyebrow">A DOCUMENTED CAMPAIGN</p>
            <h2>
              Small campaign.
              <br />
              Meaningful reach.
            </h2>
          </div>
          <div>
            <p>
              Tickets for Troops. Three days of LinkedIn awareness activity for
              Heroes Help.
            </p>
            <Link
              href="/case-studies#tickets-for-troops-linkedin"
              className="jl-light-link"
            >
              Read the campaign story <Arrow />
            </Link>
          </div>
        </div>
        <div className="jl-results-grid">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <p className="jl-results-note">
          21–23 September 2026. Awareness results; no leads or conversions were
          recorded.
        </p>
      </section>
      <section className="jl-section cr-wrap jl-about">
        <div className="jl-about-image" data-reveal>
          <Image
            src="/about-moses.jpg"
            alt="Moses Adebayo"
            width={600}
            height={600}
          />
          <div>
            <span>BASED IN ABUJA, NIGERIA</span>
            <strong>
              A practical mind.
              <br />A personal approach.
            </strong>
          </div>
        </div>
        <div className="jl-about-copy" data-reveal>
          <p className="cr-eyebrow">MEET MOSES</p>
          <h2>
            Connecting the
            <br />
            message and
            <br />
            <span>the experience.</span>
          </h2>
          <p>
            I’m Moses Oluwashina Adebayo, a digital marketer and product
            developer working with businesses, nonprofits, and education teams.
          </p>
          <p>
            From the MoTechy website to ImpactDesk and the Tickets for Troops
            campaign, my work connects strategy with practical execution. I also
            mentor new coders and help teams bring structure to their projects.
          </p>
          <div className="jl-about-tags">
            <span>Marketing strategy</span>
            <span>Web development</span>
            <span>Digital products</span>
          </div>
          <div className="cr-inline-actions">
            <Link href="/about" className="cr-button">
              More about Moses <Arrow />
            </Link>
            <a href="/Moses-Adebayo-CV.pdf" download className="cr-text-link">
              Download CV ↓
            </a>
          </div>
        </div>
      </section>
      <section className="jl-process">
        <div className="jl-section cr-wrap">
          <SectionHeading
            label="HOW WE WORK"
            title="A clear route from brief to delivery."
          />
          <div className="cr-process-grid">
            {processSteps.map((s) => (
              <div key={s.step} data-reveal>
                <span>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.description.replace(/—/g, '. ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="jl-section cr-wrap">
        <SectionHeading
          label="PROFESSIONAL EXPERIENCE"
          title="The teams behind the journey."
          link="Explore my experience"
          href="/experience"
        />
        <div className="cr-role-preview">
          {experienceRoles.slice(0, 3).map((role, i) => (
            <Link href="/experience" key={role.company}>
              <span className="cr-role-index">0{i + 1}</span>
              <div>
                <h3>{role.company}</h3>
                <p>{role.role}</p>
              </div>
              <span className="cr-role-date">
                {role.period.replace(/–/g, 'to')}
              </span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      {!!testimonials.length && (
        <section className="jl-section cr-wrap jl-testimonial-layout">
          <div>
            <p className="cr-eyebrow">CLIENT PERSPECTIVES</p>
            <h2>
              Good work starts
              <br />
              with good people.
            </h2>
            <Link href="/testimonials" className="cr-text-link">
              All client feedback <Arrow />
            </Link>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </section>
      )}
      <section className="jl-section cr-wrap jl-faq-layout">
        <div>
          <p className="cr-eyebrow">BEFORE WE BEGIN</p>
          <h2>
            A few useful
            <br />
            answers.
          </h2>
          <p>Still have a question? Let’s work through the details.</p>
          <Link href="/contact" className="cr-text-link">
            Get in touch <Arrow />
          </Link>
        </div>
        <PortfolioFAQ />
      </section>
      <ProjectCTA />
    </>
  )
}
