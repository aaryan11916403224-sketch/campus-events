import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import EventCard from '../components/EventCard'
import Hero from '../components/Hero'
import SearchFilters from '../components/SearchFilters'
import SkeletonCard from '../components/SkeletonCard'

export default function DiscoverScreen({
  events,
  status,
  onRetry,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  savedOnly,
  onToggleSavedOnly,
  onClearFilters,
  bookmarks,
  onToggleBookmark,
  filteredEvents,
}) {
  const featuredEvents = events.filter((event) => event.featured)
  const heroFeatured = featuredEvents[0] ?? events[0]

  return (
    <>
      <Hero eventCount={events.length} categoryCount={categories.length - 1} featuredEvent={heroFeatured} />

      {status === 'ready' && featuredEvents.length > 0 && (
        <section id="featured" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-4 sm:px-8">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber">Hand-picked</p>
              <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Featured this season
              </h2>
            </div>
            <a
              href="#events"
              className="hidden text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent sm:block"
            >
              Browse everything
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredEvents.slice(0, 2).map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                query={query}
                featured={index === 0}
                isBookmarked={bookmarks.includes(event.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </section>
      )}

      <section id="events" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-14 sm:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">The full list</p>
            <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Upcoming events</h2>
          </div>
        </div>

        <div className="mt-7">
          <SearchFilters
            query={query}
            onQueryChange={onQueryChange}
            category={category}
            onCategoryChange={onCategoryChange}
            categories={categories}
            savedOnly={savedOnly}
            onToggleSavedOnly={onToggleSavedOnly}
            resultCount={filteredEvents.length}
          />
        </div>

        <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {status === 'loading' ? (
            <>
              <SkeletonCard featured />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : status === 'error' ? (
            <div className="col-span-full">
              <ErrorState onRetry={onRetry} />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                query={query}
                featured={index === 0 && event.featured && !query && category === 'All'}
                isBookmarked={bookmarks.includes(event.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState onClear={onClearFilters} savedOnly={savedOnly} query={query} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
