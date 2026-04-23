import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { Invoice, InvoiceStatus } from '../types/invoice'
import { invoiceStatuses, capitalize } from '../utils/invoice'
import { InvoiceCard } from '../components/invoice/InvoiceCard'
import { StatusFilterChip } from '../components/invoice/StatusFilter'
import { EmptyState } from '../components/shared/EmptyState'

export interface InvoiceListPageProps {
  subtitle: string
  invoices: Invoice[]
  totalInvoices: number
  onCreate: () => void
  onOpenInvoice: (invoiceId: string) => void
  filterOpen: boolean
  setFilterOpen: Dispatch<SetStateAction<boolean>>
  filterRef: RefObject<HTMLDivElement | null>
  selectedFilters: InvoiceStatus[]
  onToggleFilter: (status: InvoiceStatus | 'all', checked: boolean) => void
}

export function InvoiceListPage({
  subtitle,
  invoices,
  totalInvoices,
  onCreate,
  onOpenInvoice,
  filterOpen,
  setFilterOpen,
  filterRef,
  selectedFilters,
  onToggleFilter,
}: InvoiceListPageProps) {
  return (
    <section className="page-section">
      <header className="page-hero">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>

        <div className="page-actions">
          <div ref={filterRef} className="filter">
            <button
              type="button"
              className="button button--ghost filter__toggle"
              aria-expanded={filterOpen}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span className="filter__label filter__label--desktop">Filter by status</span>
              <span className="filter__label filter__label--mobile">Filter</span>
              <ChevronDownIcon />
            </button>

            {filterOpen ? (
              <div className="filter__panel" role="menu" aria-label="Invoice status filter">
                <StatusFilterChip
                  label="All"
                  checked={selectedFilters.length === 0}
                  onChange={(checked: boolean) => onToggleFilter('all', checked)}
                />
                {invoiceStatuses.map((status: InvoiceStatus) => (
                  <StatusFilterChip
                    key={status}
                    label={capitalize(status)}
                    checked={selectedFilters.includes(status)}
                    onChange={(checked: boolean) => onToggleFilter(status, checked)}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <button type="button" className="button button--primary button--new" onClick={onCreate}>
            <span className="button__plus">+</span>
            <span className="button__label button__label--desktop">New Invoice</span>
            <span className="button__label button__label--mobile">New</span>
          </button>
        </div>
      </header>

      {invoices.length ? (
        <div className="invoice-list">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onOpen={() => onOpenInvoice(invoice.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState totalInvoices={totalInvoices} />
      )}
    </section>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 11 7" aria-hidden="true">
      <path
        d="M1 1l4.5 4.5L10 1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
