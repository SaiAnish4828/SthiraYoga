import { Icon } from '@/components/ui/Icons'
import { siteImages } from '@/data/gallery'
import { BOOKING_ANCHOR, cta } from '@/data/navigation'
import pub from '@/utils/asset'
import './Hero.css'

const HERO_POINTS = ['Yoga therapy', 'Pranayama & meditation', 'Gentle, mindful movement']

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <img className="hero__img" src={pub(siteImages.hero.src)} alt="" fetchPriority="high" decoding="async" />
        <div className="hero__scrim" />
        <div className="hero__grain" />
      </div>

      {/* Floating decorative elements */}
      <span className="hero__orb hero__orb--a" aria-hidden="true" />
      <span className="hero__orb hero__orb--b" aria-hidden="true" />
      <svg className="hero__mandala" viewBox="0 0 200 200" aria-hidden="true">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.55"
        >
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="74" />
          <circle cx="100" cy="100" r="52" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="4"
              x2="100"
              y2="196"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}
        </g>
      </svg>

      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero-anim hero__line" style={{ ['--d' as string]: '220ms' }}>
              Find Stillness.
            </span>
            <span className="hero-anim hero__line" style={{ ['--d' as string]: '360ms' }}>
              Build <em className="hero__em">Strength.</em>
            </span>
            <span className="hero-anim hero__line" style={{ ['--d' as string]: '500ms' }}>
              Live Better.
            </span>
          </h1>

          <p className="hero__lede hero-anim" style={{ ['--d' as string]: '660ms' }}>
            Yoga, therapy and mindful wellness practices designed to bring balance to your body,
            breath and mind.
          </p>

          <div className="hero__actions hero-anim" style={{ ['--d' as string]: '800ms' }}>
            <a href={`#${BOOKING_ANCHOR}`} className="btn btn--primary btn--lg">
              {cta.primary}
              <Icon name="arrow-right" size={18} strokeWidth={1.8} />
            </a>
            <a href="#services" className="btn btn--on-dark btn--lg">
              {cta.secondary}
            </a>
          </div>

          <ul className="hero__points hero-anim" style={{ ['--d' as string]: '940ms' }}>
            {HERO_POINTS.map((point) => (
              <li key={point}>
                <Icon name="check" size={15} strokeWidth={2.1} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a className="hero__scroll hero-anim" style={{ ['--d' as string]: '1150ms' }} href="#intro">
        
      </a>
    </section>
  )
}

export default Hero
