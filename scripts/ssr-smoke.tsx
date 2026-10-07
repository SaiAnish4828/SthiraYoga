/**
 * Render-time smoke test: renders <App/> to a string with react-dom/server.
 * Effects (and therefore browser-only APIs) are skipped, so this catches
 * crashes that happen during rendering itself.
 *
 * Run with:  npm run smoke
 */
import { renderToString } from 'react-dom/server'
import App from '@/App'

const html = renderToString(<App />)

const expected = [
  'Sthira Yoga &amp; Wellness',
  'Find Stillness.',
  'Welcome to',
  'Meet Our Founder',
  'Explore Our Practices',
  'Meet Our Trainers',
  'Inside the studio',
  'Begin Your Practice',
  'Come and find us',
  'All rights reserved',
]

const missing = expected.filter((snippet) => !html.includes(snippet))

console.log(`RENDER_OK chars=${html.length}`)
if (missing.length > 0) {
  console.error('MISSING:', missing)
  process.exit(1)
}
console.log('ALL_SECTIONS_PRESENT')
