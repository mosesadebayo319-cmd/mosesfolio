import Image from 'next/image'
import Link from 'next/link'
export default function PortfolioHero() {
  return (
    <section className="ja-hero cr-wrap" aria-label="Introduction">
      <div className="ja-hero-card ja-hero-primary">
        <div className="ja-hero-content">
          <h1>
            Digital marketing.
            <br />
            Websites & products.
          </h1>
          <p>
            I’m Moses Adebayo, a digital marketer and product developer in
            Abuja. I help businesses and nonprofits with campaigns, websites,
            and practical digital tools.
          </p>
          <Link href="/case-studies" className="ja-button ja-button-white">
            Explore my work
          </Link>
        </div>
        <div className="ja-hero-picture">
          <Image
            src="/hero/hero.jpg"
            alt="Moses Adebayo"
            fill
            sizes="(max-width:600px) 1px, 260px"
            priority
          />
        </div>
      </div>
      <div className="ja-hero-card ja-hero-secondary">
        <div className="ja-hero-content">
          <h2>Marketing and development services</h2>
          <p>
            Work with me on SEO, social media, campaigns, websites, or a digital
            product. We’ll agree the scope around your business needs.
          </p>
          <Link href="/services" className="ja-button">
            View services
          </Link>
        </div>
        <div className="ja-service-picture">
          <Image
            src="/case-studies/motechy-website-october-2026.jpg"
            alt="MoTechy website developed by Moses"
            fill
            sizes="(max-width:600px) 1px, 230px"
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}
