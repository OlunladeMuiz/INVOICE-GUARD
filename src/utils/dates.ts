import { format, addDays } from 'date-fns'

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return format(new Date(dateStr), 'dd MMM yyyy')
}

export function calcPaymentDue(createdAt: string, paymentTerms: number): string {
  const date = new Date(createdAt)
  return format(addDays(date, Number(paymentTerms)), 'yyyy-MM-dd')
}
