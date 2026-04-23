export interface EmptyStateProps {
  totalInvoices: number
}

export function EmptyState({ totalInvoices }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <div className="empty-state__art" aria-hidden="true">
        <div className="empty-state__orbit empty-state__orbit--one" />
        <div className="empty-state__orbit empty-state__orbit--two" />
        <div className="empty-state__card" />
      </div>
      <h2>{totalInvoices ? 'No invoices match this filter' : 'There is nothing here'}</h2>
      <p>
        {totalInvoices
          ? 'Clear the filter to show every invoice again.'
          : 'Create an invoice by clicking the New Invoice button and get started.'}
      </p>
    </section>
  )
}
