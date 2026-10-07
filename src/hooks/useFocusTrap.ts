import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps keyboard focus inside `container` while `active`, and restores focus
 * to the previously focused element when it closes.
 */
export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active || !container.current) return

    const root = container.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const focusFirst = () => {
      const nodes = root.querySelectorAll<HTMLElement>(FOCUSABLE)
      const target =
        nodes.length > 0
          ? nodes[0]
          : root.querySelector<HTMLElement>('[tabindex="-1"]') ?? root
      target.focus()
    }

    // Delay one frame so the dialog is painted before we move focus.
    const raf = requestAnimationFrame(focusFirst)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const current = document.activeElement as HTMLElement | null

      if (event.shiftKey && (current === first || !root.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [active, container])
}
