import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
