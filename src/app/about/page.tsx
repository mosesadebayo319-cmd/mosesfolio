import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { pageSeo, aboutValues, skillCategories } from '@/src/data/content'
import { Arrow } from '@/src/components/CreativeUI'
import {
  PageIntro,
  ProjectCTA,
  SectionHeading,
  Collaborators,
} from '@/src/components/CreativeSections'
export const metadata: Metadata = {
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  alternates: { canonical: '/about' },
}
export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="THE PERSON BEHIND THE WORK"
        title="Curious by nature."
        accent="Practical by choice."
      >
        <p>
          I’m Moses Adebayo, a digital marketer and product developer based in
          Abuja, Nigeria. I help ambitious teams communicate clearly and build
          useful things.
        </p>
      </PageIntro>
      <section className="cr-section cr-wrap cr-bio-grid">
        <div className="cr-about-photo" data-reveal>
          <Image
            src="/about-moses.jpg"
            alt="Moses Oluwashina Adebayo"
            width={600}
            height={600}
            priority
          />
          <span className="cr-photo-note">
            A marketer who likes to make things.
          </span>
        </div>
        <div className="cr-bio-copy" data-reveal>
          <p className="cr-eyebrow">A LITTLE BACKSTORY</p>
          <h2>
            Strategy in my head.
            <br />
            <span className="cr-serif">Work in my hands.</span>
          </h2>
          <p>
            I started in operations and project coordination, learning how teams
            deliver under pressure. That still shapes how I work: clear owners,
            realistic milestones, and an honest view of results.
          </p>
          <p>
            I’ve worked with nonprofits, education teams, and service businesses
            across Nigeria. Today, my work moves between SEO, social media, paid
            campaigns, websites, and product development.
          </p>
          <p>
            As the developer of ImpactDesk, I’m also exploring how practical
            software can help nonprofit teams connect activity, evidence, and
            reporting. I mentor new coders, too.
          </p>
          <div className="cr-inline-actions">
            <Link className="cr-button cr-button-dark" href="/experience">
              My experience <Arrow />
            </Link>
            <a href="/Moses-Adebayo-CV.pdf" download className="cr-text-link">
              Download my CV ↓
            </a>
          </div>
        </div>
      </section>
      <Collaborators />
      <section className="cr-section cr-process">
        <div className="cr-wrap">
          <SectionHeading
            label="WHAT STAYS CONSTANT"
            title="The way I approach the work."
          />
          <div className="cr-values">
            {aboutValues.map((v, i) => (
              <div key={v.title} data-reveal>
                <span className="cr-eyebrow">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.desc.replace(/—/g, '. ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cr-section cr-wrap">
        <SectionHeading
          label="ALWAYS ADDING TO THE TOOLKIT"
          title="A little left brain. A little right."
        />
        <div className="cr-skills">
          {skillCategories.map((c) => (
            <div key={c.category}>
              <h3>{c.category}</h3>
              <div className="cr-tags">
                {c.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <ProjectCTA />
    </>
  )
}
