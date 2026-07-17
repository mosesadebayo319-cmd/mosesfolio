import Link from 'next/link'
import Image from 'next/image'
import { aboutValues, skillCategories } from '@/src/data/content'

export const metadata = {
  title: 'About | Moses Oluwashina Adebayo',
  description:
    'Digital Marketing Specialist, Project Manager, and Senior Coding Mentor.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">About Moses Adebayo</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I&apos;m a Digital Marketing Specialist, Project Manager, and
              Senior Coding Mentor with a passion for helping businesses achieve
              their goals through strategic expertise and proven execution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="section-heading mb-6">My Journey</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                My career began with a passion for digital transformation and a
                commitment to helping organizations succeed in an increasingly
                digital world. Starting in administrative and operational roles,
                I quickly recognized the power of strategic digital marketing
                and project management.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Over the years, I&apos;ve worked with diverse organizations—from
                NGOs to construction companies to tech startups. Each experience
                taught me that success comes from understanding client needs,
                developing data-driven strategies, and executing with precision.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, I specialize in helping businesses grow through SEO,
                social media management, content strategy, web development, and
                expert project leadership. My mission is simple: deliver
                measurable results that transform businesses.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="/about-moses.jpeg"
                  alt="Moses Oluwashina Adebayo – Digital Marketing Professional"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Core Values</h2>
            <p className="section-subtitle">Principles that guide my work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutValues.map((v) => (
              <div
                key={v.title}
                className="p-8 bg-background rounded-xl border border-border hover:border-accent transition-all duration-300"
              >
                <h3 className="text-xl font-heading font-semibold mb-3 text-accent">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">Skills & Expertise</h2>
            <p className="section-subtitle">
              A comprehensive toolkit for digital success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-all duration-300"
              >
                <h3 className="text-xl font-heading font-semibold mb-4 text-accent">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:border-accent transition-colors"
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

      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading mb-6">Let&apos;s Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to discuss how I can help your business grow? Let&apos;s
              connect and explore opportunities.
            </p>
            <Link href="/contact" className="cta-button">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
