import Link from 'next/link'
import { site, navLinks } from '@/src/data/content'
import { IconGitHub, IconLinkedIn, IconInstagram, IconFacebook } from './Icons'
import { MotionControl } from './CreativeUI'
export default function Footer() {
  return (
    <footer className="ja-footer">
      <div className="ja-footer-card">
        <Link href="/" className="ja-footer-logo">
          MOSES<span>ADEBAYO</span>
        </Link>
        <nav aria-label="Footer navigation">
          {navLinks.slice(0, 4).map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ja-footer-links">
          <Link href="/about">About Moses</Link>
          <Link href="/experience">Experience</Link>
          <a href="/Moses-Adebayo-CV.pdf" download>
            Download CV
          </a>
          <Link href="/testimonials">Client feedback</Link>
        </div>
        <div className="ja-footer-contact">
          <a href={'tel:+' + site.callRaw}>{site.phone}</a>
          <a href={'mailto:' + site.email}>{site.email}</a>
          <a
            href={site.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Work WhatsApp
          </a>
          <span>{site.location}</span>
          <div className="cr-socials">
            {[
              { name: 'GitHub', href: site.social.github, Icon: IconGitHub },
              {
                name: 'LinkedIn',
                href: site.social.linkedin,
                Icon: IconLinkedIn,
              },
              {
                name: 'Instagram',
                href: site.social.instagram,
                Icon: IconInstagram,
              },
              {
                name: 'Facebook',
                href: site.social.facebook,
                Icon: IconFacebook,
              },
            ].map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="ja-footer-watermark" aria-hidden="true">
          MOSES ADEBAYO
        </div>
      </div>
      <div className="ja-footer-bottom">
        <span>© {new Date().getFullYear()} Moses Adebayo</span>
        <MotionControl />
        <a
          href="https://styleshout.com/free-templates/monica/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Design foundation: StyleShout
        </a>
      </div>
    </footer>
  )
}
