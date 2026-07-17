'use client'

import { whatsappHireUrl } from '@/src/data/content'
import { IconWhatsApp } from '@/src/components/Icons'

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappHireUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 px-4 py-3 font-semibold text-sm hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Chat on WhatsApp"
    >
      <IconWhatsApp className="w-6 h-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
