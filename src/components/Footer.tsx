import Link from 'next/link'
import { site, navLinks } from '@/src/data/content'
import { IconGitHub, IconLinkedIn, IconInstagram, IconFacebook } from './Icons'
import { Burst, MotionControl } from './CreativeUI'
export default function Footer() {
  return (
    <footer className="cr-footer">
      <div className="cr-wrap">
        <div className="cr-footer-top">
          <Link href="/" className="cr-wordmark">
            moses
            <span>
              <Burst />
            </span>
          </Link>
          <p>
            Strategy with purpose.
            <br />
            Digital work with personality.
          </p>
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
                href={href}
                key={name}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="cr-footer-middle">
          <div>
            {navLinks
              .filter((l) => l.href !== '/')
              .map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            <a href="/Moses-Adebayo-CV.pdf" download>
              Download CV ↗
            </a>
          </div>
          <a href={'mailto:' + site.email}>{site.email}</a>
        </div>
        <div className="cr-footer-bottom">
          <span>© {new Date().getFullYear()} Moses Adebayo</span>
          <span>Based in Abuja. Thinking beyond.</span>
          <MotionControl />
          <a href="#main-content">Back to top ↑</a>
        </div>
        <div className="cr-footer-type" aria-hidden="true">
          MAKE IT MATTER
          <span>
            <Burst />
          </span>
        </div>
      </div>
    </footer>
  )
}
