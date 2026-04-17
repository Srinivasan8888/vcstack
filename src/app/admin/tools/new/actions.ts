'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { parseToolForm, type ToolActionState } from '../_form/toolSchema'

async function getPrisma() {
  try {
    const { prisma } = await import('@/lib/db/prisma')
    return prisma
  } catch {
    return null
  }
}

export async function createTool(
  _prev: ToolActionState,
  formData: FormData,
): Promise<ToolActionState> {
  if (!(await isAuthenticated())) {
    return { ok: false, message: 'Not authenticated.' }
  }

  const parsed = parseToolForm(formData)

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
    await db.tool.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        shortDesc: parsed.data.shortDesc || null,
        websiteUrl: parsed.data.websiteUrl,
        logoUrl: parsed.data.logoUrl || null,
        pricingModel: parsed.data.pricingModel,
        isFeatured: parsed.data.isFeatured,
        categoryId: parsed.data.categoryId,
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error.'
    return { ok: false, message: `Create failed: ${msg}` }
  }

  revalidatePath('/admin/tools')
  revalidatePath('/tools')
  revalidatePath(`/product/${parsed.data.slug}`)
  redirect('/admin/tools')
}
