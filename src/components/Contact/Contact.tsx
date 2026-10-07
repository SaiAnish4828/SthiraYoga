import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Reveal from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { contactLinks, hasRealAddress, studioInfo } from '@/data/site'
import './Contact.css'

/** Copies the studio email address, with a fallback for non-secure contexts. */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )

  const copy = async () => {
    const text = studioInfo.email
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        throw new Error('clipboard unavailable')
      }
    } catch {
      const area = document.createElement('textarea')
      area.value = text
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      className={`contact-card__copy ${copied ? 'is-copied' : ''}`.trim()}
      onClick={copy}
      aria-live="polite"
    >
      <Icon name={copied ? 'check' : 'mail'} size={15} strokeWidth={1.8} />
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}

export function Contact() {
  const cards = [
    {
      icon: 'map-pin' as const,
      label: 'Visit Us',
      lines: [
        studioInfo.address.line1,
        studioInfo.address.line2,
        `${studioInfo.address.city}, ${studioInfo.address.region}`,
        studioInfo.address.country,
      ].filter(Boolean),
      href: hasRealAddress() ? contactLinks.maps() : undefined,
      action: hasRealAddress() ? 'Open in Google Maps' : undefined,
      external: true,
    },
    {
      icon: 'phone' as const,
      label: 'Call Us',
      lines: [studioInfo.phone, 'We answer during working hours.'],
      href: contactLinks.tel(),
      action: 'Call now',
      external: false,
    },
    {
      icon: 'mail' as const,
      label: 'Email',
      lines: [studioInfo.email, 'Usually answered within one working day.'],
      href: contactLinks.mail(),
      action: 'Write to us',
      external: false,
    },
    {
      icon: 'whatsapp' as const,
      label: 'WhatsApp',
      lines: [studioInfo.whatsapp, 'The quickest way to reach us.'],
      href: contactLinks.whatsapp(),
      action: 'Start a chat',
      external: true,
    },
  ]

  return (
    <Section id="contact" labelledBy="contact-title" className="contact">
      <SectionHead
        align="center"
        eyebrow="Contact"
        id="contact-title"
        title="Come and find us"
        lede="Questions about a class, a house visit, or where to begin? Any of these will reach a person."
      />

      <ul className="contact__grid">
        {cards.map((card, index) => (
          <Reveal as="li" key={card.label} delay={index * 80} className="contact__item">
            <article className="contact-card card">
              <span className="contact-card__icon" aria-hidden="true">
                <Icon name={card.icon} size={22} strokeWidth={1.5} />
              </span>
              <h3 className="contact-card__label">{card.label}</h3>

              <div className="contact-card__lines">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {card.href ? (
                <div className="contact-card__actions">
                  <a
                    className="link-arrow contact-card__link"
                    href={card.href}
                    {...(card.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {card.action}
                    <Icon name="arrow-right" size={16} strokeWidth={1.9} />
                  </a>
                  {card.icon === 'mail' ? <CopyEmailButton /> : null}
                </div>
              ) : (
                <span className="contact-card__pending">Address to be announced</span>
              )}
            </article>
          </Reveal>
        ))}
      </ul>

      {/* ---- Working hours ---- */}
      <Reveal delay={120} className="contact__hours">
        <div className="contact__hours-head">
          <span className="contact__hours-icon" aria-hidden="true">
            <Icon name="clock" size={20} strokeWidth={1.6} />
          </span>
          <h3>Working Hours</h3>
        </div>

        <dl className="contact__hours-list">
          {studioInfo.hours.map((entry) => (
            <div key={entry.days}>
              <dt>{entry.days}</dt>
              <dd>{entry.time}</dd>
            </div>
          ))}
        </dl>

        <p className="contact__hours-note">
          Timings are provisional and may be adjusted. Please confirm when you book.
        </p>
      </Reveal>

      {/* ---- Map ---- */}
      <Reveal delay={160} className="contact__map">
        {studioInfo.address.mapsEmbedUrl ? (
          <iframe
            className="contact__frame"
            title={`Map showing ${studioInfo.name}`}
            src={studioInfo.address.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="contact__map-placeholder" role="img" aria-label="Map placeholder — studio location coming soon">
            <span className="contact__map-grid" aria-hidden="true" />
            <span className="contact__map-pin" aria-hidden="true">
              <Icon name="map-pin" size={30} strokeWidth={1.5} />
            </span>
            <div className="contact__map-copy">
              <h3>Our Location — Coming Soon</h3>
              <p>
                {hasRealAddress()
                  ? studioInfo.address.full
                  : 'The studio address is being finalised. A map will appear here as soon as it is confirmed.'}
              </p>
              {hasRealAddress() ? (
                <a
                  className="btn btn--ghost btn--sm"
                  href={contactLinks.maps()}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps
                  <Icon name="arrow-up-right" size={16} strokeWidth={1.8} />
                </a>
              ) : null}
            </div>
          </div>
        )}
      </Reveal>
    </Section>
  )
}

export default Contact
