import { useEffect, useRef } from 'react'
import Icon from './ui/Icon'

export default function SearchFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  savedOnly,
  onToggleSavedOnly,
  resultCount,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)
      if (event.key === '/' && !typing) {
        event.preventDefault()
        inputRef.current?.focus()
      }
      if (event.key === 'Escape' && document.activeElement === inputRef.current && query) {
        onQueryChange('')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [query, onQueryChange])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
          <input
            id="event-search"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search “hackathon”, “robotics”, “20 Nov”…"
            autoComplete="off"
            className="h-[58px] w-full rounded-full border border-line bg-surface pl-[52px] pr-24 text-[15px] outline-none transition placeholder:text-ink-soft/70 focus:border-accent focus:ring-4 focus:ring-accent/12"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                onQueryChange('')
                inputRef.current?.focus()
              }}
              className="absolute right-3.5 top-1/2 flex h-9 -translate-y-1/2 items-center gap-1 rounded-full bg-page-deep px-3 text-xs font-semibold text-ink-soft transition hover:bg-line hover:text-ink"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
              Clear
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-md border border-line bg-page px-2 py-1 text-[11px] font-semibold text-ink-soft sm:block">
              press /
            </kbd>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleSavedOnly}
          aria-pressed={savedOnly}
          className={`flex h-[58px] items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition ${
            savedOnly
              ? 'border-ink bg-ink text-page'
              : 'border-line bg-surface text-ink hover:border-ink/30 hover:bg-page-deep/50'
          }`}
        >
          <Icon name="bookmark" className="h-4.5 w-4.5" fill={savedOnly ? 'currentColor' : 'none'} />
          Bookmarked only
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            aria-pressed={category === item}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
              category === item
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line bg-surface text-ink-soft hover:border-accent/40 hover:text-ink'
            }`}
          >
            {item}
          </button>
        ))}

        <p className="ml-auto text-[13px] text-ink-soft" role="status">
          {resultCount === 0 ? (
            <>No matches</>
          ) : (
            <>
              <strong className="font-semibold text-ink">{resultCount}</strong> event{resultCount === 1 ? '' : 's'}
              {query.trim() && (
                <>
                  {' '}for “<span className="font-semibold text-ink">{query.trim()}</span>”
                </>
              )}
            </>
          )}
        </p>
      </div>
    </div>
  )
}
