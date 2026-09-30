import Link from 'next/link'
import { IconFacebook, IconGitHub, IconInstagram, IconLinkedIn } from '@/src/components/Icons'
import { footerServices, navLinks, site, whatsappHireUrl } from '@/src/data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold text-accent mb-4">
              {site.shortName}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Digital marketer and product developer in Abuja, Nigeria—SEO, social media, paid
              ads, and websites that convert for SMEs, NGOs, and founders.
            </p>
            <a href={whatsappHireUrl} className="text-accent text-sm font-semibold hover:underline">
              WhatsApp for a free strategy chat →
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigate</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-accent text-sm transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  WhatsApp: {site.whatsappPhone}
                </a>
              </li>
              <li>
                <a href={`tel:+${site.callRaw}`} className="hover:text-accent">
                  Call: {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4" aria-label="Social profiles">
              {[
                { name: 'GitHub', href: site.social.github, Icon: IconGitHub },
                { name: 'LinkedIn', href: site.social.linkedin, Icon: IconLinkedIn },
                { name: 'Instagram', href: site.social.instagram, Icon: IconInstagram },
                { name: 'Facebook', href: site.social.facebook, Icon: IconFacebook },
              ].map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${name} profile`}
                  title={name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {year} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
