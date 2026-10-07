import { useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Img from '@/components/ui/Img'
import Modal from '@/components/ui/Modal'
import Reveal from '@/components/ui/Reveal'
import { founder } from '@/data/trainers'
import pub from '@/utils/asset'
import './Founder.css'

export function Founder() {
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <section id="founder" className="section founder" aria-labelledby="founder-title">
      <span className="founder__ring founder__ring--a" aria-hidden="true" />
      <span className="founder__ring founder__ring--b" aria-hidden="true" />

      <div className="container founder__grid">
        <Reveal className="founder__media">
          <div className="founder__frame">
            <Img
              className="founder__img"
              src={pub(founder.image)}
              alt={founder.imageAlt}
              width={760}
              height={900}
            />
          </div>
          <span className="founder__badge" aria-hidden="true">
            <Icon name="sparkle" size={16} strokeWidth={1.5} />
            Founder
          </span>
        </Reveal>

        <div className="founder__body">
          <Reveal>
            <span className="eyebrow eyebrow--light">Meet Our Founder</span>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="founder-title" className="founder__name">
              {founder.name}
            </h2>
            <p className="founder__role">{founder.role}</p>
          </Reveal>

          <Reveal delay={160}>
            <p className="founder__intro">{founder.intro}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="founder__paras">
              {founder.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {founder.learnMoreLabel ? (
            <Reveal delay={320}>
              <button
                type="button"
                className="founder__link"
                onClick={() => setDetailsOpen(true)}
              >
                {founder.learnMoreLabel}
                <Icon name="arrow-right" size={17} strokeWidth={1.8} />
              </button>
            </Reveal>
          ) : null}
        </div>
      </div>

      <Modal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        label={`${founder.details.heading} — ${founder.name}`}
        panelClassName="founder-modal"
      >
        <div className="founder-modal__head">
          <span className="eyebrow">Meet Our Founder</span>
          <h3 className="founder-modal__title">{founder.details.heading}</h3>
          <p className="founder-modal__role">
            {founder.name} · {founder.role}
          </p>
        </div>

        <div className="founder-modal__paras">
          {founder.details.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <ul className="founder-modal__highlights">
          {founder.details.highlights.map((item) => (
            <li key={item.label}>
              <h4>{item.label}</h4>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </section>
  )
}

export default Founder
