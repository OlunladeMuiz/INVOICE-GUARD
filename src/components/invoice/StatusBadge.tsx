import type { InvoiceStatus } from '../../types/invoice'
import { capitalize } from '../../utils/invoice'

export interface StatusBadgeProps {
  status: InvoiceStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="badge" data-status={status}>
      <span className="badge__dot" />
      {capitalize(status)}
    </span>
  )
}
