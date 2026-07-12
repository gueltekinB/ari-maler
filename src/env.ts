import { z } from 'zod'

const schema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  FROM_EMAIL: z.string().email('FROM_EMAIL must be a valid email address'),
  TO_EMAIL: z.string().email('TO_EMAIL must be a valid email address'),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${parsed.error.issues
      .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')}`,
  )
}

export const env = parsed.data
