'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { navLinks, site } from '@/src/data/content'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-display font-bold text-accent hover:text-accent/80 transition-colors"
        >
          {site.shortName}
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.href ? 'text-accent' : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="cta-button text-sm !py-2.5 !px-5">
            Get In Touch
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border px-4 py-4 space-y-3 bg-background">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-foreground hover:text-accent transition-colors font-medium py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block cta-button text-center mt-4"
            onClick={() => setOpen(false)}
          >
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  )
}
