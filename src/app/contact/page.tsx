import type { Metadata } from 'next'
import ContactForm from '@/src/components/ContactForm'
import { IconWhatsApp } from '@/src/components/Icons'
import { pageSeo, site, whatsappHireUrl } from '@/src/data/content'

export const metadata: Metadata = {
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: pageSeo.contact.title,
    description: pageSeo.contact.description,
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 bg-card border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="section-heading mb-6">
              Let&apos;s discuss your project
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Need help with SEO, social media, ads, a website, or a digital
              product? Tell me what you are trying to achieve. WhatsApp is
              fastest; I work from Abuja with teams across Nigeria.
            </p>
            <a
              href={whatsappHireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex gap-2 !bg-[#25D366] !text-white"
            >
              <IconWhatsApp className="w-5 h-5" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-5">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-accent mb-2">Email</h3>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-accent break-all"
                >
                  {site.email}
                </a>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-accent mb-2">WhatsApp for work</h3>
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {site.whatsappPhone}
                </a>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-accent mb-2">Call me directly</h3>
                <a href={`tel:+${site.callRaw}`} className="hover:text-accent">
                  {site.phone}
                </a>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-accent mb-2">Location</h3>
                <p>{site.location}</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-accent mb-2">Hours</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {site.hours}
                </p>
                <p className="text-sm text-muted-foreground">
                  {site.responseTime}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 bg-card rounded-xl border border-border">
              <h2 className="text-2xl font-display font-bold mb-2">
                Send a project brief
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Share goals, timeline, and budget if you can—I&apos;ll respond
                with next steps.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
