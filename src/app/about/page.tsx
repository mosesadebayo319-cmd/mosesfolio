import Link from 'next/link'
import Image from 'next/image'
import {
  aboutValues,
  experienceRoles,
  skillCategories,
  whatsappHireUrl,
} from '@/src/data/content'

export const metadata = {
  title: 'About',
  description:
    'Moses Oluwashina Adebayo — digital marketer, project leader, and web growth partner based in Lagos, Nigeria.',
}

export default function AboutPage() {
  const featured = experienceRoles.filter((r) => r.featured)

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">About Moses</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Digital marketing specialist, project leader, and coding mentor
              helping Nigerian organisations turn attention into measurable
              growth.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading mb-6">My journey</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I started in operations and project coordination—learning how
                teams actually deliver under pressure. That foundation still
                shapes how I run campaigns: clear owners, clear deadlines, clear
                numbers.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Over the years I&apos;ve partnered with NGOs, ministries,
                education brands, and service businesses. One pattern always
                wins: understand the audience, pick a few channels, execute
                consistently, and report what moved the needle.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today I focus on SEO, social, paid campaigns, and websites that
                convert—plus mentoring the next wave of builders. Available for
                projects, retainers, and hands-on growth partnerships.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Projects', 'Retainers', 'Mentoring'].map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 text-xs font-semibold rounded-full border border-accent text-accent"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/about-moses.jpg"
                  alt="Moses Oluwashina Adebayo"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutValues.map((v) => (
              <div
                key={v.title}
                className="p-8 bg-background rounded-xl border border-border"
              >
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  {v.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Skills & expertise</h2>
            <p className="section-subtitle">
              Tools and capabilities I use on client work
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all"
              >
                <h3 className="text-lg font-semibold mb-4 text-accent">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Recent roles</h2>
            <p className="section-subtitle">Where I&apos;m applying the work</p>
          </div>
          <div className="pl-2">
            {featured.map((job) => (
              <div key={job.role + job.company} className="timeline-item">
                <h3 className="text-xl font-semibold text-accent">{job.role}</h3>
                <p className="font-medium mb-1">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </p>
                <p className="text-sm text-muted-foreground mb-3">{job.period}</p>
                <ul className="space-y-1">
                  {job.impact.map((imp) => (
                    <li
                      key={imp}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-accent">✓</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/experience" className="secondary-button">
              Full experience timeline
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-border">
        <div className="container text-center max-w-2xl">
          <h2 className="section-heading mb-4">Let&apos;s work together</h2>
          <p className="text-muted-foreground mb-8">
            Projects, retainers, or a quick strategy chat—start on WhatsApp or
            send a brief.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappHireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              WhatsApp
            </a>
            <Link href="/contact" className="secondary-button">
              Contact form
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
