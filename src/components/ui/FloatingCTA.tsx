import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import { BOOKING_ANCHOR } from '@/data/navigation'
import './FloatingCTA.css'

/**
 * A discreet persistent "Book a Class" affordance. It appears once the hero is
 * behind you and steps aside entirely while the booking form is on screen, so
 * the CTA is always available without ever getting in the way.
 */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const booking = document.getElementById(BOOKING_ANCHOR)
    const contact = document.getElementById('contact')
    const footer = document.querySelector('footer')

    const onScreen = (el: Element | null) => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    }

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85
      // The pill is a shortcut to booking — hide it while booking, contact
      // or footer actions are already on screen so it never covers them.
      const actionsOnScreen = onScreen(booking) || onScreen(contact) || onScreen(footer)

      setVisible(pastHero && !actionsOnScreen)
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

  // Never hide a focused element from assistive tech: blur first, then inert.
  useEffect(() => {
    if (!visible && linkRef.current?.contains(document.activeElement)) {
      linkRef.current.blur()
    }
  }, [visible])

  return (
    <a
      ref={linkRef}
      href={`#${BOOKING_ANCHOR}`}
      className={`floating-cta ${visible ? 'is-visible' : ''}`.trim()}
      aria-label="Book a Class"
      tabIndex={visible ? 0 : -1}
      inert={!visible}
    >
      <Icon name="lotus" size={19} strokeWidth={1.6} />
      <span>Book a Class</span>
    </a>
  )
}

export default FloatingCTA
