export default function EmptyState({ onClear, savedOnly }) {
  return (
    <div className="anim-fade-in flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl dark:bg-indigo-500/10">
        🔍
      </div>
      <h3 className="mt-5 font-display text-xl font-bold">No events found</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {savedOnly
          ? "You haven't bookmarked any events matching these filters yet. Explore events and tap the bookmark icon to save them here."
          : "We couldn't find any events matching your search. Try a different keyword or clear the filters."}
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-600"
      >
        Clear all filters
      </button>
    </div>
  )
}
