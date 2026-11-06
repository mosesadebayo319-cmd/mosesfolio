'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Arrow, StartProject } from './CreativeUI'

const directions = [
  {
    name: 'Marketing',
    title: 'Get your message to the right people.',
    description:
      'Focused strategy, content, SEO, and campaigns that connect your offer with your audience.',
    items: [
      'Audience & channel strategy',
      'Content & campaign execution',
      'Reporting you can understand',
    ],
    steps: ['Plan', 'Create', 'Measure'],
    href: '/services#digital-campaigns',
  },
  {
    name: 'Web & products',
    title: 'Build something people can actually use.',
    description:
      'Business websites and practical products, from a clear first impression to a better everyday workflow.',
    items: [
      'Business websites & landing pages',
      'Useful digital workflows',
      'Responsive, accessible interfaces',
    ],
    steps: ['Discover', 'Build', 'Refine'],
    href: '/services#web-development',
  },
]

export default function PortfolioHero() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const direction = directions[selected]
  return (
    <section className="jl-hero cr-wrap" aria-label="Introduction">
      <div className="jl-hero-main">
        <div className="jl-hero-copy">
          <p className="jl-kicker">
            <span />
            DIGITAL MARKETER & PRODUCT DEVELOPER
          </p>
          <h1>
            Clear strategy.
            <br />
            Better digital <br />
            <span>experiences.</span>
          </h1>
          <p>
            I’m Moses Adebayo. I help businesses and nonprofits connect with
            their audience and turn useful ideas into websites, campaigns, and
            digital products.
          </p>
          <div className="jl-hero-actions">
            <StartProject />
            <Link href="/case-studies" className="jl-light-link">
              Explore my work <Arrow />
            </Link>
          </div>
          <div className="jl-hero-location">
            <span>Abuja, Nigeria</span>
            <a href="/Moses-Adebayo-CV.pdf" download>
              Download my CV ↓
            </a>
          </div>
        </div>
        <div className="jl-portrait">
          <Image
            src="/hero/hero.jpg"
            alt="Moses Adebayo at his desk"
            width={400}
            height={440}
            priority
          />
          <div>
            <strong>Moses Adebayo</strong>
            <span>Strategy. Marketing. Development.</span>
          </div>
        </div>
      </div>
      <div className="jl-hero-aside">
        <div className="jl-direction-card">
          <p className="jl-kicker">THE RIGHT SUPPORT FOR YOUR NEXT STEP</p>
          <div
            className="jl-direction-tabs"
            role="tablist"
            aria-label="Explore services"
          >
            {directions.map((d, i) => (
              <button
                ref={(node) => {
                  tabs.current[i] = node
                }}
                key={d.name}
                role="tab"
                id={`direction-${i}`}
                aria-selected={i === selected}
                aria-controls={`direction-panel-${i}`}
                tabIndex={i === selected ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  if (
                    !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(
                      event.key,
                    )
                  )
                    return
                  event.preventDefault()
                  const next =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? 1
                        : 1 - selected
                  setSelected(next)
                  tabs.current[next]?.focus()
                }}
              >
                {d.name}
              </button>
            ))}
          </div>
          <div
            id={`direction-panel-${selected}`}
            role="tabpanel"
            aria-labelledby={`direction-${selected}`}
            key={selected}
            className="jl-direction-panel"
          >
            <h2>{direction.title}</h2>
            <p>{direction.description}</p>
            <ul>
              {direction.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="jl-mini-flow" aria-hidden="true">
              {direction.steps.map((step, i) => (
                <span key={step}>
                  <small>0{i + 1}</small>
                  {step}
                </span>
              ))}
            </div>
            <Link href={direction.href} className="cr-text-link">
              Explore this service <Arrow />
            </Link>
          </div>
        </div>
        <Link href="/experience" className="jl-current-role">
          <span className="jl-role-mark" aria-hidden="true">
            JS
          </span>
          <div>
            <span>CURRENTLY AT</span>
            <strong>Jeda Systems</strong>
            <p>Digital Marketing Executive</p>
          </div>
          <Arrow />
        </Link>
      </div>
    </section>
  )
}
