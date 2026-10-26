import { useState } from 'react'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { formatDate } from '../utils/date'

export default function RegistrationStatusScreen({ event, registration, isNew, onCancel }) {
  const [confirmingCancel, setConfirmingCancel] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState(null)

  const handleCancel = async () => {
    setCancelling(true)
    setCancelError(null)
    try {
      await onCancel()
    } catch (error) {
      setCancelError(error?.message ?? 'Could not cancel the registration. Please try again.')
      setCancelling(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-12 pt-10 sm:px-8">
      <div className="anim-pop-in rounded-[32px] border border-line bg-surface p-8 text-center sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft">
          <svg className="anim-check h-10 w-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
          {isNew ? 'Step 2 of 2 · Confirmed' : 'Your registration'}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-[40px]">
          {isNew ? "You're registered!" : 'Registration confirmed'}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          {isNew ? (
            <>A seat is reserved for you at <strong className="font-semibold text-ink">{event.title}</strong>. Save the confirmation code below — you may be asked for it at the venue.</>
          ) : (
            <>This is your current registration for <strong className="font-semibold text-ink">{event.title}</strong>.</>
          )}
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-[22px] border border-dashed border-accent/40 bg-accent-soft/50 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Confirmation code</p>
          <p className="mt-1.5 font-display text-3xl font-semibold tracking-widest text-ink">{registration.code}</p>
        </div>

        <dl className="mx-auto mt-8 max-w-md space-y-3 text-left">
          {[
            { label: 'Name', value: registration.name },
            { label: 'Email', value: registration.email },
            { label: 'Phone', value: `+91 ${registration.phone}` },
            { label: 'Year · Branch', value: `${registration.year} · ${registration.branch}` },
            { label: 'When & where', value: `${formatDate(event.date)}, ${event.time} · ${event.venue}` },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-line pb-2.5 last:border-0">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{row.label}</dt>
              <dd className="text-right text-sm font-medium text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" onClick={() => (window.location.hash = '#/')}>
            <Icon name="compass" className="h-4 w-4" />
            Browse more events
          </Button>
          <Button size="lg" variant="outline" onClick={() => (window.location.hash = `#/event/${event.id}`)}>
            Back to event
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-[22px] border border-line bg-surface p-6">
        {cancelError && (
          <p role="alert" className="mb-4 rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger">
            {cancelError}
          </p>
        )}
        {confirmingCancel ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-ink">Cancel your registration?</p>
            <p className="mt-1 text-sm text-ink-soft">This frees your seat for someone else. You can register again later.</p>
            <div className="mt-4 flex flex-col justify-center gap-2.5 sm:flex-row">
              <Button variant="danger" loading={cancelling} onClick={handleCancel}>
                Yes, cancel it
              </Button>
              <Button variant="outline" disabled={cancelling} onClick={() => setConfirmingCancel(false)}>
                Keep my seat
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-ink-soft">Plans changed? You can release your seat any time.</p>
            <Button variant="ghost" size="sm" onClick={() => setConfirmingCancel(true)}>
              Cancel registration
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
