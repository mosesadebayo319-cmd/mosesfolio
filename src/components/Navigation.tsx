'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navLinks } from '@/src/data/content'
import { Arrow } from './CreativeUI'
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return (
    <header className="cr-header">
      <nav className="cr-wrap cr-nav" aria-label="Main navigation">
        <Link href="/" className="cr-wordmark" aria-label="Moses home">
          Moses.
        </Link>
        <div className="cr-desktop-links">
          {navLinks
            .filter((l) => l.href !== '/' && l.href !== '/contact')
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
              >
                {l.label}
                <span />
              </Link>
            ))}
        </div>
        <Link href="/contact" className="cr-nav-contact">
          Let’s Work Together
        </Link>
        <button
          className="cr-menu-button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
          <span>{open ? '×' : '+'}</span>
        </button>
      </nav>
      {open && (
        <div className="cr-mobile-menu" id="mobile-navigation">
          <nav className="cr-wrap" aria-label="Mobile navigation">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? 'page' : undefined}
              >
                <span>0{i + 1}</span>
                {l.label}
                <Arrow />
              </Link>
            ))}
            <a href="/Moses-Adebayo-CV.pdf" download>
              Download my CV <Arrow />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
