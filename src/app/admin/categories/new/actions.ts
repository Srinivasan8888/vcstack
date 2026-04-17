'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { isAuthenticated } from '@/lib/auth'

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(80),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, or hyphens only'),
  description: z.string().max(1000).optional().default(''),
  icon: z.string().max(8).optional().default(''),
})

export type CreateState = {
  ok: boolean
  message: string
  fieldErrors?: Record<string, string[]>
}

async function getPrisma() {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    return prisma
  } catch {
    return null
  }
}

export async function createCategory(
  _prev: CreateState,
  formData: FormData,
): Promise<CreateState> {
  if (!(await isAuthenticated())) {
    return { ok: false, message: 'Not authenticated.' }
  }

  const parsed = CategorySchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description') ?? '',
    icon: formData.get('icon') ?? '',
  })

  if (!parsed.success) {
    return {
      ok: false,
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const db = await getPrisma()
  if (!db) {
    return {
      ok: false,
      message: 'Database is not available in this environment. Changes cannot be persisted.',
    }
  }

  try {
    await db.category.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        icon: parsed.data.icon || null,
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error.'
    return { ok: false, message: `Create failed: ${msg}` }
  }

  revalidatePath('/admin/categories')
  revalidatePath(`/category/${parsed.data.slug}`)
  revalidatePath('/all-categories')
  redirect('/admin/categories')
}
