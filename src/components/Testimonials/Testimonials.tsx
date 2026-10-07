import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Reveal from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { testimonials, testimonialsArePlaceholders } from '@/data/testimonials'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Testimonials.css'

const AUTOPLAY_MS = 7000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [metrics, setMetrics] = useState<{ step: number; gutter: number } | null>(null)
  const reducedMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const count = testimonials.length

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  )

  // Gentle auto-advance — disabled for reduced-motion users and while hovered
  // or focused, so nobody loses a quote they are reading.
  useEffect(() => {
    if (reducedMotion || paused || count <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [reducedMotion, paused, count])

  // Center the active card: the step (card + gap) and centering gutter are
  // measured once per layout, then every index change is a single commit
  // from the old transform to the new one — so the glide always plays.
  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!viewport || !track || track.children.length < 2) return
      const first = track.children[0] as HTMLElement
      const second = track.children[1] as HTMLElement
      const slideWidth = first.getBoundingClientRect().width
      if (!slideWidth) return
      setMetrics({
        step: second.offsetLeft - first.offsetLeft,
        gutter: (viewport.clientWidth - slideWidth) / 2,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    if (document.fonts) {
      document.fonts.ready.then(() => measure()).catch(() => {})
    }
    return () => window.removeEventListener('resize', measure)
  }, [count])

  const shift = metrics ? index * metrics.step - metrics.gutter : 0

  if (count === 0) return null

  return (
    <Section id="testimonials" labelledBy="testimonials-title" className="testimonials">
      <span className="decor decor--blob testimonials__blob testimonials__blob--a" aria-hidden="true" />
      <span className="decor decor--blob testimonials__blob testimonials__blob--b" aria-hidden="true" />

      <SectionHead
        align="center"
        eyebrow="Testimonials"
        id="testimonials-title"
        title="In their words"
        lede="A few notes from people who practise with us."
      />

      <div
        className="testimonials__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Reveal>
          <div
            className="testimonials__viewport"
            ref={viewportRef}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current
              const end = event.changedTouches[0]?.clientX ?? null
              touchStartX.current = null
              if (start === null || end === null) return
              const delta = end - start
              if (Math.abs(delta) < 48) return
              goTo(index + (delta < 0 ? 1 : -1))
            }}
          >
            <ul
              ref={trackRef}
              className={`testimonials__track ${metrics ? 'is-live' : ''}`.trim()}
              style={{ transform: `translate3d(${-shift}px, 0, 0)` }}
            >
              {testimonials.map((item, slideIndex) => {
                const offset = slideIndex - index
                const state =
                  offset === 0
                    ? 'is-active'
                    : offset === -1
                      ? 'is-prev'
                      : offset === 1
                        ? 'is-next'
                        : 'is-far'
                return (
                  <li
                    key={item.id}
                    className={`testimonials__slide ${state}`.trim()}
                    aria-hidden={slideIndex !== index}
                  >
                    <figure className="quote-card">
                      <span className="quote-card__mark" aria-hidden="true">
                        <Icon name="quote" size={34} strokeWidth={1.2} />
                      </span>

                      <blockquote className="quote-card__text">{item.quote}</blockquote>

                      <figcaption className="quote-card__author">
                        <span className="quote-card__avatar" aria-hidden="true">
                          {item.name.charAt(0)}
                        </span>
                        <span className="quote-card__meta">
                          <span className="quote-card__name">{item.name}</span>
                          {item.context ? (
                            <span className="quote-card__context">{item.context}</span>
                          ) : null}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  className="testimonials__arrow testimonials__arrow--prev"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous testimonial"
                >
                  <Icon name="chevron-left" size={20} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  className="testimonials__arrow testimonials__arrow--next"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next testimonial"
                >
                  <Icon name="chevron-right" size={20} strokeWidth={1.8} />
                </button>
              </>
            ) : null}
          </div>

          {count > 1 ? (
            <div className="testimonials__controls">
              <div className="testimonials__dots" role="tablist" aria-label="Choose a testimonial">
                {testimonials.map((item, dotIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={dotIndex === index}
                    aria-label={`Testimonial ${dotIndex + 1} of ${count}, from ${item.name}`}
                    className={`testimonials__dot ${dotIndex === index ? 'is-active' : ''}`.trim()}
                    onClick={() => goTo(dotIndex)}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>
      </div>

      {testimonialsArePlaceholders ? (
        <Reveal delay={80} className="testimonials__placeholder">
          <Icon name="info" size={17} strokeWidth={1.6} />
          <p>
            <strong>Placeholder content.</strong> These are sample quotes written for the design and
            must be replaced with real, consented student feedback before the site goes live — see{' '}
            <code>src/data/testimonials.ts</code>.
          </p>
        </Reveal>
      ) : null}
    </Section>
  )
}

export default Testimonials
