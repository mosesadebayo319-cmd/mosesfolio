import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Navigation from '@/src/components/Navigation'
import Footer from '@/src/components/Footer'
import WhatsAppFloat from '@/src/components/WhatsAppFloat'
import Analytics from '@/src/components/Analytics'
import { site } from '@/src/data/content'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: '%s | Moses Adebayo',
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
    locale: 'en_NG',
    siteName: 'Moses Adebayo',
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
  },
  alternates: {
    canonical: '/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: site.name,
      url: site.url,
      jobTitle: site.jobTitle,
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abuja',
        addressCountry: 'NG',
      },
      sameAs: [
        site.social.linkedin,
        site.social.instagram,
        site.social.facebook,
      ],
    },
    {
      '@type': 'ProfessionalService',
      name: 'Moses Adebayo Digital Growth',
      description: site.description,
      url: site.url,
      areaServed: 'Nigeria',
      provider: { '@type': 'Person', name: site.name },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
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
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}
