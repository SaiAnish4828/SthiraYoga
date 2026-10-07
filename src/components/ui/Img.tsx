import { useState, type ImgHTMLAttributes } from 'react'
import './Img.css'

/**
 * Inline SVG stand-in shown while a photo is still missing or fails to load.
 * Keeps the layout intact and never shows a broken-image icon.
 */
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f4effb"/>
      <g fill="none" stroke="#cbb6e8" stroke-width="2" stroke-linecap="round">
        <path d="M200 210c-46 0-83-27-83-60 0-10 3-20 10-28 15 10 34 16 57 18-5 27-2 52 16 70Z"/>
        <path d="M200 210c46 0 83-27 83-60 0-10-3-20-10-28-15 10-34 16-57 18 5 27 2 52-16 70Z"/>
        <path d="M200 90c20 18 33 46 33 78s-13 60-33 78c-20-18-33-46-33-78s13-60 33-78Z"/>
      </g>
      <text x="200" y="252" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#8662bd">Image coming soon</text>
    </svg>`,
  )

export interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

/**
 * `<img>` with a soft fade-in on load and a branded placeholder on error, so
 * assets can be dropped into `public/assets/` at any time.
 */
export function Img({ src, alt, className = '', ...rest }: ImgProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <img
      {...rest}
      src={failed ? FALLBACK_SVG : src}
      alt={alt}
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      loading={rest.loading ?? 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (!failed) setFailed(true)
        setLoaded(true)
      }}
    />
  )
}

export default Img
