import { useCallback, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Modal from '@/components/ui/Modal'
import Reveal from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { services, servicesDisclaimer, type Service } from '@/data/services'
import { BOOKING_ANCHOR } from '@/data/navigation'
import './Services.css'

export function Services() {
  const [active, setActive] = useState<Service | null>(null)

  const close = useCallback(() => setActive(null), [])

  return (
    <Section id="services" labelledBy="services-title" className="services">
      <span className="decor decor--blob services__blob" aria-hidden="true" />

      <SectionHead
        align="center"
        eyebrow="Therapies & Classes"
        id="services-title"
        title="Explore Our Practices"
        lede="Thirteen ways to practise with us — in the studio, at home, one-to-one or online. Every session is adapted to the person in front of us."
      />

      <ul className="services__grid">
        {services.map((service, index) => (
          <Reveal as="li" key={service.id} delay={Math.min(index, 8) * 60} className="services__item">
            <article className="service-card card">
              <span className="service-card__icon" aria-hidden="true">
                <Icon name={service.icon} size={26} strokeWidth={1.4} />
              </span>

              {service.tag ? <span className="service-card__tag">{service.tag}</span> : null}

              <h3 className="service-card__name">{service.name}</h3>
              <p className="service-card__summary">{service.summary}</p>

              <button
                type="button"
                className="link-arrow service-card__more"
                onClick={() => setActive(service)}
                aria-haspopup="dialog"
              >
                Learn more
                <Icon name="arrow-right" size={16} strokeWidth={1.9} />
              </button>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="services__note">
        <Icon name="info" size={20} strokeWidth={1.6} />
        <p>{servicesDisclaimer}</p>
      </Reveal>

      <Reveal delay={160} className="services__cta">
        <p>Not sure where to begin?</p>
        <a href={`#${BOOKING_ANCHOR}`} className="btn btn--primary">
          Book a Class
          <Icon name="arrow-right" size={17} strokeWidth={1.8} />
        </a>
      </Reveal>

      {/* -------- Detail dialog -------- */}
      <Modal
        open={active !== null}
        onClose={close}
        label={active ? `${active.name} — details` : 'Practice details'}
        panelClassName="service-dialog"
      >
        {active ? (
          <div className="service-dialog__inner">
            <span className="service-dialog__icon" aria-hidden="true">
              <Icon name={active.icon} size={30} strokeWidth={1.4} />
            </span>

            {active.tag ? <span className="service-dialog__tag">{active.tag}</span> : null}

            <h2 className="service-dialog__title">{active.name}</h2>
            <p className="service-dialog__summary">{active.summary}</p>
            <p className="service-dialog__detail">{active.detail}</p>

            {active.note ? (
              <div className="service-dialog__note">
                <Icon name="info" size={19} strokeWidth={1.6} />
                <p>{active.note}</p>
              </div>
            ) : null}

            <div className="service-dialog__actions">
              <a href={`#${BOOKING_ANCHOR}`} className="btn btn--primary" onClick={close}>
                Book this session
                <Icon name="arrow-right" size={17} strokeWidth={1.8} />
              </a>
              <button type="button" className="btn btn--ghost" onClick={close}>
                Back to all practices
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}

export default Services
