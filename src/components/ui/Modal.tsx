import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icons'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import './Modal.css'

export interface ModalProps {
  open: boolean
  onClose: () => void
  /** Accessible name for the dialog. */
  label: string
  children: ReactNode
  /** Extra class on the dialog panel. */
  panelClassName?: string
  /** Hide the default close button (e.g. the lightbox renders its own). */
  hideCloseButton?: boolean
}

/**
 * Accessible modal dialog rendered in a portal: focus trap, Escape to close,
 * background scroll lock and a fade/scale entrance.
 */
export function Modal({
  open,
  onClose,
  label,
  children,
  panelClassName = '',
  hideCloseButton = false,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="modal"
      onMouseDown={(event) => {
        // Close only when the backdrop itself is clicked.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`modal__panel ${panelClassName}`.trim()}
      >
        {hideCloseButton ? null : (
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
