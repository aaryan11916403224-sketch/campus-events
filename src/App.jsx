import { useCallback, useEffect, useMemo, useState } from 'react'
import ErrorState from './components/ErrorState'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { navigate, useHashRoute } from './hooks/useHashRoute'
import { useLocalStorage } from './hooks/useLocalStorage'
import DiscoverScreen from './screens/DiscoverScreen'
import EventDetailsScreen from './screens/EventDetailsScreen'
import RegisterScreen from './screens/RegisterScreen'
import RegistrationStatusScreen from './screens/RegistrationStatusScreen'
import { formatDate } from './utils/date'
import { cancelRegistration, loadRegistrations, saveRegistration } from './utils/registration'
import { matchesQuery } from './utils/search'

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Competition', 'Expo', 'Summit', 'Gaming']

export default function App() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [savedOnly, setSavedOnly] = useState(false)
  const [toast, setToast] = useState(null)
  const [bookmarks, setBookmarks] = useLocalStorage('campus-events:bookmarks', [])
  const [registrations, setRegistrations] = useState(() => loadRegistrations())
  const [dark, setDark] = useLocalStorage('campus-events:theme', false)
  const route = useHashRoute()

  const retryEvents = useCallback(() => {
    setStatus('loading')
    setLoadAttempt((attempt) => attempt + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/events.json`, { cache: 'no-cache' })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) throw new Error('Event catalogue is empty')
        if (cancelled) return
        setEvents(data)
        setStatus('ready')
      } catch (error) {
        console.error('Failed to load events:', error)
        if (!cancelled) setStatus('error')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [loadAttempt])

  useEffect(() => {
    const onStorage = () => {
      setBookmarks(JSON.parse(localStorage.getItem('campus-events:bookmarks') ?? '[]'))
      setRegistrations(loadRegistrations())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [setBookmarks])

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
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id]
      try {
        localStorage.setItem('campus-events:bookmarks', JSON.stringify(next))
      } catch {
        // device storage unavailable — keep in-memory only
      }
      return next
    })
    setToast(bookmarks.includes(id) ? 'Removed from saved events' : 'Saved to your bookmarks')
  }

  const currentEvent = useMemo(() => events.find((event) => event.id === route.id) ?? null, [events, route])
  const currentRegistration = route.id ? registrations[route.id] : undefined

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (category !== 'All' && event.category !== category) return false
      if (savedOnly && !bookmarks.includes(event.id)) return false
      return matchesQuery(event, query, formatDate(event.date))
    })
  }, [events, query, category, savedOnly, bookmarks])

  const handleRegisterSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 650))
    saveRegistration(currentEvent, values)
    setRegistrations(loadRegistrations())
    setToast(`Registered for ${currentEvent.title} ✓`)
    navigate(`#/event/${currentEvent.id}/success`)
  }

  const handleCancelRegistration = async () => {
    await new Promise((resolve) => setTimeout(resolve, 450))
    cancelRegistration(currentEvent.id)
    setRegistrations(loadRegistrations())
    setToast('Registration cancelled')
    navigate(`#/event/${currentEvent.id}`)
  }

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setSavedOnly(false)
  }

  let screen
  if (route.name === 'discover') {
    screen = (
      <DiscoverScreen
        events={events}
        status={status}
        onRetry={retryEvents}
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={CATEGORIES}
        savedOnly={savedOnly}
        onToggleSavedOnly={() => setSavedOnly((prev) => !prev)}
        onClearFilters={clearFilters}
        bookmarks={bookmarks}
        onToggleBookmark={toggleBookmark}
        filteredEvents={filteredEvents}
      />
    )
  } else if (status === 'loading') {
    screen = (
      <div className="mx-auto max-w-3xl px-5 py-24">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton mt-6 h-64 w-full rounded-[32px]" />
      </div>
    )
  } else if (status === 'error') {
    screen = (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <ErrorState onRetry={retryEvents} />
      </div>
    )
  } else if (!currentEvent) {
    screen = (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <ErrorState
          title="Event not found"
          message="This event may have been removed, or the link is incorrect."
          onRetry={() => navigate('#/')}
        />
      </div>
    )
  } else if (route.name === 'details') {
    screen = (
      <EventDetailsScreen
        event={currentEvent}
        isBookmarked={bookmarks.includes(currentEvent.id)}
        registration={currentRegistration}
        onToggleBookmark={toggleBookmark}
      />
    )
  } else if (route.name === 'register') {
    screen = currentRegistration ? (
      <RegistrationStatusScreen
        event={currentEvent}
        registration={currentRegistration}
        isNew={false}
        onCancel={handleCancelRegistration}
      />
    ) : (
      <RegisterScreen event={currentEvent} onSubmit={handleRegisterSubmit} />
    )
  } else {
    screen = currentRegistration ? (
      <RegistrationStatusScreen
        event={currentEvent}
        registration={currentRegistration}
        isNew={route.name === 'success'}
        onCancel={handleCancelRegistration}
      />
    ) : (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <ErrorState
          title="No registration found"
          message="You have not registered for this event yet."
          onRetry={() => navigate(`#/event/${currentEvent.id}/register`)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page text-ink">
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark((prev) => !prev)}
        savedCount={bookmarks.length}
        onShowSaved={() => {
          setSavedOnly(true)
          setCategory('All')
          navigate('#/')
          requestAnimationFrame(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }))
        }}
      />
      <main>{screen}</main>
      <Footer />
      {toast && (
        <div
          role="status"
          className="anim-pop-in fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-page shadow-[0_16px_40px_rgba(34,30,27,0.25)]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
