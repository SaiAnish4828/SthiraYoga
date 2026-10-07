/**
 * DOM-level interaction smoke test (no real browser available in this env).
 * Renders the app into jsdom and exercises the key journeys:
 *   1. sections present
 *   2. mobile menu opens/closes (button + Escape)
 *   3. gallery filter + lightbox navigation (buttons + arrows + Escape)
 *   4. testimonial carousel next arrow
 *   5. booking form: invalid submit shows errors; valid submit shows the
 *      confirmation message
 *
 * Run with:  npm run smoke:dom
 */
import { JSDOM } from 'jsdom'

/* ---------------------------------------------------------------- setup --- */

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'https://sthira.test/',
  pretendToBeVisual: true,
})

const { window } = dom

const define = (key: string, value: unknown) =>
  Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })

define('window', window)
define('document', window.document)
define('navigator', window.navigator)
define('HTMLElement', window.HTMLElement)
define('HTMLInputElement', window.HTMLInputElement)
define('HTMLTextAreaElement', window.HTMLTextAreaElement)
define('HTMLSelectElement', window.HTMLSelectElement)
define('Element', window.Element)
define('Node', window.Node)
define('Event', window.Event)
define('MouseEvent', window.MouseEvent)
define('KeyboardEvent', window.KeyboardEvent)
define('getComputedStyle', window.getComputedStyle.bind(window))
define('requestAnimationFrame', window.requestAnimationFrame.bind(window))
define('cancelAnimationFrame', window.cancelAnimationFrame.bind(window))

window.scrollTo = () => {}
// jsdom has no layout — silence the not-implemented warnings we do not need
window.matchMedia =
  window.matchMedia ??
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false
    },
  }))

window.HTMLElement.prototype.scrollIntoView = window.HTMLElement.prototype.scrollIntoView ?? (() => {})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `  (${detail})` : ''}`)
  if (!ok) failures += 1
}

const $ = <T extends Element = Element>(selector: string) =>
  window.document.querySelector<T>(selector)
const $$ = <T extends Element = Element>(selector: string) =>
  Array.from(window.document.querySelectorAll<T>(selector))

const click = (el: Element) =>
  el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }))

const setInputValue = (el: HTMLInputElement | HTMLTextAreaElement, value: string) => {
  const proto =
    el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
  setter?.call(el, value)
  el.dispatchEvent(new window.Event('input', { bubbles: true }))
}

const setSelectValue = (el: HTMLSelectElement, value: string) => {
  el.value = value
  el.dispatchEvent(new window.Event('change', { bubbles: true }))
}

/* --------------------------------------------------------------- render --- */

async function main() {
  const { createRoot } = await import('react-dom/client')
  const { default: App } = await import('@/App')

  const root = createRoot(window.document.getElementById('root')!)
  root.render(<App />)
  await sleep(120)

  /* 1 — sections present */
  for (const id of ['home', 'intro', 'about', 'founder', 'services', 'trainers', 'why', 'gallery', 'testimonials', 'book', 'contact']) {
    check(`section #${id} rendered`, Boolean(window.document.getElementById(id)))
  }
  check('single h1', $$('h1').length === 1, `found ${$$('h1').length}`)
  check('13 service cards', $$('.service-card').length === 13, `found ${$$('.service-card').length}`)
  check('3 trainer cards', $$('.trainer-card').length === 3, `found ${$$('.trainer-card').length}`)
  check('12 gallery tiles', $$('.gallery__button').length === 12, `found ${$$('.gallery__button').length}`)

  /* 2 — mobile menu */
  const toggle = $('.nav__toggle')!
  const drawer = $('#mobile-menu')!
  click(toggle)
  await sleep(30)
  check('mobile menu opens', drawer.classList.contains('is-open'))
  window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  await sleep(30)
  check('mobile menu closes on Escape', !drawer.classList.contains('is-open'))

  /* 3 — gallery filter + lightbox */
  const wellnessChip = $$('.gallery__chip').find((chip) => chip.textContent === 'Wellness')!
  click(wellnessChip)
  await sleep(30)
  check(
    'gallery filter shows 3 wellness images',
    $$('.gallery__button').length === 3,
    `found ${$$('.gallery__button').length}`,
  )

  click($$('.gallery__button')[0])
  await sleep(30)
  const dialog = $('.lightbox')!
  check('lightbox opens', Boolean(dialog))
  check('lightbox counter starts 1/3', Boolean($('.lightbox__count')?.textContent?.includes('1 / 3')))

  window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
  await sleep(30)
  check('ArrowRight advances lightbox', Boolean($('.lightbox__count')?.textContent?.includes('2 / 3')))

  window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  await sleep(30)
  check('Escape closes lightbox', !$('.lightbox'))

  // back to All for a stable state
  const allChip = $$('.gallery__chip').find((chip) => chip.textContent === 'All')!
  click(allChip)
  await sleep(30)

  /* 4 — testimonial carousel */
  const nextArrow = $$('.testimonials__arrow')[1]!
  click(nextArrow)
  await sleep(30)
  const track = $('.testimonials__track') as HTMLElement
  check('carousel advances', (track.getAttribute('style') ?? '').includes('-100%'), track.getAttribute('style') ?? '')

  /* 5 — booking form */
  const form = $('form.form')!
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
  await sleep(60)
  check('invalid submit shows field errors', $$('[role="alert"]').length >= 4, `found ${$$('[role="alert"]').length}`)

  setInputValue($('#field-name') as HTMLInputElement, 'Test Visitor')
  setInputValue($('#field-phone') as HTMLInputElement, '+91 90000 00000')
  setInputValue($('#field-email') as HTMLInputElement, 'visitor@example.com')
  setSelectValue($('#field-service') as HTMLSelectElement, 'yoga-therapy')
  setInputValue($('#field-date') as HTMLInputElement, '2026-09-10')
  setSelectValue($('#field-time') as HTMLSelectElement, 'Morning (8:00 – 11:00 AM)')
  await sleep(30)

  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
  await sleep(1200)
  const success = $('.booking__success')
  check(
    'valid submit shows confirmation',
    Boolean(success) && (success?.textContent ?? '').includes("Thank you for reaching out"),
  )

  /* ------------------------------------------------------------- result --- */
  console.log(failures === 0 ? 'DOM_SMOKE_OK' : `DOM_SMOKE_FAILED (${failures})`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((error) => {
  console.error('DOM_SMOKE_ERROR', error)
  process.exit(1)
})
