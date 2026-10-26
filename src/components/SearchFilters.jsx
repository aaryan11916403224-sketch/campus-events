export default function SearchFilters({ query, onQueryChange, category, onCategoryChange, categories, savedOnly, onToggleSavedOnly, resultCount }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search events</span>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by event, organiser or tag…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500"
          />
        </label>

        <button
          type="button"
          onClick={onToggleSavedOnly}
          aria-pressed={savedOnly}
          className={`flex items-center justify-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-semibold transition ${
            savedOnly
              ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
              : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
          }`}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill={savedOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
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
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              category === item
                ? 'border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {item}
          </button>
        ))}

        <span className="ml-auto text-xs font-medium text-slate-500">
          {resultCount} event{resultCount === 1 ? '' : 's'} found
        </span>
      </div>
    </div>
  )
}
