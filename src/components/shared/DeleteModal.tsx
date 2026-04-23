import { useRef } from 'react'
import type { Invoice } from '../../types/invoice'
import { useFocusTrap } from '../../utils/hooks'

export interface DeleteModalProps {
  invoice: Invoice
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteModal({ invoice, onCancel, onConfirm }: DeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useFocusTrap(true, modalRef, onCancel)

  return (
    <div
      className="modal"
      role="presentation"
      onMouseDown={(event) => event.currentTarget === event.target && onCancel()}
    >
      <div
        ref={modalRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <h2 id="delete-title">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice <strong>#{invoice.id}</strong>? This action cannot
          be undone.
        </p>
        <div className="modal__actions">
          <button type="button" className="button button--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="button button--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
