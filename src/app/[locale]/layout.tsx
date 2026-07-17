import type { Metadata } from 'next'
import { Inter, Calistoga } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import { Providers } from '../providers'

// internationalization
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/src/i18n/routing'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const calistoga = Calistoga({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
})

const siteUrl = 'https://www.moseslevin.com'

export const metadata: Metadata = {
  title: 'Moses Levin - Web Developer',
  description:
    "Explore Moses Levin's Web development Projects, showcasing React/Javascript Skills Design Expertise. Get in touch with me.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    title: 'Moses Levin - Web Developer',
    description: 'A showcase of my web development projects and expertise',
    images: [
      {
        url: `${siteUrl}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMoses%20Portfolio%20website.194b3bfe.png&w=3840&q=75`,
        width: 800,
        height: 600,
        alt: 'Website homepage',
      },
    ],
    siteName: 'Moses Web Dev',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Moses Levin',
  url: siteUrl,
  sameAs: [
    'https://www.linkedin.com/in/moseslevin/',
    'https://github.com/MosesLevin',
  ],
  jobTitle: 'Web Developer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Technische Universität Berlin',
  },
  description:
    'A showcase of my Web Development projects and Skills. Bringing Websites to Life.',
  image: `${siteUrl}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMoComputerMemoji.8d87ca22.png&w=750&q=75`,
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          'dark:bg-gray-900 bg-brown1 text-white antialiased font-sans'
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* wrap our internationalization provider with another theme provider - if any more providers need to make a provider component take props for useTranslation hook to work in client components to avoid translation prop drilling in many components */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
