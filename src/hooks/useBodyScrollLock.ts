import { useEffect } from 'react'

let lockCount = 0

/**
 * Prevents background scrolling while a modal or the mobile menu is open.
 * Reference-counted so nested consumers (menu + dialog) behave correctly.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.classList.add('is-locked')
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }
    lockCount += 1

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.classList.remove('is-locked')
        document.body.style.paddingRight = ''
      }
    }
  }, [active])
}
