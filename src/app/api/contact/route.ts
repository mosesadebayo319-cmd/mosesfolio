import { NextResponse } from 'next/server'
import { site } from '@/src/data/content'
import {
  getSql,
  isDatabaseConfigured,
  saveContactSubmission,
} from '@/src/lib/db'

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

    const submission = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : undefined,
      subject: String(subject).trim(),
      budget: budget ? String(budget).trim() : undefined,
      message: String(message).trim(),
    }

    let savedToDatabase = false
    let emailed = false

    // 1) Save to database (primary store)
    const sql = getSql()
    if (sql) {
      try {
        await saveContactSubmission(sql, submission)
        savedToDatabase = true
      } catch (dbError) {
        console.error('Database save failed:', dbError)
      }
    }

    // 2) Also email via FormSubmit (notification backup)
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: submission.name,
            email: submission.email,
            phone: submission.phone || 'Not provided',
            subject: submission.subject,
            budget: submission.budget || 'Not specified',
            message: submission.message,
            _subject: `Portfolio: ${submission.subject} — ${submission.name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        }
      )
      emailed = res.ok
      if (!res.ok) {
        console.error('FormSubmit error:', await res.text())
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
    }

    // Succeed if either channel worked
    if (!savedToDatabase && !emailed) {
      return NextResponse.json(
        {
          error:
            'Could not save or send your message. Please use WhatsApp or email directly.',
          databaseConfigured: isDatabaseConfigured(),
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      savedToDatabase,
      emailed,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try WhatsApp or email.' },
      { status: 500 }
    )
  }
}
