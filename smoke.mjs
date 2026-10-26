import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'

const html = fs.readFileSync(path.resolve('dist-debug/index.html'), 'utf8')
const dom = new JSDOM(html, {
  url: 'https://aaryan11916403224-sketch.github.io/campus-events/',
  pretendToBeVisual: true,
  runScripts: 'outside-only',
})

const { window } = dom
globalThis.window = window
globalThis.document = window.document
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true })
globalThis.localStorage = window.localStorage
globalThis.HTMLElement = window.HTMLElement
globalThis.HTMLInputElement = window.HTMLInputElement
globalThis.Event = window.Event
globalThis.CustomEvent = window.CustomEvent
globalThis.Node = window.Node
globalThis.MutationObserver = window.MutationObserver
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window)
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window)
window.matchMedia = window.matchMedia || ((query) => ({
  matches: false, media: query, onchange: null,
  addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false },
}))
globalThis.matchMedia = window.matchMedia

const errors = []
window.addEventListener('error', (e) => errors.push(`window.onerror: ${e.message}\n${e.error?.stack ?? ''}`))
window.addEventListener('unhandledrejection', (e) => errors.push(`unhandledrejection: ${e.reason}`))
const origError = console.error
console.error = (...args) => { errors.push(`console.error: ${args.map(String).join(' ')}`); origError(...args) }

const jsFile = fs.readdirSync('dist-debug/assets').find((f) => f.endsWith('.js'))
const code = fs.readFileSync(path.resolve('dist-debug/assets', jsFile), 'utf8')

try {
  window.eval(code)
} catch (e) {
  errors.push(`eval threw: ${e.stack}`)
}

await new Promise((r) => setTimeout(r, 2000))

const rootLen = window.document.getElementById('root')?.innerHTML.length ?? -1
console.log('--- root innerHTML length after 2s:', rootLen)
console.log('--- body text sample:', window.document.body.textContent.slice(0, 120).replace(/\s+/g, ' '))
console.log('--- errors captured:', errors.length)
errors.forEach((e) => console.log('\n====\n', e))
process.exit(0)
