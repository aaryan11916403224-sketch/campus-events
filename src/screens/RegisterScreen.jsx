import { useRef, useState } from 'react'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { SelectField, TextField } from '../components/ui/TextField'
import { formatDate } from '../utils/date'
import { BRANCH_OPTIONS, YEAR_OPTIONS, validateRegistration } from '../utils/validation'

const initial = { name: '', email: '', phone: '', year: '', branch: '' }

export default function RegisterScreen({ event, onSubmit }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const formRef = useRef(null)

  const setField = (field, value) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) {
      const { [field]: fieldError } = validateRegistration(next)
      setErrors((prev) => ({ ...prev, [field]: fieldError }))
    }
  }

  const blurField = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const { [field]: fieldError } = validateRegistration(values)
    setErrors((prev) => ({ ...prev, [field]: fieldError }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError(null)

    const validation = validateRegistration(values)
    setErrors(validation)
    setTouched({ name: true, email: true, phone: true, year: true, branch: true })

    if (Object.keys(validation).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      setSubmitError(error?.message ?? 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-12 pt-8 sm:px-8">
      <a
        href={`#/event/${event.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        Back to event details
      </a>

      <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Step 1 of 2 · Your details</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Register for {event.title}
      </h1>
      <p className="mt-2 text-[15px] text-ink-soft">
        {formatDate(event.date)} · {event.venue} · {event.fee}
      </p>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="mt-8 rounded-[28px] border border-line bg-surface p-6 sm:p-9"
      >
        {submitError && (
          <div
            role="alert"
            className="mb-7 flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger-soft px-5 py-4"
          >
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div>
              <p className="text-sm font-semibold text-danger">Registration could not be completed</p>
              <p className="mt-1 text-sm text-ink-soft">{submitError}</p>
              <button
                type="submit"
                className="mt-2 text-sm font-semibold text-danger underline decoration-danger/40 underline-offset-4 hover:decoration-danger"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Aarav Sharma"
            value={values.name}
            error={touched.name ? errors.name : undefined}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => blurField('name')}
          />
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            hint="Use your college email if you have one."
            value={values.email}
            error={touched.email ? errors.email : undefined}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => blurField('email')}
          />
          <TextField
            label="Phone number"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="98XXXXXXXX"
            hint="10-digit mobile number, for event updates only."
            value={values.phone}
            error={touched.phone ? errors.phone : undefined}
            onChange={(e) => setField('phone', e.target.value)}
            onBlur={() => blurField('phone')}
          />
          <SelectField
            label="Year of study"
            name="year"
            options={YEAR_OPTIONS}
            value={values.year}
            error={touched.year ? errors.year : undefined}
            onChange={(e) => setField('year', e.target.value)}
            onBlur={() => blurField('year')}
          />
          <SelectField
            label="Branch"
            name="branch"
            options={BRANCH_OPTIONS}
            value={values.branch}
            error={touched.branch ? errors.branch : undefined}
            onChange={(e) => setField('branch', e.target.value)}
            onBlur={() => blurField('branch')}
          />
        </div>

        <div className="mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-soft">
            By registering you agree to the event rules shared on the day.
            <br />
            We never upload these details anywhere.
          </p>
          <Button type="submit" size="lg" loading={submitting} className="sm:min-w-52">
            {submitting ? 'Submitting…' : 'Confirm registration'}
            {!submitting && <Icon name="arrowRight" className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}
