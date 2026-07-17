import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="container text-center max-w-xl py-24">
        <p className="text-accent font-semibold mb-4">404</p>
        <h1 className="section-heading">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          That page doesn&apos;t exist—or it moved. Let&apos;s get you back to
          something useful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="cta-button">
            Go home
          </Link>
          <Link href="/contact" className="secondary-button">
            Contact Moses
          </Link>
        </div>
      </div>
    </div>
  )
}
