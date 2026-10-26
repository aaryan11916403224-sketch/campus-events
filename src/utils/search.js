export function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function queryTokens(query) {
  return normalize(query).split(' ').filter(Boolean)
}

export function eventHaystack(event, dateLabel = '') {
  return normalize(
    [
      event.title,
      event.organiser,
      event.summary,
      event.details,
      event.category,
      event.venue,
      event.fee,
      event.duration,
      dateLabel,
      ...event.tags,
    ].join(' '),
  )
}

export function matchesQuery(event, query, dateLabel = '') {
  const tokens = queryTokens(query)
  if (tokens.length === 0) return true
  const haystack = eventHaystack(event, dateLabel)
  return tokens.every((token) => haystack.includes(token))
}

export function highlightSegments(text, query) {
  const tokens = queryTokens(query)
  if (!tokens.length || !text) return [{ text: String(text ?? ''), match: false }]

  const escaped = tokens
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

  return String(text)
    .split(pattern)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, match: escaped.some((t) => part.toLowerCase().includes(t.toLowerCase())) }))
}
