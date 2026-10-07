/**
 * Resolve a file that lives in `public/` against the configured base URL.
 *
 * Data files keep simple root-style paths like `/assets/hero/hero-main.jpg`;
 * `pub()` rebases them so the exact same build works both at a domain root
 * (dev server / preview) and under the GitHub Pages project path
 * (`/Sthira_Yoga_Wellness/…`).
 */
export function pub(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\/+/, '')}`
}

export default pub
