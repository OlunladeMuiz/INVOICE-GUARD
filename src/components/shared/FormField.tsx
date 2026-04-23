import type { ReactNode } from 'react'

export interface FormFieldProps {
  label?: string
  hint?: string
  error?: string
  children: ReactNode
}

export function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <label className="field" data-error={Boolean(error)}>
      {label ? <span className="field__label">{label}</span> : null}
      {children}
      {hint ? <span className="field__hint">{hint}</span> : null}
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  )
}
