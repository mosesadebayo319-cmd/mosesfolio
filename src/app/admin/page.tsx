'use client'

import { useState } from 'react'

type Submission = {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  budget: string | null
  message: string
  created_at: string
}

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submissions, setSubmissions] = useState<Submission[] | null>(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${secret}` },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load')
      }
      setSubmissions(data.submissions || [])
    } catch (err) {
      setSubmissions(null)
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-4xl">
        <div className="accent-line mb-6" />
        <h1 className="section-heading mb-2">Contact submissions</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Private inbox of form messages stored in your database. Protected by{' '}
          <code className="text-accent">ADMIN_SECRET</code>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="form-input sm:max-w-xs"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={load}
            disabled={loading || !secret}
            className="cta-button disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Load messages'}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-6 p-4 bg-card border border-border rounded-xl">
            {error}
          </p>
        )}

        {submissions && submissions.length === 0 && (
          <p className="text-muted-foreground">
            No submissions yet. When someone uses the contact form, they will
            appear here.
          </p>
        )}

        {submissions && submissions.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {submissions.length} message{submissions.length === 1 ? '' : 's'}
            </p>
            {submissions.map((s) => (
              <article
                key={s.id}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
                  <div>
                    <h2 className="font-semibold text-lg">{s.name}</h2>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-accent text-sm hover:underline"
                    >
                      {s.email}
                    </a>
                    {s.phone && (
                      <p className="text-sm text-muted-foreground">{s.phone}</p>
                    )}
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString()}
                  </time>
                </div>
                <p className="text-sm mb-1">
                  <span className="text-accent font-medium">{s.subject}</span>
                  {s.budget && (
                    <span className="text-muted-foreground">
                      {' '}
                      · Budget: {s.budget}
                    </span>
                  )}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap mt-3">
                  {s.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
