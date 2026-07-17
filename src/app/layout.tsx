import type { Metadata } from 'next'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import Navigation from '@/src/components/Navigation'
import Footer from '@/src/components/Footer'
import { site } from '@/src/data/content'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  keywords: [
    'Digital Marketing Expert',
    'Social Media Manager',
    'SEO Specialist',
    'Project Manager Nigeria',
    'Digital Strategy',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: 'Moses Oluwashina Adebayo - Digital Marketing & Project Management',
    description:
      'Discover how I help businesses grow through strategic digital marketing and expert project management.',
    type: 'website',
    siteName: 'Moses Adebayo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moses Oluwashina Adebayo - Digital Marketing Expert',
    description:
      'Transform your business with strategic digital marketing and expert project management.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  description: 'Digital Marketing Specialist and Project Management Expert',
  jobTitle: site.jobTitle,
  email: site.email,
  telephone: site.phone,
  sameAs: [
    site.social.linkedin,
    site.social.instagram,
    site.social.facebook,
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
      className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
