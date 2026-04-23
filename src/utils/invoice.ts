import { v4 as uuidv4 } from 'uuid'
import type {
  Invoice,
  InvoiceFormValues,
  InvoiceItemDraft,
  InvoiceStatus,
} from '../types/invoice'
import { calcPaymentDue } from './dates'

export const invoiceStatuses: InvoiceStatus[] = ['draft', 'pending', 'paid']

export function generateInvoiceId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const l1 = chars[Math.floor(Math.random() * 26)]
  const l2 = chars[Math.floor(Math.random() * 26)]
  const nums = String(Math.floor(Math.random() * 9000) + 1000)
  return `${l1}${l2}${nums}`
}

export function createEmptyItem(): InvoiceItemDraft {
  return {
    id: uuidv4(),
    name: '',
    quantity: '1',
    price: '',
  }
}

export function createBlankFormValues(): InvoiceFormValues {
  return {
    createdAt: new Date().toISOString().split('T')[0],
    paymentTerms: 30,
    description: '',
    clientName: '',
    clientEmail: '',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1  3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    items: [createEmptyItem()],
  }
}

export function formValuesFromInvoice(invoice: Invoice): InvoiceFormValues {
  return {
    createdAt: invoice.createdAt,
    paymentTerms: invoice.paymentTerms,
    description: invoice.description,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    senderAddress: { ...invoice.senderAddress },
    clientAddress: { ...invoice.clientAddress },
    items: invoice.items.map((item) => ({
      id: uuidv4(),
      name: item.name,
      quantity: String(item.quantity),
      price: String(item.price),
    })),
  }
}

export function createInvoiceFromForm(
  values: InvoiceFormValues,
  status: InvoiceStatus,
  existingIds: string[],
  invoiceId?: string,
): Invoice {
  const id = invoiceId || generateUniqueInvoiceId(existingIds)
  const items = values.items.map((item) => ({
    id: uuidv4(),
    name: item.name,
    quantity: Number(item.quantity),
    price: Number(item.price),
    total: Number(item.quantity) * Number(item.price),
  }))

  const total = items.reduce((sum, item) => sum + item.total, 0)
  const paymentDue = calcPaymentDue(values.createdAt, values.paymentTerms)

  return {
    id,
    createdAt: values.createdAt,
    paymentDue,
    description: values.description,
    paymentTerms: values.paymentTerms,
    clientName: values.clientName,
    clientEmail: values.clientEmail,
    status,
    senderAddress: values.senderAddress,
    clientAddress: values.clientAddress,
    items,
    total,
  }
}

function generateUniqueInvoiceId(existingIds: string[]): string {
  let id: string
  do {
    id = generateInvoiceId()
  } while (existingIds.includes(id))
  return id
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll(selector))
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getTotalLabel(
  totalInvoices: number,
  selectedFilters: InvoiceStatus[],
  filteredCount: number,
): string {
  if (selectedFilters.length === 1) {
    return `There are ${filteredCount} ${selectedFilters[0]} invoices`
  }

  return totalInvoices ? `There are ${filteredCount} total invoices` : 'There are no invoices yet'
}
