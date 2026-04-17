import { z } from 'zod'

export const ToolSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, or hyphens only'),
  websiteUrl: z.string().url('Must be a valid URL').max(500),
  shortDesc: z.string().max(200).optional().default(''),
  description: z.string().min(1, 'Description is required').max(5000),
  logoUrl: z
    .string()
    .max(500)
    .optional()
    .default('')
    .refine((v) => !v || /^https?:\/\//i.test(v), {
      message: 'Must be a valid URL starting with http(s)://',
    }),
  categoryId: z.string().min(1, 'Section is required'),
  pricingModel: z.enum(['FREE', 'FREEMIUM', 'PAID', 'ENTERPRISE']).default('FREEMIUM'),
  isFeatured: z.boolean().default(false),
})

export type ToolFormShape = z.infer<typeof ToolSchema>

export function parseToolForm(formData: FormData) {
  return ToolSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    websiteUrl: formData.get('websiteUrl'),
    shortDesc: formData.get('shortDesc') ?? '',
    description: formData.get('description'),
    logoUrl: formData.get('logoUrl') ?? '',
    categoryId: formData.get('categoryId'),
    pricingModel: formData.get('pricingModel') ?? 'FREEMIUM',
    isFeatured: formData.get('isFeatured') === 'on',
  })
}

export type ToolActionState = {
  ok: boolean
  message: string
  fieldErrors?: Record<string, string[]>
}
