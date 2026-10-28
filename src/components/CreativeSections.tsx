import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { clients, site } from '@/src/data/content'
import { Arrow, StartProject } from './CreativeUI'
export function PageIntro({
  label,
  title,
  accent,
  children,
}: {
  label: string
  title: string
  accent: string
  children?: ReactNode
}) {
  return (
    <section className="cr-page-intro cr-wrap">
      <p className="cr-eyebrow">
        <span className="cr-dot" />
        {label}
      </p>
      <h1>
        {title}
        <br />
        <span className="cr-serif">{accent}</span>
      </h1>
      {children && <div className="cr-intro-copy">{children}</div>}
    </section>
  )
}
export function Collaborators() {
  return (
    <section className="cr-collaborators">
      <div className="cr-wrap cr-collaborator-heading">
        <p className="cr-eyebrow">GOOD COMPANY. SHARED AMBITION.</p>
        <span>Clients, collaborators & teams</span>
      </div>
      <div className="cr-logo-marquee">
        <div className="cr-logo-track">
          {[false, true].map((duplicate) => (
            <div
              className="cr-logo-group"
              key={String(duplicate)}
              aria-hidden={duplicate}
            >
              {clients.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={duplicate ? -1 : 0}
                >
                  <div className="cr-client-logo">
                    <Image
                      src={c.logo}
                      alt=""
                      width={100}
                      height={42}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span>{c.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export function ProjectCTA() {
  return (
    <section className="cr-cta">
      <div className="cr-wrap">
        <div>
          <p className="cr-eyebrow">GOT SOMETHING IN MIND?</p>
          <h2>
            Let’s make
            <br />
            <span className="cr-serif">something matter.</span>
          </h2>
        </div>
        <div className="cr-cta-side">
          <StartProject />
          <a className="cr-text-link" href={`mailto:${site.email}`}>
            Prefer email? Say hello <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
export function SectionHeading({
  label,
  title,
  link,
  href,
}: {
  label: string
  title: string
  link?: string
  href?: string
}) {
  return (
    <div className="cr-section-heading" data-reveal>
      <div>
        <p className="cr-eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="cr-text-link">
          {link}
          <Arrow />
        </Link>
      )}
    </div>
  )
}
