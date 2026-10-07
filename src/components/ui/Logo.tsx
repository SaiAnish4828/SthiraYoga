import { studioInfo } from '@/data/site'
import pub from '@/utils/asset'
import './Logo.css'

export interface LogoProps {
  /** Render as a link back to the top of the page. */
  asLink?: boolean
  /** Light variant for use on dark backgrounds (hero, footer). */
  variant?: 'default' | 'light' | 'footer'
  className?: string
}

/**
 * Brand lockup: logo image + wordmark.
 * The logo file lives at `public/assets/logo/` and is configured in
 * `src/data/site.ts` → `studioInfo.logo`, so it can be swapped without
 * touching this component.
 */
export function Logo({ asLink = true, variant = 'default', className = '' }: LogoProps) {
  const { logo, name } = studioInfo

  const inner = (
    <>
      <img
        className="logo__mark"
        src={pub(logo.src)}
        alt=""
        aria-hidden="true"
        width={logo.height}
        height={logo.height}
        style={{ height: `${logo.height}px` }}
        loading="eager"
        decoding="async"
      />
      {logo.showWordmark ? (
        <span className="logo__text">
          <span className="logo__name">{name}</span>
          {logo.wordmarkSub ? <span className="logo__sub">{logo.wordmarkSub}</span> : null}
        </span>
      ) : null}
      <span className="visually-hidden">{name}</span>
    </>
  )

  const classes = `logo logo--${variant} ${className}`.trim()

  if (!asLink) {
    return (
      <span className={classes} aria-label={name}>
        {inner}
      </span>
    )
  }

  return (
    <a className={classes} href="#home" aria-label={`${name} — back to top`}>
      {inner}
    </a>
  )
}

export default Logo
