const STORAGE_KEY = 'campus-events:registrations'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function loadRegistrations() {
  return readAll()
}

export function makeConfirmationCode(eventId) {
  const stamp = Date.now().toString(36).slice(-4).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `${eventId.slice(0, 3).toUpperCase()}-${stamp}${rand}`
}

export function saveRegistration(event, values) {
  const registration = {
    eventId: event.id,
    eventTitle: event.title,
    code: makeConfirmationCode(event.id),
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.replace(/\D/g, ''),
    year: values.year,
    branch: values.branch,
    registeredAt: new Date().toISOString(),
  }

  const all = readAll()
  all[event.id] = registration
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    throw new Error('We could not save your registration on this device. Please try again.')
  }
  return registration
}

export function cancelRegistration(eventId) {
  const all = readAll()
  delete all[eventId]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    throw new Error('We could not update your registration on this device. Please try again.')
  }
}
