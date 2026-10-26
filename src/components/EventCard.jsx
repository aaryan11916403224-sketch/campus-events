export default function EventCard({ event, index, isBookmarked, onToggleBookmark, onOpen }) {
  return (
    <article
      className="anim-fade-up group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className={`cover cover-${event.cover}`}>
        <span className="cover-emoji">{event.emoji}</span>
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {event.featured && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-600">
              Featured
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark(event.id)
            }}
            aria-label={isBookmarked ? `Remove ${event.title} from bookmarks` : `Bookmark ${event.title}`}
            aria-pressed={isBookmarked}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:scale-110 hover:text-indigo-500"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
        <span className="relative rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug">{event.title}</h3>

        <div className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formatDate(event.date)} · {event.time}
          </p>
          <p className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.venue}
          </p>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{event.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-indigo-500">{event.fee}</span>
          <button
            type="button"
            onClick={() => onOpen(event)}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-indigo-500 dark:bg-slate-700 dark:group-hover:bg-indigo-500"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  )
}
