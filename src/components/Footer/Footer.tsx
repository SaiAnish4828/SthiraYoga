import { Icon, type IconName } from '@/components/ui/Icons'
import Logo from '@/components/ui/Logo'
import { contactLinks, studioInfo } from '@/data/site'
import './Footer.css'

const FOOTER_NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const PRACTICE_LINKS = [
  { label: 'Yoga Therapy', href: '#services' },
  { label: 'Pranayama & Meditation', href: '#services' },
  { label: "Children's Yoga", href: '#services' },
  { label: 'Prenatal & Postnatal', href: '#services' },
  { label: 'Senior Citizen Yoga', href: '#services' },
  { label: 'Online Classes', href: '#services' },
]

const SOCIALS: { key: keyof typeof studioInfo.social; icon: IconName; label: string }[] = [
  { key: 'instagram', icon: 'instagram', label: 'Instagram' },
  { key: 'facebook', icon: 'facebook', label: 'Facebook' },
]

export function Footer() {
  const year = studioInfo.copyrightYear

  return (
    <footer className="footer">
      <span className="footer__glow" aria-hidden="true" />

      <div className="container footer__inner">
        {/* ---- Brand ---- */}
        <div className="footer__brand">
          <Logo variant="footer" />
          <p className="footer__desc">{studioInfo.longDescription}</p>

          <ul className="footer__social" aria-label="Social media">
            {SOCIALS.map((social) => {
              const href: string = studioInfo.social[social.key]
              const disabled = !href || href === '#'
              return (
                <li key={social.key}>
                  <a
                    className={`footer__social-link ${disabled ? 'is-disabled' : ''}`.trim()}
                    href={disabled ? undefined : href}
                    aria-label={
                      disabled ? `${social.label} — coming soon` : `${studioInfo.name} on ${social.label}`
                    }
                    aria-disabled={disabled || undefined}
                    {...(!disabled ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <Icon name={social.icon} size={19} strokeWidth={1.6} />
                  </a>
                </li>
              )
            })}

            <li>
              <a
                className="footer__social-link"
                href={contactLinks.whatsapp()}
                target="_blank"
                rel="noreferrer"
                aria-label={`${studioInfo.name} on WhatsApp`}
              >
                <Icon name="whatsapp" size={19} strokeWidth={1.6} />
              </a>
            </li>
            <li>
              <a
                className="footer__social-link"
                href={contactLinks.mail()}
                aria-label={`Email ${studioInfo.name}`}
              >
                <Icon name="mail" size={19} strokeWidth={1.6} />
              </a>
            </li>
          </ul>
        </div>

        {/* ---- Navigate ---- */}
        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__heading">Navigate</h2>
          <ul className="footer__links">
            {FOOTER_NAV.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- Practices ---- */}
        <nav className="footer__col" aria-label="Practices">
          <h2 className="footer__heading">Practices</h2>
          <ul className="footer__links">
            {PRACTICE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- Contact ---- */}
        <div className="footer__col">
          <h2 className="footer__heading">Get in touch</h2>
          <ul className="footer__contact">
            <li>
              <Icon name="map-pin" size={17} strokeWidth={1.6} />
              <span>{studioInfo.address.full}</span>
            </li>
            <li>
              <Icon name="phone" size={17} strokeWidth={1.6} />
              <a href={contactLinks.tel()}>{studioInfo.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={17} strokeWidth={1.6} />
              <a href={contactLinks.mail()}>{studioInfo.email}</a>
            </li>
            <li>
              <Icon name="whatsapp" size={17} strokeWidth={1.6} />
              <a href={contactLinks.whatsapp()} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
            </li>
          </ul>

          <a href="#book" className="btn btn--primary btn--sm footer__cta">
            Book a Class
            <Icon name="arrow-right" size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copy">
          © {year} {studioInfo.name}. All rights reserved.
        </p>

        <p className="footer__note">
          Yoga and traditional wellness practices offered for general wellbeing, not as medical
          treatment.
        </p>

        <a className="footer__top" href="#home">
          Back to top
          <Icon name="chevron-down" size={15} strokeWidth={2} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
