import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/src/data/content'

export const metadata = {
  title: 'Blog | Moses Oluwashina Adebayo',
  description:
    'Insights, strategies, and best practices for digital marketing, social media management, and project leadership.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="accent-line mb-6" />
            <h1 className="section-heading mb-6">Blog & Insights</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Insights, strategies, and best practices for digital marketing,
              social media management, and project leadership.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-xl border border-border hover:border-accent transition-all duration-300 card-hover bg-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="text-accent font-semibold">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-heading font-semibold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By {post.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="section-heading mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Want marketing insights delivered to your inbox? Reach out and
              let&apos;s connect.
            </p>
            <Link href="/contact" className="cta-button">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
