import { Icon } from '@/components/ui/Icons'
import Reveal from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { whySthira } from '@/data/navigation'
import './WhySthira.css'

export function WhySthira() {
  return (
    <Section id="why" labelledBy="why-title" className="why">
      <span className="why__curve why__curve--top" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0 90 C 360 0, 1080 0, 1440 90 L1440 90 L0 90 Z" fill="currentColor" />
        </svg>
      </span>

      <SectionHead
        align="center"
        eyebrow="Why Sthira"
        id="why-title"
        title="A practice that fits your life"
        lede="Not a gym, not a challenge. A steady place to return to — however you arrive on the day."
      />

      <ul className="why__grid">
        {whySthira.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 80} className="why__item">
            <article className="why-card">
              <span className="why-card__icon" aria-hidden="true">
                <Icon name={item.icon} size={24} strokeWidth={1.5} />
              </span>
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__text">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      <span className="why__curve why__curve--bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0 0 C 360 90, 1080 90, 1440 0 L1440 0 L0 0 Z" fill="currentColor" />
        </svg>
      </span>
    </Section>
  )
}

export default WhySthira
