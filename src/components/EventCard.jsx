import { formatDate } from '../utils/date'
import { categoryIcons } from '../utils/categories'
import { highlightSegments } from '../utils/search'
import Icon from './ui/Icon'

function Highlight({ text, query }) {
  return (
    <>
      {highlightSegments(text, query).map((segment, index) =>
        segment.match ? <mark key={index}>{segment.text}</mark> : <span key={index}>{segment.text}</span>,
      )}
    </>
  )
}

export default function EventCard({ event, index, query = '', isBookmarked, onToggleBookmark, featured = false }) {
  const dateLabel = formatDate(event.date)

  return (
    <article
      className={`anim-fade-up group relative flex overflow-hidden rounded-[28px] border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(34,30,27,0.12)] ${
        featured ? 'flex-col sm:col-span-2 sm:flex-row' : 'flex-col'
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <div className={`cover cover-${event.cover} ${featured ? 'h-56 sm:h-auto sm:w-[42%] sm:min-h-[300px]' : 'h-44'}`}>
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <Icon name={categoryIcons[event.category] ?? 'spark'} className="h-3.5 w-3.5" />
          {event.category}
        </span>
        {event.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-amber-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber">
            Featured
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? 'sm:p-8' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              {dateLabel} · {event.time}
            </p>
            <h3 className={`mt-2 font-display font-semibold leading-snug ${featured ? 'text-[26px]' : 'text-xl'}`}>
              <a href={`#/event/${event.id}`} className="transition hover:text-accent">
                <Highlight text={event.title} query={query} />
              </a>
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onToggleBookmark(event.id)}
            aria-label={isBookmarked ? `Remove ${event.title} from saved events` : `Save ${event.title}`}
            aria-pressed={isBookmarked}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
              isBookmarked
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line text-ink-soft hover:border-accent/50 hover:text-accent'
            }`}
          >
            <Icon name="bookmark" className="h-[18px] w-[18px]" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="pin" className="h-4 w-4 text-accent" />
            <Highlight text={event.venue} query={query} />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="users" className="h-4 w-4 text-accent" />
            {event.seats} seats · {event.fee}
          </span>
        </div>

        <p className={`mt-3 text-sm leading-relaxed text-ink-soft ${featured ? 'line-clamp-3 max-w-lg' : 'line-clamp-2'}`}>
          <Highlight text={event.summary} query={query} />
        </p>

        <div className="mt-auto pt-5">
          <a
            href={`#/event/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition group-hover:decoration-accent"
          >
            {featured ? 'View details & register' : 'View details'}
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
