import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

export interface RevealProps {
  children: ReactNode
  /** Stagger delay in ms — used for grids and lists. */
  delay?: number
  /** Rendered element. Defaults to `div`. */
  as?: ElementType
  className?: string
  /** Extra inline styles. */
  style?: React.CSSProperties
  id?: string
}

/**
 * Fades + lifts its children into view the first time they enter the viewport.
 * Falls back to instantly visible when IntersectionObserver is unavailable or
 * the user prefers reduced motion (handled by the global stylesheet).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      id={id}
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ ['--reveal-delay' as string]: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
