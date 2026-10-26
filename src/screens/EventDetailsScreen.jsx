import { formatDate } from '../utils/date'
import { categoryIcons } from '../utils/categories'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

export default function EventDetailsScreen({ event, isBookmarked, registration, onToggleBookmark }) {
  const facts = [
    { icon: 'calendar', label: 'Date', value: formatDate(event.date) },
    { icon: 'clock', label: 'Time & duration', value: `${event.time} · ${event.duration}` },
    { icon: 'pin', label: 'Venue', value: event.venue },
    { icon: 'users', label: 'Organiser', value: event.organiser },
    { icon: 'tag', label: 'Entry', value: `${event.fee} · ${event.seats} seats` },
    { icon: categoryIcons[event.category] ?? 'spark', label: 'Category', value: event.category },
  ]

  return (
    <div className="mx-auto max-w-5xl px-5 pb-10 pt-8 sm:px-8">
      <a
        href="#/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        Back to all events
      </a>

      <div className={`cover cover-${event.cover} mt-6 h-64 rounded-[32px] sm:h-80`}>
        <div className="relative flex w-full items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Icon name={categoryIcons[event.category] ?? 'spark'} className="h-3.5 w-3.5" />
              {event.category}
            </span>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {event.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => onToggleBookmark(event.id)}
            aria-pressed={isBookmarked}
            aria-label={isBookmarked ? 'Remove from saved events' : 'Save this event'}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${
              isBookmarked ? 'bg-white text-accent' : 'bg-white/25 text-white hover:bg-white/40'
            }`}
          >
            <Icon name="bookmark" className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed text-ink">{event.summary}</p>
          <p className="mt-5 leading-relaxed text-ink-soft">{event.details}</p>

          <h2 className="mt-9 font-display text-xl font-semibold">What to expect</h2>
          <ul className="mt-4 space-y-2.5">
            {event.tags.map((tag) => (
              <li key={tag} className="flex items-center gap-2.5 text-[15px] text-ink">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[28px] border border-line bg-surface p-6">
            <h2 className="font-display text-lg font-semibold">Event essentials</h2>
            <dl className="mt-5 space-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-page-deep text-accent">
                    <Icon name={fact.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{fact.label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-7 border-t border-line pt-6">
              {registration ? (
                <>
                  <p className="flex items-center gap-2 rounded-2xl bg-accent-soft px-4 py-3 text-sm font-semibold text-accent">
                    <Icon name="check" className="h-4 w-4" />
                    You’re registered · {registration.code}
                  </p>
                  <Button variant="outline" size="lg" className="mt-3 w-full" onClick={() => (window.location.hash = `#/event/${event.id}/manage`)}>
                    Manage registration
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="w-full" onClick={() => (window.location.hash = `#/event/${event.id}/register`)}>
                    Register for this event
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Button>
                  <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                    Free to register · Takes under a minute · Confirmation is stored on this device
                  </p>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
