import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { pageSeo } from '@/src/data/content'
import { getPublicProjects } from '@/src/lib/content-loader'
import { Collaborators } from '@/src/components/CreativeSections'
import { StartProject } from '@/src/components/CreativeUI'
import PortfolioHero from '@/src/components/PortfolioHero'
import ReferenceProjects from '@/src/components/ReferenceProjects'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: { absolute: pageSeo.home.title },
  description: pageSeo.home.description,
  alternates: { canonical: '/' },
}
export default async function HomePage() {
  const projects = await getPublicProjects()
  const featured =
    projects.find((project) => project.id === 'impactdesk') || projects[0]
  return (
    <>
      <PortfolioHero />
      <section className="ja-reasons cr-wrap">
        <div className="ja-reasons-heading">
          <h2>How I work</h2>
        </div>
        <div className="ja-reasons-grid">
          {[
            {
              title: 'Strategy first.',
              text: 'We agree on your audience, goals, channels, and priorities before starting a campaign or development project.',
            },
            {
              title: 'Marketing and development.',
              text: 'Campaigns, content, websites, and practical digital products, planned around the needs of your business or team.',
            },
            {
              title: 'Clear reporting.',
              text: 'I document the scope, work completed, and results, with evidence and context you can review in my case studies.',
            },
            {
              title: 'Direct communication.',
              text: 'You work directly with the person planning and building your project, with clear responsibilities and agreed next steps.',
            },
          ].map((item) => (
            <article key={item.title} data-reveal>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="ja-project-showcase cr-wrap">
        <h2>Explore my projects</h2>
        <div className="ja-image-grid">
          {projects.slice(0, 4).map((project) => (
            <Link
              href={'/case-studies#' + project.id}
              key={project.id}
              className="ja-image-card"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width:600px) 90vw, 25vw"
                unoptimized
              />
              <span>
                {project.title
                  .replace(': NGO reporting workspace', '')
                  .replace(' LinkedIn awareness campaign', '')}
              </span>
            </Link>
          ))}
        </div>
      </section>
      {featured && (
        <section className="ja-featured cr-wrap">
          <h2>Featured project</h2>
          <article className="ja-course-card">
            <Link href={'/case-studies#' + featured.id}>
              <div className="ja-course-image">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width:600px) 90vw, 300px"
                  unoptimized
                />
              </div>
              <div className="ja-course-copy">
                <h3>{featured.title}</h3>
                <p>{featured.category}</p>
                <p>{featured.role}</p>
              </div>
            </Link>
          </article>
        </section>
      )}
      <ReferenceProjects projects={projects} />
      <section className="ja-about-band">
        <Image
          src="/about-moses.jpg"
          alt=""
          fill
          sizes="100vw"
          className="ja-banner-photo"
        />
        <div className="ja-about-band-content">
          <h2>About Moses Adebayo</h2>
          <ul>
            <li>
              <strong>Digital marketer.</strong> SEO, social media, content, and
              paid campaigns for businesses and nonprofits.
            </li>
            <li>
              <strong>Product developer.</strong> Creator of ImpactDesk, an NGO
              reporting workspace, and developer of the MoTechy website.
            </li>
            <li>
              <strong>Based in Abuja.</strong> Working with teams across Nigeria
              on marketing, websites, and practical digital tools.
            </li>
            <li>
              <strong>Current role.</strong> Digital Marketing Executive at Jeda
              Systems.
            </li>
          </ul>
          <Link href="/about" className="ja-button">
            More about me
          </Link>
        </div>
      </section>
      <section className="ja-business cr-wrap">
        <h2>Marketing and development support</h2>
        <p>
          Tell me about your organisation, what you want to achieve, and the
          work you need delivered.
        </p>
        <p>
          I work with SMEs, nonprofits, education teams, and founders on
          projects and ongoing marketing support.
        </p>
        <StartProject />
      </section>
      <Collaborators />
      <section className="ja-contact-banner">
        <Image
          src="/hero/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="ja-banner-photo"
        />
        <div>
          <h2>Discuss your project</h2>
          <Link href="/contact" className="ja-button ja-button-gradient">
            Contact Moses
          </Link>
        </div>
      </section>
    </>
  )
}
