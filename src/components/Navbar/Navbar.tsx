import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Logo from '@/components/ui/Logo'
import { BOOKING_ANCHOR, navLinks } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import './Navbar.css'

const SCROLL_THRESHOLD = 24

/** Smooth-scrolls to a section id, honouring reduced-motion. */
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - 72
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = useMemo(() => navLinks.map((link) => link.id), [])
  const active = useActiveSection(sectionIds)
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useBodyScrollLock(menuOpen)
  useFocusTrap(drawerRef, menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const go = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollToId(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  const navList = (
    <ul className="nav__list">
      {navLinks.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            className={`nav__link ${active === link.id ? 'is-active' : ''}`.trim()}
            aria-current={active === link.id ? 'true' : undefined}
            onClick={go(link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`.trim()}>
        <div className="container nav__inner">
          <Logo />

          <nav className="nav__desktop" aria-label="Primary">
            {navList}
          </nav>

          <div className="nav__actions">
            <a
              href={`#${BOOKING_ANCHOR}`}
              className="btn btn--primary btn--sm nav__cta"
              onClick={go(BOOKING_ANCHOR)}
            >
              Book a Class
              <Icon name="arrow-right" size={16} strokeWidth={1.8} />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav__toggle-box">
                <span className={`nav__bar ${menuOpen ? 'is-open' : ''}`.trim()} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className={`drawer ${menuOpen ? 'is-open' : ''}`.trim()}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="drawer__glow" aria-hidden="true" />
        <nav className="drawer__nav" aria-label="Mobile">
          <ul className="drawer__list">
            {navLinks.map((link, index) => (
              <li key={link.id} style={{ ['--i' as string]: index }}>
                <a
                  href={`#${link.id}`}
                  className={`drawer__link ${active === link.id ? 'is-active' : ''}`.trim()}
                  onClick={go(link.id)}
                >
                  <span>{link.label}</span>
                  <Icon name="arrow-right" size={18} strokeWidth={1.6} />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`#${BOOKING_ANCHOR}`}
            className="btn btn--primary btn--lg btn--block drawer__cta"
            onClick={go(BOOKING_ANCHOR)}
          >
            Book a Class
            <Icon name="arrow-right" size={18} strokeWidth={1.8} />
          </a>

          <p className="drawer__note">
            Quiet studio. Gentle pace. Practices for every age and stage of life.
          </p>
        </nav>
      </div>
    </>
  )
}

export default Navbar
