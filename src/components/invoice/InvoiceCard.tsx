import { type MouseEvent } from 'react'
import type { Invoice } from '../../types/invoice'
import { formatDate } from '../../utils/dates'
import { formatCurrency } from '../../utils/currency'
import { StatusBadge } from './StatusBadge'

export interface InvoiceCardProps {
  invoice: Invoice
  onOpen: () => void
}

export function InvoiceCard({ invoice, onOpen }: InvoiceCardProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    onOpen()
  }

  return (
    <a href={`/invoice/${invoice.id}`} className="invoice-card" onClick={handleClick}>
      <div className="invoice-card__top">
        <p className="invoice-card__id">
          <span>#</span>
          {invoice.id}
        </p>
        <p className="invoice-card__due">Due {formatDate(invoice.paymentDue)}</p>
        <p className="invoice-card__client">{invoice.clientName}</p>
        <p className="invoice-card__total">{formatCurrency(invoice.total)}</p>
      </div>

      <div className="invoice-card__bottom">
        <StatusBadge status={invoice.status} />
        <ChevronRightIcon />
      </div>
    </a>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 7 10" aria-hidden="true">
      <path
        d="M1 1l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
