'use client'
import React, { useState } from 'react'
import { send } from '@emailjs/browser'
import { useTranslations } from 'next-intl'

const MIN_MESSAGE_LENGTH = 20

const ContactForm: React.FC = () => {
  const t = useTranslations('Contact.contactForm')
  // form data which handleChange sets on change (change event) for all form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false) // State to track submitting to avoid double submissions
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)
  const [emailError, setEmailError] = useState('') // State to track email validation error
  const [messageError, setMessageError] = useState('') // State to track message validation error

  // Email validation function with regex
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Message validation function
  const isValidMessage = (message: string): boolean => {
    return message.trim().length >= MIN_MESSAGE_LENGTH
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    if (e.target.name === 'email') {
      // Validate email as user types
      if (!isValidEmail(e.target.value)) {
        setEmailError(t('emailError'))
      } else {
        setEmailError('')
      }
    }

    if (e.target.name === 'message') {
      // Validate message as user types
      if (!isValidMessage(e.target.value)) {
        setMessageError(t('messageError'))
      } else {
        setMessageError('')
      }
    }
  }

  // final form data api request to emailjs
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage('')
    setStatusType(null)
    setEmailError('') // Clear email error before submitting
    setMessageError('') // Clear message error before submitting

    if (!isValidEmail(formData.email)) {
      setEmailError(t('emailError'))
      return
    }

    if (!isValidMessage(formData.message)) {
      setMessageError(t('messageError'))
      return
    }

    setIsSubmitting(true)

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

      await send(serviceId, templateId, formData, publicKey)

      setStatusMessage(t('successMessage'))
      setStatusType('success')
      setFormData({ name: '', email: '', message: '' }) // Reset form
    } catch (error) {
      console.error('Failed to send email:', error)
      setStatusMessage(t('errorMessage'))
      setStatusType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // form takes input with onChange={handleChange} and setState value={formData.input}
  return (
    <form onSubmit={handleSubmit} className="mx-6">
      <div className="container py-10 md:flex md:flex-col md:items-center md:justify-center ">
        <h2 className="text-2xl font-serif mb-4 dark:text-white/90 text-black/90 text-center">
          {t('header')}
        </h2>
        <div className="mb-4 md:mb-6">
          <label
            htmlFor="name"
            className="block text-base font-semibold dark:text-white/60 text-black/60"
          >
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full md:w-[420px] lg:w-[550px] px-3 py-2 border rounded-md shadow-sm text-gray-950 dark:text-white focus:outline-none focus ring-2 dark:ring-sky-400 ring-amber-300 dark:focus:ring-sky-300 focus:ring-orange-400 focus:ring-4 dark:hover:ring-sky-400 hover:ring-amber-300 hover:ring-4 dark:focus-within:hover:ring-sky-300 focus-within:hover:ring-orange-400 focus-within:hover:ring-4 bg-brown0 dark:bg-gray8 "
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label
            htmlFor="email"
            className="block text-base font-semibold dark:text-white/60 text-black/60"
          >
            {t('email')}
          </label>
          {/* adds a couple of classes and a paragraph if emailError state isnt empty */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`mt-1 block w-full md:w-[420px] lg:w-[550px] px-3 py-2 border rounded-md shadow-sm text-gray-950 dark:text-white focus:outline-none focus ring-2 dark:ring-sky-400 ring-amber-300 dark:focus:ring-sky-300 focus:ring-orange-400 focus:ring-4 dark:hover:ring-sky-400 hover:ring-amber-300 hover:ring-4 dark:focus-within:hover:ring-sky-300 focus-within:hover:ring-orange-400 focus-within:hover:ring-4 bg-brown0 dark:bg-gray8 ${
              emailError
                ? 'border-red-500 focus:ring-red-500/70 focus:ring-2'
                : ''
            }`}
          />
          {emailError && (
            <p className="mt-2 text-sm text-red-600">{emailError}</p>
          )}
        </div>
        <div className="mb-4 md:mb-6">
          <label
            htmlFor="message"
            className="block text-base font-semibold dark:text-white/60 text-black/60"
          >
            {t('message')}
          </label>
          {/* adds a couple of classes and a paragraph if messageError state isnt empty */}

          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className={`mt-1 block w-full md:w-[420px] lg:w-[550px] px-3 py-2 border rounded-md shadow-sm text-gray-950 dark:text-white focus:outline-none focus ring-2 dark:ring-sky-400 ring-amber-300 dark:focus:ring-sky-300 focus:ring-orange-400 focus:ring-4 dark:hover:ring-sky-400 hover:ring-amber-300 hover:ring-4 dark:focus-within:hover:ring-sky-300 focus-within:hover:ring-orange-400 focus-within:hover:ring-4 bg-brown0 dark:bg-gray8  ${
              messageError
                ? 'border-red-500 focus:ring-red-500/70 focus:ring-2'
                : ''
            }`}
          />
          {messageError && (
            <p className="mt-2 text-sm text-red-600">{messageError}</p>
          )}
        </div>
        {/* submit button & disabled button when state is true (while it's submitting), also show a message while sending and if success*/}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-[420px] lg:w-[550px] py-3 px-3 bg-gradient-to-r mt-4 from-amber-300 dark:from-emerald-300 to-orange-500 dark:to-sky-400 text-gray-950 font-semibold
          button-animation focus:ring-1 dark:focus-visible:ring-white focus-visible:ring-black hover:ring-2 dark:hover:ring-sky-200 hover:ring-amber-300 hover:text-black "
          aria-label="Submit and Send message"
        >
          {isSubmitting ? t('sending') : t('send')}
        </button>
        {statusMessage && (
          <p
            className={`mt-4 text-center ${
              statusType === 'error' ? 'text-red-500' : 'text-emerald-400'
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
