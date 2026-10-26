import { useEffect, useState } from 'react'

export function parseRoute(hash) {
  const clean = String(hash ?? '').replace(/^#\/?/, '')
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'discover' }
  if (parts[0] === 'event' && parts[1]) {
    const id = decodeURIComponent(parts[1])
    if (!parts[2] || parts[2] === 'details') return { name: 'details', id }
    if (parts[2] === 'register') return { name: 'register', id }
    if (parts[2] === 'success') return { name: 'success', id }
    if (parts[2] === 'manage') return { name: 'manage', id }
  }
  return { name: 'notFound' }
}

export function navigate(path) {
  window.location.hash = path
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))

  useEffect(() => {
    const onChange = () => {
      setRoute(parseRoute(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
