'use client'

import { useState, useTransition } from 'react'
import { sendEmail } from '@/actions/sendEmail'

const inputClass =
  'w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors'
const labelClass = 'block text-sm font-medium text-navy mb-1'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setResult(null)
    startTransition(async () => {
      const res = await sendEmail(formData)
      setResult(res)
      if (res.success) {
        form.reset()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot gegen Spam-Bots – für echte Nutzer unsichtbar, siehe sendEmail-Action */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-cta">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            className={inputClass}
            placeholder="Ihr vollständiger Name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            E-Mail <span className="text-cta">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="ihre@email.ch"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefon <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="079 000 00 00"
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>
            Betreff <span className="text-cta">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            minLength={3}
            maxLength={150}
            className={inputClass}
            placeholder="z.B. Anfrage Innenmalerei"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Ihre Nachricht <span className="text-cta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder="Beschreiben Sie Ihr Vorhaben..."
        />
      </div>

      {result?.success && (
        <div className="bg-green-50 border border-green-200 rounded p-4 text-green-800 text-sm">
          Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.
        </div>
      )}

      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800 text-sm">
          {result.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-cta hover:bg-cta-hover disabled:opacity-60 text-white font-semibold px-8 py-3 rounded transition-colors cursor-pointer"
      >
        {isPending ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>
    </form>
  )
}
