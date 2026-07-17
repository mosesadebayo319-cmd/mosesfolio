'use client'

import { useState } from 'react'
import { contactSubjects, site, whatsappHireUrl } from '@/src/data/content'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: '',
    company: '', // honeypot
  })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const track = (event: string, payload?: Record<string, string>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', event, payload || {})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.company) {
      setStatus('success')
      return
    }
    if (form.message.trim().length < 20) {
      setError('Please share a bit more detail (at least 20 characters).')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          budget: form.budget,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')

      setStatus('success')
      track('contact_form_submit', { subject: form.subject })
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        budget: '',
        message: '',
        company: '',
      })
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try WhatsApp or email.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-accent/40 bg-background p-8 text-center space-y-4">
        <p className="text-2xl font-display font-bold text-accent">Message sent</p>
        <p className="text-muted-foreground">
          Thanks—I&apos;ll reply soon. Prefer a faster chat?
        </p>
        <a
          href={whatsappHireUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button inline-flex"
        >
          Continue on WhatsApp
        </a>
        <button
          type="button"
          className="block mx-auto text-sm text-muted-foreground hover:text-accent"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="form-input"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+234..."
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a subject</option>
            {contactSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium mb-2">
          Budget range (optional)
        </label>
        <select
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Prefer not to say</option>
          <option value="Under ₦200k / $100–200">Under ₦200k / $100–200</option>
          <option value="₦200k–₦500k / $200–500">₦200k–₦500k / $200–500</option>
          <option value="₦500k–₦1.5m / $500–1,500">₦500k–₦1.5m / $500–1,500</option>
          <option value="₦1.5m+ / $1,500+">₦1.5m+ / $1,500+</option>
          <option value="Monthly retainer">Monthly retainer</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="form-input resize-none"
          placeholder="Goals, timeline, and what success looks like for you..."
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="cta-button disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
        <a
          href={whatsappHireUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="secondary-button text-center"
          onClick={() => track('cta_click', { button: 'whatsapp_form' })}
        >
          Prefer WhatsApp?
        </a>
      </div>

      <p className="text-xs text-muted-foreground">
        I never share your details. You can also email{' '}
        <a href={`mailto:${site.email}`} className="text-accent underline">
          {site.email}
        </a>
        .
      </p>
    </form>
  )
}
