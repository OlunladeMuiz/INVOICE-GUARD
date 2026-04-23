import { useRef, useState } from 'react'
import type { InvoiceFormValues, InvoiceFormErrors, Invoice } from '../../types/invoice'
import { FormField } from '../shared/FormField'
import { InvoiceItemsFieldset } from './InvoiceItemsFieldset'
import {
  formValuesFromInvoice,
  createBlankFormValues,
  createEmptyItem,
} from '../../utils/invoice'
import { validateInvoiceForm } from '../../utils/validation'
import { useFocusTrap } from '../../utils/hooks'

type DrawerState =
  | { mode: 'create' }
  | { mode: 'edit'; invoice: Invoice }

type SaveMode = 'draft' | 'submit'

export interface InvoiceFormDrawerProps {
  drawer: DrawerState
  onClose: () => void
  onSubmit: (values: InvoiceFormValues, mode: SaveMode) => void
}

export function InvoiceFormDrawer({ drawer, onClose, onSubmit }: InvoiceFormDrawerProps) {
  const isEdit = drawer.mode === 'edit'
  const currentInvoice = isEdit ? drawer.invoice : null
  const canSaveDraft = !isEdit || currentInvoice?.status === 'draft'
  const primaryLabel =
    !isEdit || currentInvoice?.status === 'draft' ? 'Save & Send' : 'Save Changes'

  const [values, setValues] = useState<InvoiceFormValues>(() =>
    currentInvoice ? formValuesFromInvoice(currentInvoice) : createBlankFormValues(),
  )
  const [errors, setErrors] = useState<InvoiceFormErrors>({})
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(true, panelRef, onClose)

  const updateField = <K extends keyof InvoiceFormValues>(
    field: K,
    nextValue: InvoiceFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [field]: nextValue }))
  }

  const updateAddress = (
    section: 'senderAddress' | 'clientAddress',
    field: keyof InvoiceFormValues['senderAddress'],
    nextValue: string,
  ) => {
    setValues((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: nextValue,
      },
    }))
  }

  const updateItem = (id: string, field: 'name' | 'quantity' | 'price', nextValue: string) => {
    setValues((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id ? { ...item, [field]: nextValue } : item,
      ),
    }))
  }

  const addItem = () => {
    setValues((current) => ({
      ...current,
      items: [...current.items, createEmptyItem()],
    }))
  }

  const removeItem = (id: string) => {
    setValues((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== id),
    }))
  }

  const submit = (mode: SaveMode) => {
    const nextErrors = mode === 'draft' ? {} : validateInvoiceForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit(values, mode)
  }

  return (
    <div
      className="drawer"
      role="presentation"
      onMouseDown={(event) => event.currentTarget === event.target && onClose()}
    >
      <aside
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-form-title"
      >
        <form
          className="drawer__form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            submit('submit')
          }}
        >
          <header className="drawer__header">
            <div className="drawer__header-row">
              <button
                type="button"
                className="drawer__back-button"
                onClick={onClose}
                aria-label="Close invoice form"
              >
                <ChevronLeftIcon />
              </button>
            </div>
            <h2 id="invoice-form-title" className="drawer__title">
              {isEdit ? (
                <>
                  Edit <span>#</span>
                  {currentInvoice?.id}
                </>
              ) : (
                'New Invoice'
              )}
            </h2>
          </header>

          <div className="drawer__content">
            <section className="form-section">
              <h3>Bill From</h3>
              <FormField label="Street Address" error={errors['senderAddress.street']}>
                <input
                  className="field__input"
                  value={values.senderAddress.street}
                  onChange={(event) => updateAddress('senderAddress', 'street', event.target.value)}
                />
              </FormField>

              <div className="form-grid form-grid--three">
                <FormField label="City" error={errors['senderAddress.city']}>
                  <input
                    className="field__input"
                    value={values.senderAddress.city}
                    onChange={(event) => updateAddress('senderAddress', 'city', event.target.value)}
                  />
                </FormField>
                <FormField label="Post Code" error={errors['senderAddress.postCode']}>
                  <input
                    className="field__input"
                    value={values.senderAddress.postCode}
                    onChange={(event) =>
                      updateAddress('senderAddress', 'postCode', event.target.value)
                    }
                  />
                </FormField>
                <FormField label="Country" error={errors['senderAddress.country']}>
                  <input
                    className="field__input"
                    value={values.senderAddress.country}
                    onChange={(event) =>
                      updateAddress('senderAddress', 'country', event.target.value)
                    }
                  />
                </FormField>
              </div>
            </section>

            <section className="form-section">
              <h3>Bill To</h3>
              <FormField label="Client's Name" error={errors.clientName}>
                <input
                  className="field__input"
                  value={values.clientName}
                  onChange={(event) => updateField('clientName', event.target.value)}
                />
              </FormField>

              <FormField
                label="Client's Email"
                error={errors.clientEmail}
                hint="e.g. email@example.com"
              >
                <input
                  className="field__input"
                  type="email"
                  value={values.clientEmail}
                  onChange={(event) => updateField('clientEmail', event.target.value)}
                />
              </FormField>

              <FormField label="Street Address" error={errors['clientAddress.street']}>
                <input
                  className="field__input"
                  value={values.clientAddress.street}
                  onChange={(event) => updateAddress('clientAddress', 'street', event.target.value)}
                />
              </FormField>

              <div className="form-grid form-grid--three">
                <FormField label="City" error={errors['clientAddress.city']}>
                  <input
                    className="field__input"
                    value={values.clientAddress.city}
                    onChange={(event) => updateAddress('clientAddress', 'city', event.target.value)}
                  />
                </FormField>
                <FormField label="Post Code" error={errors['clientAddress.postCode']}>
                  <input
                    className="field__input"
                    value={values.clientAddress.postCode}
                    onChange={(event) =>
                      updateAddress('clientAddress', 'postCode', event.target.value)
                    }
                  />
                </FormField>
                <FormField label="Country" error={errors['clientAddress.country']}>
                  <input
                    className="field__input"
                    value={values.clientAddress.country}
                    onChange={(event) =>
                      updateAddress('clientAddress', 'country', event.target.value)
                    }
                  />
                </FormField>
              </div>
            </section>

            <section className="form-section">
              <div className="form-grid form-grid--two">
                <FormField label="Invoice Date">
                  <input
                    className="field__input"
                    type="date"
                    value={values.createdAt}
                    onChange={(event) => updateField('createdAt', event.target.value)}
                  />
                </FormField>

                <FormField label="Payment Terms">
                  <select
                    className="field__input field__select"
                    value={values.paymentTerms}
                    onChange={(event) => updateField('paymentTerms', Number(event.target.value))}
                  >
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                  </select>
                </FormField>
              </div>
            </section>

            <section className="form-section">
              <FormField label="Project Description" error={errors.description}>
                <input
                  className="field__input"
                  value={values.description}
                  onChange={(event) => updateField('description', event.target.value)}
                />
              </FormField>
            </section>

            <InvoiceItemsFieldset
              items={values.items}
              errors={errors}
              onUpdateItem={updateItem}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          </div>

          <footer className="drawer__footer">
            <button type="button" className="button button--ghost" onClick={onClose}>
              {isEdit ? 'Cancel' : 'Discard'}
            </button>

            {canSaveDraft ? (
              <button type="button" className="button button--muted" onClick={() => submit('draft')}>
                Save as Draft
              </button>
            ) : null}

            <button type="submit" className="button button--primary">
              {primaryLabel}
            </button>
          </footer>
        </form>
      </aside>
    </div>
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
