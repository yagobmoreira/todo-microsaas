import { z } from 'zod'

export const updateProfileSchema = z.object({
  email: z.string().email(),
  name: z.string(),
})
