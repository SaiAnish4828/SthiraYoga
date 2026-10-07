import type { ReactNode, SVGProps } from 'react'

/**
 * Minimal single-weight line icons, hand-drawn for Sthira.
 * 24 × 24 viewBox, `currentColor` stroke — they inherit text colour and size.
 */

export type IconName =
  | 'lotus'
  | 'mudra'
  | 'home'
  | 'child'
  | 'mother'
  | 'breath'
  | 'elder'
  | 'varma'
  | 'chair'
  | 'sound'
  | 'user'
  | 'workshop'
  | 'online'
  | 'heart-hand'
  | 'people'
  | 'sun'
  | 'moon'
  | 'leaf'
  | 'mountain'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'close'
  | 'menu'
  | 'phone'
  | 'mail'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'map-pin'
  | 'clock'
  | 'check'
  | 'info'
  | 'quote'
  | 'sparkle'
  | 'om'

const PATHS: Record<IconName, ReactNode> = {
  lotus: (
    <>
      <path d="M12 20c4.4 0 8-2.6 8-5.8 0-1-.3-1.9-.9-2.7-1.4 1-3.3 1.5-5.4 1.7C13 15.7 12.6 18 12 20Z" />
      <path d="M12 20c-4.4 0-8-2.6-8-5.8 0-1 .3-1.9.9-2.7 1.4 1 3.3 1.5 5.4 1.7C11 15.7 11.4 18 12 20Z" />
      <path d="M12 20c-1.6-1.5-2.8-3.6-3.3-6M12 20c1.6-1.5 2.8-3.6 3.3-6" />
      <path d="M12 4.5c1.6 1.4 2.6 3.6 2.6 6.1S13.6 15 12 16.4C10.4 15 9.4 12.9 9.4 10.6S10.4 5.9 12 4.5Z" />
    </>
  ),
  mudra: (
    <>
      <path d="M8.5 12.5V6.8a1.4 1.4 0 0 1 2.8 0v4.4" />
      <path d="M11.3 11.2V5.4a1.4 1.4 0 0 1 2.8 0v5.8" />
      <path d="M14.1 11.4V7.6a1.4 1.4 0 0 1 2.8 0v6.6c0 3.4-2.2 6-5.4 6-2.9 0-4.9-1.6-5.8-4.3l-1-3.1a1.3 1.3 0 0 1 2.2-1.3l1.4 2.1" />
      <path d="M8.5 12.5v-.2" />
    </>
  ),
  home: (
    <>
      <path d="M3.6 10.4 12 3.6l8.4 6.8" />
      <path d="M5.6 9.9v8.6a1.9 1.9 0 0 0 1.9 1.9h9a1.9 1.9 0 0 0 1.9-1.9V9.9" />
      <path d="M9.8 20.4v-5.2h4.4v5.2" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="5.2" r="2.4" />
      <path d="M12 8.2v6" />
      <path d="M12 9.6 8.6 12M12 9.6l3.4 2.4" />
      <path d="M12 14.2 9.6 20.4M12 14.2l2.4 6.2" />
    </>
  ),
  mother: (
    <>
      <circle cx="13.4" cy="4.8" r="2.1" />
      <path d="M12.2 7.6c-1.9.5-3 2-3 4.1 0 1.9.7 3.3 1.5 4.6.6 1 .9 1.9.9 3v.9" />
      <path d="M13.4 7.6c2.2.8 3.6 2.9 3.6 5.4 0 2.5-.9 4-1.4 5.6" />
      <path d="M9.2 11.7c-1.2.6-1.8 1.7-1.8 3 0 1.5.6 2.6 1.4 3.5" />
    </>
  ),
  breath: (
    <>
      <path d="M3.5 8.4h10.2a2.6 2.6 0 1 0-2.6-2.6" />
      <path d="M3.5 12h13.2a2.6 2.6 0 1 1-2.6 2.6" />
      <path d="M3.5 15.6h7.1a2.2 2.2 0 1 1-2.2 2.2" />
    </>
  ),
  elder: (
    <>
      <circle cx="11.2" cy="4.9" r="2.2" />
      <path d="M11.2 7.1c1.9.4 2.9 1.8 2.9 3.8v3.4l1.6 5.8" />
      <path d="M11.2 7.1c-1.7.5-2.5 1.9-2.5 3.9v3.1l-1.4 6" />
      <path d="M16.6 9.6c1.2.7 2.4.7 3.4.2" />
      <path d="M18.9 9.4v10.7" />
    </>
  ),
  varma: (
    <>
      <path d="M12 3.4c3.4 0 6 2.3 6 5.4 0 1.4-.5 2.6-1.4 3.6-1.6 1.9-2.7 3.6-3 5.7H10.4c-.3-2.1-1.4-3.8-3-5.7-.9-1-1.4-2.2-1.4-3.6 0-3.1 2.6-5.4 6-5.4Z" />
      <circle cx="12" cy="8.8" r="1.5" />
      <path d="M10.4 18.1h3.2v2.5h-3.2z" />
    </>
  ),
  chair: (
    <>
      <path d="M6.6 4.2h10.8v6.6H6.6z" />
      <path d="M4.8 10.8h14.4" />
      <path d="M6.4 10.8v9.4M17.6 10.8v9.4" />
      <path d="M6.4 15.6h11.2" />
    </>
  ),
  sound: (
    <>
      <path d="M12 8.6v6.8" />
      <path d="M8.6 5.8v12.4M15.4 5.8v12.4" />
      <path d="M5.2 9.2v5.6M18.8 9.2v5.6" />
      <path d="M2.2 11v2M21.8 11v2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7.6" r="3.4" />
      <path d="M4.8 20.2c.7-3.6 3.6-5.8 7.2-5.8s6.5 2.2 7.2 5.8" />
    </>
  ),
  workshop: (
    <>
      <circle cx="8" cy="7.4" r="2.6" />
      <circle cx="16.4" cy="8.4" r="2.2" />
      <path d="M3.2 19.4c.5-3 2.5-4.8 4.8-4.8s4.3 1.8 4.8 4.8" />
      <path d="M14.6 14.9c2.1.2 3.7 1.8 4.2 4.5" />
    </>
  ),
  online: (
    <>
      <rect x="2.8" y="4.6" width="18.4" height="12" rx="1.8" />
      <path d="M8.4 20.2h7.2M12 16.6v3.6" />
      <circle cx="12" cy="10.6" r="2" />
    </>
  ),
  'heart-hand': (
    <>
      <path d="M12 9.6 10.6 8.2a2 2 0 0 0-2.9 2.8l4.3 4.4 4.3-4.4a2 2 0 0 0-2.9-2.8L12 9.6Z" />
      <path d="M4.6 13.2 3 15.9a1.6 1.6 0 0 0 .3 2.1l3.5 3a1.6 1.6 0 0 0 2.1-.1" />
      <path d="M19.4 13.2l1.6 2.7a1.6 1.6 0 0 1-.3 2.1l-3.5 3a1.6 1.6 0 0 1-2.1-.1" />
      <path d="M8.9 20.9h6.2" />
    </>
  ),
  people: (
    <>
      <circle cx="6.6" cy="8" r="2.4" />
      <circle cx="17.4" cy="8" r="2.4" />
      <path d="M2.4 19.4c.4-2.8 2.1-4.6 4.2-4.6s3.8 1.8 4.2 4.6" />
      <path d="M13.2 19.4c.4-2.8 2.1-4.6 4.2-4.6s3.8 1.8 4.2 4.6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </>
  ),
  moon: <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />,
  leaf: (
    <>
      <path d="M20 4.2c0 8.4-4.2 13-10.2 13a5.6 5.6 0 0 1-5.6-5.6C4.2 6.6 10.4 4.2 20 4.2Z" />
      <path d="M4.2 20.2C6.6 14.6 10.6 10.4 16 7.8" />
    </>
  ),
  mountain: (
    <>
      <path d="M2.8 19.4 9 7.6l4 7.4 2.2-3.8 6 8.2Z" />
      <path d="M6.6 12.4h4.8" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M4 12h15.2" />
      <path d="m13.4 6.2 5.8 5.8-5.8 5.8" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 20V4" />
      <path d="m6.2 10.6 5.8-5.8 5.8 5.8" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.6 7H17v8.4" />
    </>
  ),
  'chevron-left': <path d="m14.6 5.4-6.4 6.6 6.4 6.6" />,
  'chevron-right': <path d="m9.4 5.4 6.4 6.6-6.4 6.6" />,
  'chevron-down': <path d="m5.4 9.4 6.6 6.4 6.6-6.4" />,
  close: <path d="M5.6 5.6 18.4 18.4M18.4 5.6 5.6 18.4" />,
  menu: <path d="M3.6 7.2h16.8M3.6 12h16.8M3.6 16.8h16.8" />,
  phone: (
    <path d="M6.4 3.8h3l1.4 3.6-2 1.4a11.4 11.4 0 0 0 6.4 6.4l1.4-2 3.6 1.4v3a1.8 1.8 0 0 1-2 1.8C10.6 19 5 13.4 4.6 5.8a1.8 1.8 0 0 1 1.8-2Z" />
  ),
  mail: (
    <>
      <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2" />
      <path d="m3.4 6.6 8.6 6 8.6-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.4 20.6 4.7 16A8.1 8.1 0 1 1 8 19.3l-4.6 1.3Z" />
      <path d="M9 9.2c0 3 2.3 5.2 5.2 5.2.5 0 .9-.4.9-.9v-.8l-1.9-.7-.8 1a4.6 4.6 0 0 1-1.7-1.7l1-.8-.7-1.9h-.9c-.6 0-1.1.5-1.1 1Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.8 21v-8h2.7l.5-3.1h-3.2V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8.6V13h2.8v8Z" />
  ),
  youtube: (
    <>
      <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="4" />
      <path d="m10.4 9.4 4.6 2.6-4.6 2.6Z" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s6.6-5.5 6.6-10.4A6.6 6.6 0 0 0 5.4 10.6C5.4 15.5 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  check: <path d="m4.8 12.6 4.6 4.6 9.8-10.4" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11v5.4" />
      <circle cx="12" cy="7.8" r="0.95" fill="currentColor" stroke="none" />
    </>
  ),
  quote: (
    <path d="M9.4 6.2c-3 1.4-4.6 3.7-4.6 6.9 0 2.7 1.4 4.3 3.4 4.3 1.7 0 3-1.2 3-2.9 0-1.6-1.1-2.7-2.6-2.7-.3 0-.6 0-.8.1.3-1.6 1.3-2.9 2.9-3.8l-1.3-1.9Zm8.2 0c-3 1.4-4.6 3.7-4.6 6.9 0 2.7 1.4 4.3 3.4 4.3 1.7 0 3-1.2 3-2.9 0-1.6-1.1-2.7-2.6-2.7-.3 0-.6 0-.8.1.3-1.6 1.3-2.9 2.9-3.8l-1.3-1.9Z" />
  ),
  sparkle: (
    <path d="M12 3.4c.9 4.4 2.2 5.7 6.6 6.6-4.4.9-5.7 2.2-6.6 6.6-.9-4.4-2.2-5.7-6.6-6.6 4.4-.9 5.7-2.2 6.6-6.6Z" />
  ),
  om: (
    <>
      <path d="M7.4 15.4c0 1.8 1.3 3 3 3s2.9-1.1 2.9-2.7c0-2.5-3.1-2.9-3.1-4.9 0-1.1.9-1.9 2-1.9 1.2 0 2 .8 2 1.9" />
      <path d="M14.2 8.9c0-1.2 1-2.1 2.2-2.1 1.4 0 2.4 1.1 2.4 2.6 0 2.6-2.4 4.2-2.4 6.3 0 1.3.9 2.2 2.1 2.2" />
      <path d="M4.2 13.6c-.9-1.4-1-3.2-.1-4.6" />
      <path d="M9.6 5.2c.6-1.1 1.9-1.6 3-1.2" />
      <circle cx="16.6" cy="4.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** Pixel size — width and height. Defaults to 24. */
  size?: number
  strokeWidth?: number
  title?: string
}

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  const labelled = Boolean(title)
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? 'img' : 'presentation'}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...rest}
    >
      {labelled ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  )
}

export default Icon
