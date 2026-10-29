import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import Navigation from '@/src/components/Navigation'
import Footer from '@/src/components/Footer'
import ProjectAssistant from '@/src/components/ProjectAssistant'
import GoogleAnalytics from '@/src/components/Analytics'
import { site } from '@/src/data/content'
import './globals.css'
import './creative.css'
import './refinement.css'
import './monica.css'
import { CreativeMotion } from '@/src/components/CreativeUI'

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
})

const dmSerif = localFont({
  src: './fonts/dm-serif-display.ttf',
  weight: '400',
  variable: '--font-editorial',
  display: 'swap',
})

const playfair = localFont({
  src: './fonts/playfair-latin.woff2',
  weight: '600 800',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: '%s | Moses Adebayo — Abuja',
  },
  description: site.description,
  keywords: [
    'digital marketing Abuja',
    'SEO specialist Nigeria',
    'social media manager Abuja',
    'digital marketer Nigeria',
    'website designer for SMEs Nigeria',
    'Google ads Nigeria',
    'Meta ads manager',
    'Moses Adebayo',
    'mosesfolio',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: 'Digital Marketing',
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
    locale: 'en_NG',
    siteName: 'Moses Adebayo | mosesfolio.online',
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    // Add later: google: 'your-search-console-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      alternateName: ['Moses Adebayo', 'Moses Oluwashina Adebayo'],
      url: site.url,
      image: `${site.url}/hero/hero.jpg`,
      jobTitle: site.jobTitle,
      description: site.description,
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abuja',
        addressRegion: 'FCT',
        addressCountry: 'NG',
      },
      knowsAbout: [
        'Digital Marketing',
        'Search Engine Optimization',
        'Social Media Marketing',
        'Google Ads',
        'Meta Ads',
        'Web Development',
        'Digital Product Development',
        'Content Strategy',
      ],
      sameAs: [
        site.social.linkedin,
        site.social.github,
        site.social.instagram,
        site.social.facebook,
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#business`,
      name: 'Moses Adebayo Digital Marketing',
      alternateName: 'mosesfolio',
      description: site.description,
      url: site.url,
      image: `${site.url}/hero/hero.jpg`,
      telephone: site.phone,
      email: site.email,
      priceRange: '$$',
      areaServed: [
        { '@type': 'City', name: 'Abuja' },
        { '@type': 'Country', name: 'Nigeria' },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abuja',
        addressRegion: 'FCT',
        addressCountry: 'NG',
      },
      provider: { '@id': `${site.url}/#person` },
      serviceType: [
        'SEO',
        'Social Media Management',
        'Paid Advertising',
        'Web Development',
        'Content Strategy',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: 'mosesfolio — Moses Adebayo',
      description: site.description,
      publisher: { '@id': `${site.url}/#person` },
      inLanguage: 'en-NG',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmSerif.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans creative-site">
        <CreativeMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <ProjectAssistant />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
