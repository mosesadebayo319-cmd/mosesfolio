'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PublicProject } from '@/src/lib/content-loader'

export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="cr-arrow"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  )
}
export function Burst() {
  return (
    <svg
      className="cr-burst"
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((angle) => (
        <rect
          key={angle}
          x="46"
          y="0"
          width="8"
          height="100"
          rx="3"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  )
}
export function MotionControl() {
  const [paused, setPaused] = useState(false)
  return (
    <button
      type="button"
      className="cr-motion-control"
      aria-pressed={paused}
      onClick={() => {
        const next = !paused
        setPaused(next)
        document.documentElement.dataset.motion = next ? 'off' : 'on'
      }}
    >
      {paused ? '▶ Resume motion' : 'Ⅱ Pause motion'}
    </button>
  )
}
export function StartProject({ className = '' }: { className?: string }) {
  return (
    <button
      className={`cr-button ${className}`}
      onClick={() => window.dispatchEvent(new Event('moses:open-assistant'))}
    >
      Let’s talk about your project <Arrow />
    </button>
  )
}

export function CreativeMotion() {
  const pathname = usePathname()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.animate(
            [
              { opacity: 0.2, transform: 'translateY(35px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)' },
          )
          observer.unobserve(entry.target)
        }),
      { threshold: 0.08 },
    )
    document
      .querySelectorAll('[data-reveal]')
      .forEach((node) => observer.observe(node))
    const update = () =>
      document.documentElement.style.setProperty(
        '--page-progress',
        `${window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)}`,
      )
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [pathname])
  return <div className="cr-reading-progress" aria-hidden="true" />
}

export function Portrait() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      className="cr-portrait-composition"
      ref={ref}
      onPointerMove={(e) => {
        if (
          e.pointerType !== 'mouse' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          return
        const b = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty(
          '--tilt-x',
          `${(e.clientY - b.top - b.height / 2) / -40}deg`,
        )
        e.currentTarget.style.setProperty(
          '--tilt-y',
          `${(e.clientX - b.left - b.width / 2) / 40}deg`,
        )
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--tilt-x', '0deg')
        ref.current?.style.setProperty('--tilt-y', '0deg')
      }}
    >
      <div className="cr-portrait-card">
        <Image
          src="/hero/hero.jpg"
          alt="Moses Adebayo at his desk"
          width={400}
          height={400}
          priority
        />
        <div className="cr-portrait-caption">
          <span>MOSES ADEBAYO</span>
          <span>STRATEGIST. BUILDER.</span>
        </div>
      </div>
    </div>
  )
}
const groupFor = (p: PublicProject) =>
  /development|product|website/i.test(p.category)
    ? 'Web & products'
    : 'Marketing'
export function ProjectGallery({
  projects,
  compact = false,
}: {
  projects: PublicProject[]
  compact?: boolean
}) {
  const [filter, setFilter] = useState('All work')
  const visible = projects.filter(
    (p) => filter === 'All work' || groupFor(p) === filter,
  )
  return (
    <div>
      {!compact && (
        <div className="cr-filters" aria-label="Filter projects">
          {['All work', 'Web & products', 'Marketing'].map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              className={filter === label ? 'active' : ''}
              onClick={() => setFilter(label)}
            >
              {label}
              <span>
                {label === 'All work'
                  ? projects.length
                  : projects.filter((p) => groupFor(p) === label).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="cr-project-grid" aria-live="polite">
        {visible.map((p, i) => (
          <article className={`cr-project cr-project-${i % 4}`} key={p.id}>
            <Link
              className="cr-project-visual"
              href={compact ? `/case-studies#${p.id}` : `#${p.id}`}
              aria-label={`Read ${p.title} case study`}
            >
              <div className="cr-project-window">
                <div className="cr-window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{p.client || p.category}</span>
                </div>
                <div className="cr-project-screen">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:700px) 90vw, 45vw"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>
              <span className="cr-project-view">
                <Arrow />
              </span>
              <span className="cr-project-type">{groupFor(p)}</span>
            </Link>
            <div className="cr-project-info">
              <div>
                <p className="cr-eyebrow">{p.category}</p>
                <h3>
                  <Link href={compact ? `/case-studies#${p.id}` : `#${p.id}`}>
                    {p.title
                      .replace(': NGO reporting workspace', '')
                      .replace(' LinkedIn awareness campaign', '')}
                  </Link>
                </h3>
              </div>
              <span className="cr-project-number">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
export function ServiceAccordion({
  items,
}: {
  items: {
    id: string
    title: string
    description: string
    deliverables: string[]
  }[]
}) {
  return (
    <div className="cr-service-list">
      {items.map((s, i) => (
        <details key={s.id} id={s.id} className="cr-service" open={i === 0}>
          <summary>
            <span className="cr-service-number">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>{s.title}</h3>
            <span className="cr-service-toggle" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="cr-service-body">
            <p>{s.description.replace(/—/g, '. ')}</p>
            <div className="cr-tags">
              {s.deliverables.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <Link href="/contact" className="cr-text-link">
              Let’s explore this <Arrow />
            </Link>
          </div>
        </details>
      ))}
    </div>
  )
}
