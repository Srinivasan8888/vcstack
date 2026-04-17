'use client'

import type { Category, Tool } from '@/lib/types'

type FieldErrors = Record<string, string[]> | undefined

export function ToolFormFields({
  tool,
  categories,
  errors,
}: {
  tool?: Tool
  categories: Category[]
  errors?: FieldErrors
}) {
  return (
    <>
      <Field
        label="Name"
        name="name"
        defaultValue={tool?.name}
        required
        error={errors?.name?.[0]}
      />

      <Field
        label="Slug"
        name="slug"
        defaultValue={tool?.slug}
        required
        hint="Lowercase letters, numbers, hyphens. Used in URLs: /product/<slug>"
        error={errors?.slug?.[0]}
      />

      <Field
        label="Website URL"
        name="websiteUrl"
        type="url"
        defaultValue={tool?.websiteUrl}
        required
        error={errors?.websiteUrl?.[0]}
      />

      <Field
        label="Short description"
        name="shortDesc"
        defaultValue={tool?.shortDesc ?? ''}
        hint="One-line summary shown on cards (max ~140 chars)"
        error={errors?.shortDesc?.[0]}
      />

      <TextareaField
        label="Description"
        name="description"
        defaultValue={tool?.description}
        rows={5}
        required
        error={errors?.description?.[0]}
      />

      <Field
        label="Logo URL"
        name="logoUrl"
        type="url"
        defaultValue={tool?.logoUrl ?? ''}
        hint="Optional — absolute URL to the tool's logo image"
        error={errors?.logoUrl?.[0]}
      />

      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className="label">
          Section <span style={{ color: 'var(--red)' }}>*</span>
        </span>
        <select
          name="categoryId"
          defaultValue={tool?.categoryId ?? ''}
          required
          className="input"
          style={{
            padding: '8px 12px',
            fontSize: 'var(--fs-body)',
            borderColor: errors?.categoryId?.[0] ? 'var(--red)' : undefined,
          }}
        >
          <option value="">— select a section —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon ? `${c.icon} ` : ''}
              {c.name}
            </option>
          ))}
        </select>
        {errors?.categoryId?.[0] && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--red)' }}>
            {errors.categoryId[0]}
          </span>
        )}
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className="label">Pricing model</span>
        <select
          name="pricingModel"
          defaultValue={tool?.pricingModel ?? 'FREEMIUM'}
          className="input"
          style={{ padding: '8px 12px', fontSize: 'var(--fs-body)' }}
        >
          <option value="FREE">Free</option>
          <option value="FREEMIUM">Freemium</option>
          <option value="PAID">Paid</option>
          <option value="ENTERPRISE">Enterprise</option>
        </select>
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="checkbox"
          name="isFeatured"
          value="on"
          defaultChecked={tool?.isFeatured ?? false}
        />
        <span className="label" style={{ margin: 0 }}>
          Featured (★ pinned to the top of lists)
        </span>
      </label>
    </>
  )
}

function Field({
  label,
  name,
  type = 'text',
  defaultValue,
  required,
  hint,
  error,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string
  required?: boolean
  hint?: string
  error?: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="label">
        {label}
        {required && <span style={{ color: 'var(--red)' }}> *</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="input"
        style={{
          padding: '8px 12px',
          fontSize: 'var(--fs-body)',
          borderColor: error ? 'var(--red)' : undefined,
        }}
      />
      {hint && !error && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--ink-muted)' }}>
          {hint}
        </span>
      )}
      {error && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--red)' }}>
          {error}
        </span>
      )}
    </label>
  )
}

function TextareaField({
  label,
  name,
  defaultValue,
  rows,
  required,
  error,
}: {
  label: string
  name: string
  defaultValue?: string
  rows?: number
  required?: boolean
  error?: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="label">
        {label}
        {required && <span style={{ color: 'var(--red)' }}> *</span>}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows ?? 3}
        required={required}
        className="textarea"
        style={{
          padding: '8px 12px',
          fontSize: 'var(--fs-body)',
          fontFamily: 'var(--body)',
          resize: 'vertical',
          borderColor: error ? 'var(--red)' : undefined,
        }}
      />
      {error && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-tag)', color: 'var(--red)' }}>
          {error}
        </span>
      )}
    </label>
  )
}
