import type { Metadata } from 'next'
import Image from 'next/image'
import { pageSeo } from '@/src/data/content'
import { getPublicProjects } from '@/src/lib/content-loader'
import { Arrow, ProjectGallery } from '@/src/components/CreativeUI'
import { PageIntro, ProjectCTA } from '@/src/components/CreativeSections'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: pageSeo.caseStudies.title,
  description: pageSeo.caseStudies.description,
  alternates: { canonical: '/case-studies' },
}
export default async function CaseStudiesPage() {
  const projects = await getPublicProjects()
  return (
    <>
      <PageIntro
        label="THE SELECTED COLLECTION"
        title="Made with purpose."
        accent="Built to be useful."
      >
        <p>
          A closer look at the websites, products, and campaigns I’ve helped
          bring to life. The brief, the thinking, and what actually shipped.
        </p>
      </PageIntro>
      <section className="cr-section cr-wrap">
        <ProjectGallery projects={projects} />
      </section>
      <div className="cr-wrap">
        {projects.map((p, i) => (
          <article className="cr-case-detail" id={p.id} key={p.id}>
            <div className="cr-case-detail-head">
              <div>
                <p className="cr-eyebrow">
                  {String(i + 1).padStart(2, '0')} / {p.category.toUpperCase()}
                </p>
                <h2>{p.title}</h2>
              </div>
              {p.projectUrl && (
                <a
                  className="cr-text-link"
                  href={p.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live project <Arrow />
                </a>
              )}
            </div>
            <div className="cr-case-image">
              <div className="cr-case-image-inner">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width:700px) 90vw, 80vw"
                  unoptimized
                />
              </div>
            </div>
            <div className="cr-caption">
              <span>{p.imageCaption}</span>
              <a href={p.image} target="_blank" rel="noopener noreferrer">
                Full image ↗
              </a>
            </div>
            <div className="cr-case-meta">
              {[
                ['CLIENT', p.client],
                ['MY ROLE', p.role],
                ['INDUSTRY', p.industry],
                ['WHEN', p.timeframe],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    {k}
                    <strong>{v}</strong>
                  </div>
                ))}
            </div>
            {p.stack && (
              <div
                className="cr-tags"
                aria-label={p.stackLabel || 'Technology stack'}
              >
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            )}
            <div className="cr-case-body">
              <div>
                {[
                  ['The challenge', p.problem],
                  ['The thinking', p.strategy],
                  ['The making', p.execution],
                ]
                  .filter(([, v]) => v)
                  .map(([title, text]) => (
                    <div key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
              </div>
              <aside className="cr-case-result">
                <h3>{p.resultHeading || 'The outcome'}</h3>
                <div className="cr-case-metrics">
                  {[
                    [p.results.metric1, p.results.label1],
                    [p.results.metric2, p.results.label2],
                    [p.results.metric3, p.results.label3],
                  ]
                    .filter(([v]) => v && v !== '—')
                    .map(([value, label]) => (
                      <div key={label + value}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                </div>
                {p.outcomeNote && <p>{p.outcomeNote}</p>}
                {p.testimonial && (
                  <blockquote>
                    <p>“{p.testimonial}”</p>
                    <p>{p.testimonialAuthor}</p>
                  </blockquote>
                )}
              </aside>
            </div>
          </article>
        ))}
      </div>
      <ProjectCTA />
    </>
  )
}
