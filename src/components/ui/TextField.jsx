import { useId } from 'react'

function FieldShell({ id, label, hint, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-baseline gap-1.5 text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="text-danger" aria-hidden="true">*</span>}
        {!required && <span className="font-normal text-ink-soft">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-xs font-medium text-danger">
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5M12 16.2v.3" />
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({ label, hint, error, required = true, className = '', ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`h-12 rounded-2xl border bg-surface px-4 text-[15px] text-ink outline-none transition placeholder:text-ink-soft/70 focus:ring-4 ${
          error
            ? 'border-danger focus:border-danger focus:ring-danger/12'
            : 'border-line focus:border-accent focus:ring-accent/12'
        } ${className}`}
        {...props}
      />
    </FieldShell>
  )
}

export function SelectField({ label, hint, error, required = true, options = [], placeholder = 'Select…', ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`h-12 w-full appearance-none rounded-2xl border bg-surface px-4 pr-10 text-[15px] text-ink outline-none transition focus:ring-4 ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/12'
              : 'border-line focus:border-accent focus:ring-accent/12'
          }`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  )
}
