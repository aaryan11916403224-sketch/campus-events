import fs from 'node:fs'
import { JSDOM } from 'jsdom'

const base = 'https://aaryan11916403224-sketch.github.io/campus-events/'
const html = await (await fetch(base)).text()
const jsName = html.match(/assets\/([^"]+\.js)/)?.[1]
const js = await (await fetch(`${base}assets/${jsName}`)).text()
fs.mkdirSync('dist-debug', { recursive: true })
fs.writeFileSync('dist-debug/live-index.html', html)
fs.writeFileSync('dist-debug/live.js', js)

const dom = new JSDOM(html, { url: base, pretendToBeVisual: true, runScripts: 'outside-only' })
const { window } = dom
globalThis.window = window
globalThis.document = window.document
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true })
globalThis.localStorage = window.localStorage
globalThis.HTMLElement = window.HTMLElement
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window)
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window)
window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false } }))
globalThis.matchMedia = window.matchMedia

const errors = []
window.addEventListener('error', (e) => errors.push(`onerror: ${e.message}`))

try {
  window.eval(js)
} catch (e) {
  errors.push(`eval threw: ${e.message}`)
}

await new Promise((r) => setTimeout(r, 2000))
const rootLen = window.document.getElementById('root')?.innerHTML.length ?? -1
console.log('live bundle:', jsName)
console.log('root innerHTML length after 2s:', rootLen)
console.log('text sample:', window.document.body.textContent.slice(0, 100).replace(/\s+/g, ' '))
console.log('errors:', errors.length ? errors : 'none')
process.exit(rootLen > 5000 && errors.length === 0 ? 0 : 1)
