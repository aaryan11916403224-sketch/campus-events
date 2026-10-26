import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'

const urlArgIndex = process.argv.indexOf('--url')
const LIVE_BASE = urlArgIndex !== -1 ? process.argv[urlArgIndex + 1] : 'https://aaryan11916403224-sketch.github.io/campus-events/'
const live = process.argv.includes('--live') || urlArgIndex !== -1

async function loadAssets() {
  if (live) {
    const html = await (await fetch(LIVE_BASE)).text()
    const jsName = html.match(/assets\/([^"]+\.js)/)?.[1]
    const js = await (await fetch(`${LIVE_BASE}assets/${jsName}`)).text()
    return { html, js, baseUrl: LIVE_BASE }
  }
  const html = fs.readFileSync(path.resolve('dist-debug/index.html'), 'utf8')
  const jsFile = fs.readdirSync('dist-debug/assets').find((f) => f.endsWith('.js'))
  const js = fs.readFileSync(path.resolve('dist-debug/assets', jsFile), 'utf8')
  return { html, js, baseUrl: 'https://example.test/campus-events/' }
}

function bootApp({ html, js, baseUrl, failFetch = false }) {
  const dom = new JSDOM(html, { url: baseUrl, pretendToBeVisual: true, runScripts: 'outside-only' })
  const { window } = dom
  window.scrollTo = () => {}
  window.Element.prototype.scrollIntoView = () => {}
  window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false } }))

  let fail = failFetch
  window.fetch = async (url, init) => {
    if (fail) return { ok: false, status: 500, json: async () => ({}) }
    if (live) return globalThis.fetch(new URL(String(url), baseUrl), init)
    if (String(url).includes('events.json')) {
      const data = fs.readFileSync('public/data/events.json', 'utf8')
      return { ok: true, status: 200, json: async () => JSON.parse(data) }
    }
    return { ok: false, status: 404, json: async () => ({}) }
  }

  const errors = []
  window.addEventListener('error', (e) => errors.push(e.message))
  window.eval(js)
  return { window, errors, setFetchFail: (value) => { fail = value } }
}

const results = []
async function test(name, fn) {
  try {
    await fn()
    results.push({ name, ok: true })
    console.log(`  PASS  ${name}`)
  } catch (error) {
    results.push({ name, ok: false, error: error.message })
    console.log(`  FAIL  ${name}\n        ${error.message}`)
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function waitFor(fn, message, timeout = 6000) {
  const start = Date.now()
  let lastError = null
  while (Date.now() - start < timeout) {
    try {
      const value = fn()
      if (value) return value
    } catch (error) {
      lastError = error
    }
    await new Promise((r) => setTimeout(r, 60))
  }
  throw new Error(`${message}${lastError ? ` (${lastError.message})` : ''}`)
}

function setReactInput(input, value) {
  const proto = input.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value').set
  setter.call(input, value)
  input.dispatchEvent(new window.Event('input', { bubbles: true }))
  input.dispatchEvent(new window.Event('change', { bubbles: true }))
}

const assets = await loadAssets()
const { window, errors } = bootApp(assets)
const $ = (sel) => window.document.querySelector(sel)
const $$ = (sel) => [...window.document.querySelectorAll(sel)]
const bodyText = () => window.document.body.textContent

console.log(`\nSmoke suite — ${live ? 'LIVE site' : 'local dist-debug build'}\n`)

await test('discover screen renders hero, featured and event cards', async () => {
  await waitFor(() => bodyText().includes('Upcoming events'), 'discover heading missing')
  assert(bodyText().includes('Find your'), 'hero headline missing')
  await waitFor(() => $$('#events article').length >= 4, `expected event cards, found ${$$('#events article').length}`)
})

await test('search matches multi-word queries ("code rush" finds CodeRush)', async () => {
  const input = $('#event-search')
  setReactInput(input, 'code rush')
  await waitFor(() => $('#events').textContent.includes('CodeRush 24-Hour Hackathon'), 'CodeRush not found for "code rush"')
  assert($$('#events article').length === 1, `expected 1 result, found ${$$('#events article').length}`)
  assert(!$('#events').textContent.includes('Winter Bootcamp'), 'unrelated events should be filtered out')
})

await test('search matches dates and filters unrelated events', async () => {
  setReactInput($('#event-search'), '20 nov')
  await waitFor(() => $('#events').textContent.includes('Winter Bootcamp'), 'date search failed')
  assert(!$('#events').textContent.includes('CyberQuest'), 'date search over-matched')
})

await test('clear button resets search results', async () => {
  const clearBtn = [...window.document.querySelectorAll('button')].find((b) => b.textContent.includes('Clear'))
  clearBtn.click()
  await waitFor(() => $$('#events article').length >= 6, 'cards did not come back after clearing')
})

await test('category filter narrows the list', async () => {
  const chip = [...window.document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Workshop')
  chip.click()
  await waitFor(
    () => $('#events').textContent.includes('Winter Bootcamp') && !$('#events').textContent.includes('CyberQuest'),
    'category filter failed',
  )
  const chip2 = [...window.document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'All')
  chip2.click()
  await waitFor(() => $$('#events article').length >= 6, 'cards did not restore')
})

await test('empty state appears for no matches and reset restores list', async () => {
  setReactInput($('#event-search'), 'zzzznothing')
  await waitFor(() => bodyText().includes('No events match that search'), 'empty state missing')
  const reset = [...window.document.querySelectorAll('button')].find((b) => b.textContent.includes('Reset search'))
  reset.click()
  await waitFor(() => $$('#events article').length >= 6, 'reset did not restore list')
})

await test('bookmark toggles and updates saved counter', async () => {
  const bookmarkBtn = $('#events article button[aria-pressed]')
  bookmarkBtn.click()
  await waitFor(() => bodyText().includes('Saved to your bookmarks'), 'bookmark toast missing')
  const savedCount = JSON.parse(window.localStorage.getItem('campus-events:bookmarks') ?? '[]')
  assert(savedCount.length === 1, 'bookmark not persisted to localStorage')
})

await test('clicking "View details" navigates to the details screen', async () => {
  const link = [...window.document.querySelectorAll('a')].find(
    (a) => a.getAttribute('href') === '#/event/coderush-hackathon',
  )
  assert(link, 'event link not found')
  link.click()
  await waitFor(() => bodyText().includes('Event essentials'), 'details screen did not open')
  assert(bodyText().includes('Register for this event'), 'register CTA missing on details')
  assert(/Date/i.test(bodyText()) && /Venue/i.test(bodyText()) && /Organiser/i.test(bodyText()), 'detail facts missing')
})

await test('register screen shows validation errors on empty submit', async () => {
  const registerCta = [...window.document.querySelectorAll('a,button')].find((el) => el.textContent.includes('Register for this event'))
  registerCta.click()
  await waitFor(() => bodyText().includes('Your details'), 'register screen did not open')
  $('form').requestSubmit()
  await waitFor(() => bodyText().includes('Please enter your full name.'), 'name validation error missing')
  assert(bodyText().includes('Please enter your email address.'), 'email error missing')
  assert(bodyText().includes('Please enter your phone number.'), 'phone error missing')
  assert(bodyText().includes('Select your year of study.'), 'year error missing')
  assert(bodyText().includes('Select your branch.'), 'branch error missing')
})

await test('invalid email and phone produce field errors', async () => {
  setReactInput($('input[name="name"]'), 'Aarav Sharma')
  setReactInput($('input[name="email"]'), 'not-an-email')
  setReactInput($('input[name="phone"]'), '12345')
  $('form').requestSubmit()
  await waitFor(() => bodyText().includes('valid email address'), 'email format error missing')
  assert(bodyText().includes('10-digit Indian mobile'), 'phone format error missing')
})

await test('valid submission shows success screen with confirmation code', async () => {
  setReactInput($('input[name="email"]'), 'aarav@college.edu')
  setReactInput($('input[name="phone"]'), '9876543210')
  setReactInput($('select[name="year"]'), '2nd year')
  setReactInput($('select[name="branch"]'), 'CSE')
  $('form').requestSubmit()
  await waitFor(() => bodyText().includes('Confirmation code'), 'success screen missing', 8000)
  assert(bodyText().includes('Step 2 of 2'), 'success step label missing')
  const stored = JSON.parse(window.localStorage.getItem('campus-events:registrations') ?? '{}')
  const code = stored['coderush-hackathon']?.code
  assert(code, 'registration not stored')
  assert(bodyText().includes(code), `confirmation code ${code} not rendered`)
  assert(bodyText().includes('Aarav Sharma'), 'registrant name missing on success')
})

await test('manage screen can cancel the registration', async () => {
  window.location.hash = '#/event/coderush-hackathon/manage'
  await waitFor(() => bodyText().includes('This is your current registration'), 'manage screen missing')
  const cancelBtn = [...window.document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Cancel registration')
  assert(cancelBtn, 'cancel button missing')
  cancelBtn.click()
  const confirm = await waitFor(
    () => [...window.document.querySelectorAll('button')].find((b) => b.textContent.includes('Yes, cancel it')),
    'confirm step missing',
  )
  confirm.click()
  await waitFor(() => bodyText().includes('Register for this event'), 'did not return to details after cancel')
  const stored = JSON.parse(window.localStorage.getItem('campus-events:registrations') ?? '{}')
  assert(Object.keys(stored).length === 0, 'registration not removed')
})

await test('no runtime errors during the whole flow', async () => {
  assert(errors.length === 0, `runtime errors: ${errors.join(' | ')}`)
})

// second app instance: data-load failure + retry
{
  const app2 = bootApp({ ...assets, failFetch: true })
  await test('load failure shows error state with working retry', async () => {
    await waitFor(() => app2.window.document.body.textContent.includes('Could not load events'), 'error state missing')
    assert(app2.window.document.body.textContent.includes('Try again'), 'retry button missing')
    app2.setFetchFail(false)
    const retry = [...app2.window.document.querySelectorAll('button')].find((b) => b.textContent.includes('Try again'))
    retry.click()
    await waitFor(() => app2.window.document.querySelectorAll('#events article').length >= 4, 'retry did not restore cards')
    assert(app2.window.document.body.textContent.includes('Upcoming events'), 'discover heading missing after retry')
  })
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
