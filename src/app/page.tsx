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
      <section className="mo-intro">
        <div className="cr-wrap mo-intro-grid">
          <div className="mo-intro-text" data-reveal>
            <p className="mo-pretitle">Hello, I’m Moses</p>
            <h1>
              I create marketing <br />
              strategies & digital <br />
              products for your <br />
              business.
            </h1>
            <p className="mo-intro-description">
              Digital marketer & product developer in Abuja, Nigeria. Helping
              SMEs and nonprofits communicate clearly, reach their audience, and
              build useful tools.
            </p>
            <div className="mo-hero-actions">
              <Link href="/case-studies" className="cr-text-link">
                Explore my work <Arrow />
              </Link>
              <a href="/Moses-Adebayo-CV.pdf" download className="cr-text-link">
                Download CV ↓
              </a>
            </div>
          </div>
          <div className="mo-intro-image" data-reveal>
            <Image
              src="/hero/hero.jpg"
              alt="Moses Adebayo, digital marketer and product developer"
              width={400}
              height={500}
              priority
            />
            <span>MOSES ADEBAYO · ABUJA, NG</span>
          </div>
          <a href="#about-moses" className="mo-scroll">
            <span aria-hidden="true">↓</span>Scroll to explore
          </a>
        </div>
      </section>
      <section className="mo-about" id="about-moses">
        <div className="cr-wrap mo-split">
          <div className="mo-split-heading" data-reveal>
            <p className="mo-pretitle">About</p>
            <h2>
              Strategy, meet <br />
              the person who <br />
              builds it.
            </h2>
            <Link href="/about" className="mo-outline">
              More About Me <Arrow />
            </Link>
          </div>
          <div className="mo-prose" data-reveal>
            <p>
              I’m Moses Adebayo. I work at the intersection of digital marketing
              and product development, bringing a practical approach to the way
              businesses show up online.
            </p>
            <p>
              My work spans SEO, social media, paid campaigns, and websites. I
              also built ImpactDesk, a reporting workspace that helps nonprofit
              teams connect their activities, evidence, and donor reporting.
            </p>
            <p>
              Based in Abuja, I collaborate with SMEs, nonprofits, and education
              teams across Nigeria. I’m interested in work with a clear purpose,
              a thoughtful process, and outcomes we can explain honestly.
            </p>
            <Link href="/experience" className="cr-text-link">
              Explore my experience <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="mo-expertise">
        <div className="cr-wrap mo-split">
          <div className="mo-split-heading" data-reveal>
            <p className="mo-pretitle">Expertise</p>
            <h2>
              The right skills <br />
              for your next <br />
              chapter.
            </h2>
            <p>
              From shaping the message to building the experience, I help
              connect the work that moves your business forward.
            </p>
            <Link href="/services" className="mo-outline">
              View All Services <Arrow />
            </Link>
          </div>
          <div className="mo-service-grid">
            {[
              {
                title: 'Digital marketing',
                text: 'A clear strategy for your audience, channels, and offers. SEO, social media, and paid campaigns supported by practical reporting.',
              },
              {
                title: 'Websites & products',
                text: 'Business websites, landing pages, and practical software that make your services easier to understand and your workflows easier to manage.',
              },
              {
                title: 'Content & community',
                text: 'Consistent content, thoughtful messaging, and community management that give your audience a reason to listen and stay connected.',
              },
              {
                title: 'Project leadership',
                text: 'Clear plans, responsible delivery, and useful communication. Bringing structure to creative and technical work so everyone knows what comes next.',
              },
            ].map((item, i) => (
              <div key={item.title} className="mo-service-item" data-reveal>
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Collaborators />
      <section className="cr-section cr-wrap" id="selected-work">
        <SectionHeading
          label="SELECTED WORK"
          title="A closer look at what I do."
          link="All case studies"
          href="/case-studies"
        />
        <ProjectGallery projects={projects.slice(0, 4)} compact />
      </section>
      <section className="mo-results">
        <div className="cr-wrap mo-split">
          <div className="mo-split-heading" data-reveal>
            <p className="mo-pretitle">Campaign results</p>
            <h2>
              Awareness <br />
              you can <br />
              account for.
            </h2>
            <p>
              Tickets for Troops. A three-day LinkedIn video awareness campaign
              for Heroes Help.
            </p>
            <Link
              href="/case-studies#tickets-for-troops-linkedin"
              className="cr-text-link"
            >
              Read the campaign story <Arrow />
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
              21–23 September 2026. Awareness results only; no leads or
              conversions were recorded.
            </p>
          </div>
        </div>
      </section>
      <section className="cr-section cr-wrap">
        <SectionHeading
          label="EXPERIENCE"
          title="The teams behind the journey."
          link="Full experience"
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
            label="THE PROCESS"
            title="A thoughtful way to work together."
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
                More client feedback <Arrow />
              </Link>
            </footer>
          </blockquote>
        </section>
      )}
      <ProjectCTA />
    </>
  )
}
