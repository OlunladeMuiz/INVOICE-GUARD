import type { Invoice } from '../types/invoice'
import { formatDate } from '../utils/dates'
import { formatCurrency, roundCurrency } from '../utils/currency'
import { StatusBadge } from '../components/invoice/StatusBadge'

export interface InvoiceDetailPageProps {
  invoice: Invoice
  onBack: () => void
  onEdit: (invoice: Invoice) => void
  onDelete: (invoice: Invoice) => void
  onMarkAsPaid: (invoiceId: string) => void
}

export function InvoiceDetailPage({
  invoice,
  onBack,
  onEdit,
  onDelete,
  onMarkAsPaid,
}: InvoiceDetailPageProps) {
  const showActions = invoice.status !== 'paid'

  return (
    <section className="detail-page">
      <button type="button" className="back-link" onClick={onBack}>
        <ChevronLeftIcon />
        <span>Go back</span>
      </button>

      <article className="detail-card detail-card--status">
        <div className="detail-status">
          <span className="detail-status__label">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="detail-status__actions">
          {showActions ? (
            <>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => onEdit(invoice)}
              >
                Edit
              </button>
              <button
                type="button"
                className="button button--danger-ghost"
                onClick={() => onDelete(invoice)}
              >
                Delete
              </button>
            </>
          ) : null}

          {invoice.status === 'pending' ? (
            <button
              type="button"
              className="button button--primary"
              onClick={() => onMarkAsPaid(invoice.id)}
            >
              Mark as Paid
            </button>
          ) : null}
        </div>
      </article>

      <article className="detail-card detail-card--main">
        <div className="detail-head">
          <div>
            <p className="detail-id">
              <span>#</span>
              {invoice.id}
            </p>
            <p className="detail-description">{invoice.description}</p>
          </div>

          <div className="detail-address detail-address--right">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-block">
            <p className="detail-block__label">Invoice Date</p>
            <p className="detail-block__value">{formatDate(invoice.createdAt)}</p>
          </div>
          <div className="detail-block">
            <p className="detail-block__label">Payment Due</p>
            <p className="detail-block__value">{formatDate(invoice.paymentDue)}</p>
          </div>
          <div className="detail-block">
            <p className="detail-block__label">Bill To</p>
            <p className="detail-block__value">{invoice.clientName}</p>
            <div className="detail-address">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>
          <div className="detail-block">
            <p className="detail-block__label">Sent to</p>
            <p className="detail-block__value">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="detail-items">
          <div className="detail-items__head">
            <span>Item Name</span>
            <span>QTY.</span>
            <span>Price</span>
            <span>Total</span>
          </div>

          <div className="detail-items__body">
            {invoice.items.map((item: Invoice['items'][number]) => (
              <div className="detail-item" key={item.id}>
                <span className="detail-item__name">{item.name}</span>
                <span>{item.quantity}</span>
                <span>{formatCurrency(item.price)}</span>
                <span>{formatCurrency(item.total)}</span>
              </div>
            ))}
          </div>

          <div className="detail-total">
            <span>Amount Due</span>
            <strong>{formatCurrency(roundCurrency(invoice.total))}</strong>
          </div>
        </div>
      </article>

      <div className="detail-mobile-actions">
        {showActions ? (
          <>
            <button type="button" className="button button--ghost" onClick={() => onEdit(invoice)}>
              Edit
            </button>
            <button
              type="button"
              className="button button--danger-ghost"
              onClick={() => onDelete(invoice)}
            >
              Delete
            </button>
          </>
        ) : null}

        {invoice.status === 'pending' ? (
          <button
            type="button"
            className="button button--primary"
            onClick={() => onMarkAsPaid(invoice.id)}
          >
            Mark as Paid
          </button>
        ) : null}
      </div>
    </section>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 7 10" aria-hidden="true">
      <path
        d="M6 1L2 5l4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
