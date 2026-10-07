import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './BackToTop.css'

/**
 * Floating "Back to top" button pinned to the bottom-right corner.
 * Appears after scrolling past the hero and sits above the Book-a-Class
 * pill so the two never overlap.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85)
    }

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // If the button hides while it still has focus (e.g. click → scroll to top),
  // drop focus first so we never hide a focused element from assistive tech.
  // `inert` below keeps it unfocusable while hidden.
  useEffect(() => {
    if (!visible && btnRef.current && btnRef.current.contains(document.activeElement)) {
      btnRef.current.blur()
    }
  }, [visible])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={scrollToTop}
      className={`back-to-top ${visible ? 'is-visible' : ''}`.trim()}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      inert={!visible}
    >
      <Icon name="arrow-up" size={20} strokeWidth={1.8} />
    </button>
  )
}

export default BackToTop
