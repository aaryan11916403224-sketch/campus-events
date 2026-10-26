import { useEffect, useMemo, useState } from 'react'
import EmptyState from './components/EmptyState'
import EventCard from './components/EventCard'
import EventModal from './components/EventModal'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import SearchFilters from './components/SearchFilters'
import SkeletonCard from './components/SkeletonCard'
import { useLocalStorage } from './hooks/useLocalStorage'
import eventsData from './data/events.json'

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Competition', 'Expo', 'Summit', 'Gaming']

export default function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [savedOnly, setSavedOnly] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [toast, setToast] = useState(null)
  const [bookmarks, setBookmarks] = useLocalStorage('campus-events:bookmarks', [])
  const [registeredIds, setRegisteredIds] = useLocalStorage('campus-events:registered', [])
  const [dark, setDark] = useLocalStorage('campus-events:theme', false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(eventsData)
      setLoading(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id)
      setToast(exists ? 'Removed from bookmarks' : 'Event bookmarked ★')
      return exists ? prev.filter((item) => item !== id) : [...prev, id]
    })
  }

  const handleRegister = (event) => {
    setRegisteredIds((prev) => (prev.includes(event.id) ? prev : [...prev, event.id]))
    setToast(`Registered for ${event.title} ✓`)
    setSelectedEvent(null)
  }

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setSavedOnly(false)
  }

  const filteredEvents = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return events.filter((event) => {
      if (category !== 'All' && event.category !== category) return false
      if (savedOnly && !bookmarks.includes(event.id)) return false
      if (!needle) return true
      const haystack = [event.title, event.organiser, event.summary, event.category, ...event.tags]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [events, query, category, savedOnly, bookmarks])

  return (
    <div className="min-h-screen">
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark((prev) => !prev)}
        savedCount={bookmarks.length}
        onShowSaved={() => {
          setSavedOnly(true)
          setCategory('All')
          document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <main>
        <Hero eventCount={events.length} categoryCount={CATEGORIES.length - 1} />

        <section id="events" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-8 sm:px-6">
          <SearchFilters
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            categories={CATEGORIES}
            savedOnly={savedOnly}
            onToggleSavedOnly={() => setSavedOnly((prev) => !prev)}
            resultCount={filteredEvents.length}
          />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  isBookmarked={bookmarks.includes(event.id)}
                  onToggleBookmark={toggleBookmark}
                  onOpen={setSelectedEvent}
                />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState onClear={clearFilters} savedOnly={savedOnly} />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isBookmarked={bookmarks.includes(selectedEvent.id)}
          isRegistered={registeredIds.includes(selectedEvent.id)}
          onToggleBookmark={toggleBookmark}
          onRegister={handleRegister}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {toast && (
        <div
          role="status"
          className="anim-pop-in fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-900"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
