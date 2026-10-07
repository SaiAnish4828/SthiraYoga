import { Icon } from '@/components/ui/Icons'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { siteImages } from '@/data/gallery'
import { cta } from '@/data/navigation'
import pub from '@/utils/asset'
import './Intro.css'

const INTRO_HIGHLIGHTS = [
  { icon: 'lotus' as const, label: 'Yoga & therapy' },
  { icon: 'breath' as const, label: 'Breathwork' },
  { icon: 'moon' as const, label: 'Meditation' },
  { icon: 'leaf' as const, label: 'Mindful movement' },
]

export function Intro() {
  return (
    <section id="intro" className="section intro" aria-labelledby="intro-title">
      <span className="decor decor--blob intro__blob" aria-hidden="true" />

      <div className="container intro__grid">
        <Reveal className="intro__media">
          <div className="intro__frame">
            <Img
              className="intro__img"
              src={pub(siteImages.intro.src)}
              alt={siteImages.intro.alt}
              width={720}
              height={900}
            />
            <div className="intro__badge" aria-hidden="true">
              <Icon name="om" size={26} strokeWidth={1.3} />
              <span>
                Sthira
                <small>steadiness</small>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="intro__body">
          <Reveal>
            <span className="eyebrow">A quiet welcome</span>
            <h2 id="intro-title" className="section-title">
              Welcome to <span className="accent">Sthira</span> Yoga &amp; Wellness
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="intro__lead">
              Sthira is a space dedicated to holistic wellbeing — to yoga and therapeutic practice,
              breathwork, meditation and mindful movement, practised gently and without hurry.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="intro__text">
              The word <em>sthira</em> carries a simple meaning: steadiness. It is the quality that
              lets a posture hold, a breath settle, and a busy mind come to rest. That is what we
              hope you take with you from a session here — not a performance, but a little more
              steadiness than you arrived with.
            </p>
            <p className="intro__text">
              Whether you are recovering, expecting, caring for someone, simply getting older, or
              entirely new to yoga, there is a way to practise that fits you. Come as you are.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <ul className="intro__highlights">
              {INTRO_HIGHLIGHTS.map((item) => (
                <li key={item.label}>
                  <span className="intro__icon" aria-hidden="true">
                    <Icon name={item.icon} size={20} strokeWidth={1.5} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340}>
            <div className="btn-group intro__actions">
              <a href="#about" className="btn btn--primary">
                {cta.discover}
                <Icon name="arrow-right" size={17} strokeWidth={1.8} />
              </a>
              <a href="#services" className="btn btn--ghost">
                See our practices
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Intro
