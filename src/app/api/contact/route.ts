import { NextResponse } from 'next/server'
import { site } from '@/src/data/content'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, budget, message } = body || {}

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (String(message).trim().length < 20) {
      return NextResponse.json(
        { error: 'Message must be at least 20 characters.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const payload = {
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      budget: budget || 'Not specified',
      message,
      _subject: `Portfolio: ${subject} — ${name}`,
      _template: 'table',
      _captcha: 'false',
    }

    // FormSubmit.co — free, no API key. Confirm once via email the first time.
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('FormSubmit error:', text)
      return NextResponse.json(
        {
          error:
            'Could not deliver message right now. Please use WhatsApp or email directly.',
        },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try WhatsApp or email.' },
      { status: 500 }
    )
  }
}
