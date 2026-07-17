'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navLinks, site } from '@/src/data/content'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-display font-bold text-accent hover:text-accent/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {site.shortName}
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive(link.href) ? 'text-accent' : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className="cta-button text-sm !py-2.5 !px-5">
            Hire me
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-foreground rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
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
        <>
          <button
            type="button"
            className="lg:hidden fixed inset-0 top-[65px] bg-black/50 z-40"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <div className="lg:hidden relative z-50 border-t border-border px-4 py-4 space-y-2 bg-background">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-medium py-2 ${
                  isActive(link.href) ? 'text-accent' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="block cta-button text-center mt-3">
              Hire me
            </Link>
          </div>
        </>
      )}
    </nav>
  )
}
