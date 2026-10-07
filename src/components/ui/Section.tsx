import type { ReactNode } from 'react'
import Reveal from './Reveal'

export interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  /** Narrower container for text-led sections. */
  narrow?: boolean
  /** Rendered as a landmark region with an accessible name. */
  labelledBy?: string
  tight?: boolean
}

export function Section({
  id,
  children,
  className = '',
  narrow = false,
  labelledBy,
  tight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section ${tight ? 'section--tight' : ''} ${className}`.trim()}
    >
      <div className={`container ${narrow ? 'container--narrow' : ''}`.trim()}>{children}</div>
    </section>
  )
}

export interface SectionHeadProps {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  /** Heading level — keep the page hierarchy valid. */
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  as: Heading = 'h2',
  id,
  align = 'left',
  className = '',
}: SectionHeadProps) {
  return (
    <Reveal
      className={`section-head ${align === 'center' ? 'section-head--center' : ''} ${className}`.trim()}
    >
      {eyebrow ? (
        <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : ''}`.trim()}>
          {eyebrow}
        </span>
      ) : null}
      <Heading id={id} className="section-title">
        {title}
      </Heading>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </Reveal>
  )
}

export default Section
