'use server'

import { z } from 'zod'
import { resend } from '@/lib/resend'
import { env } from '@/env'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(2000),
})

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function sendEmail(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  // Honeypot: echte Nutzer lassen dieses unsichtbare Feld leer, Bots füllen es aus.
  // Erfolg vortäuschen, damit Bots keinen Unterschied erkennen.
  if (formData.get('website')) {
    return { success: true }
  }

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { success: false, error: 'Ungültige Eingaben. Bitte prüfen Sie Ihre Angaben.' }
  }

  const { email } = parsed.data
  const name = escapeHtml(parsed.data.name)
  const phone = parsed.data.phone ? escapeHtml(parsed.data.phone) : undefined
  const subject = escapeHtml(parsed.data.subject)
  const message = escapeHtml(parsed.data.message)

  try {
    await resend.emails.send({
      from: env.FROM_EMAIL,
      to: env.TO_EMAIL,
      replyTo: email,
      subject: `Kontaktanfrage: ${parsed.data.subject.replace(/[\r\n]+/g, ' ')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #e8740c; padding-bottom: 10px;">
            Neue Kontaktanfrage von ${name}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">E-Mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px 0;">${phone ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Betreff:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
          </table>
          <h3 style="color: #1e3a5f; margin-top: 20px;">Nachricht:</h3>
          <p style="background: #f8f9fa; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          <p style="color: #999; font-size: 12px; margin-top: 24px; border-top: 1px solid #eee; padding-top: 12px;">
            Diese E-Mail wurde über das Kontaktformular auf ari-maler.ch gesendet.
          </p>
        </div>
      `,
    })
    return { success: true }
  } catch {
    return {
      success: false,
      error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
    }
  }
}
