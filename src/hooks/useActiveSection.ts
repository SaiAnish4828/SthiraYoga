import { useEffect, useState } from 'react'

/**
 * Reports which section id is currently in view so the navbar can highlight
 * the matching link. Falls back to the first section when at the very top.
 *
 * Uses last-crossed-line tracking: the active section is the last one (in
 * DOM order) whose top has scrolled past a band under the header. Untacked
 * sections in between (intro, founder, booking…) therefore keep the previous
 * link highlighted instead of resetting to the first one.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const bandTop = window.innerHeight * 0.28

    const measure = () => {
      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= bandTop) {
          current = section.id
        }
      }
      setActive(current)
    }

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
