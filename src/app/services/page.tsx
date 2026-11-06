import type { Metadata } from 'next'
import { pageSeo, whatsappHireUrl, processSteps } from '@/src/data/content'
import { getPublicServices, getPublicPackages } from '@/src/lib/content-loader'
import { Arrow, ServiceAccordion } from '@/src/components/CreativeUI'
import {
  PageIntro,
  ProjectCTA,
  SectionHeading,
} from '@/src/components/CreativeSections'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  alternates: { canonical: '/services' },
}
export default async function ServicesPage() {
  const [services, packages] = await Promise.all([
    getPublicServices(),
    getPublicPackages(),
  ])
  return (
    <>
      <PageIntro
        label="THE SKILLS TO CONNECT THE DOTS"
        title="Services"
        accent=""
      >
        <p>
          Strategy, campaigns, websites, and practical digital products. We’ll
          find the right mix for where your business is now and where you want
          it to go.
        </p>
      </PageIntro>
      <section className="cr-section cr-wrap">
        <SectionHeading
          label="01 / THE TOOLKIT"
          title="Services"
        />
        <ServiceAccordion items={services} />
      </section>
      <section className="cr-section cr-process">
        <div className="cr-wrap">
          <SectionHeading
            label="02 / WAYS TO WORK TOGETHER"
            title="Service packages"
          />
          <div className="cr-package-grid">
            {packages.map((p, i) => (
              <article className="cr-package" key={p.id} data-reveal>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul>
                  {p.includes.map((item) => (
                    <li key={item}> {item}</li>
                  ))}
                </ul>
                <p className="cr-package-note">
                  <strong>Best for:</strong> {p.bestFor}
                </p>
                <p className="cr-package-note">{p.pricing}</p>
                <a
                  href={whatsappHireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cr-text-link"
                >
                  Discuss this package <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cr-section cr-wrap">
        <SectionHeading
          label="03 / NOTHING LEFT TO GUESSWORK"
          title="My process"
        />
        <div className="cr-process-grid">
          {processSteps.map((s) => (
            <div key={s.step}>
              <h3>{s.title}</h3>
              <p>{s.description.replace(/—/g, '. ')}</p>
            </div>
          ))}
        </div>
      </section>
      <ProjectCTA />
    </>
  )
}
