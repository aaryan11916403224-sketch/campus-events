import { useEffect } from 'react'
import { formatDate } from '../utils/date'

export default function EventModal({ event, isBookmarked, isRegistered, onToggleBookmark, onRegister, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (!event) return null

  return (
    <div
      className="anim-fade-in fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="anim-pop-in relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`cover cover-${event.cover} h-48`}>
          <span className="cover-emoji text-5xl">{event.emoji}</span>
          <span className="relative rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {event.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:scale-105 hover:text-indigo-500"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h2 id="event-modal-title" className="font-display text-2xl font-bold sm:text-3xl">
            {event.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-indigo-500">Organised by {event.organiser}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { label: 'Date', value: formatDate(event.date), icon: 'M8 2v4M16 2v4M3 10h18' },
              { label: 'Time', value: `${event.time} · ${event.duration}`, icon: 'M12 6v6l4 2' },
              { label: 'Venue', value: event.venue, icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
              { label: 'Fee', value: event.fee, icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-300">{event.details}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {event.seats} seats available
            </p>
            <p className="mt-1">Registration is first-come, first-served. Bring your college ID on the day of the event.</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onRegister(event)}
              disabled={isRegistered}
              className={`flex-1 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                isRegistered
                  ? 'cursor-default bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:bg-indigo-600'
              }`}
            >
              {isRegistered ? '✓ Registered successfully' : 'Register for this event'}
            </button>
            <button
              type="button"
              onClick={() => onToggleBookmark(event.id)}
              className="rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700 dark:text-slate-200"
            >
              {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
