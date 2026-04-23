import type { InvoiceItemDraft, InvoiceFormErrors } from '../../types/invoice'
import { formatCurrency } from '../../utils/currency'
import { roundCurrency } from '../../utils/currency'
import { FormField } from '../shared/FormField'

export interface InvoiceItemsFieldsetProps {
  items: InvoiceItemDraft[]
  errors: InvoiceFormErrors
  onUpdateItem: (id: string, field: 'name' | 'quantity' | 'price', value: string) => void
  onAddItem: () => void
  onRemoveItem: (id: string) => void
}

export function InvoiceItemsFieldset({
  items,
  errors,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: InvoiceItemsFieldsetProps) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <h3>Item List</h3>
        {errors.items ? <p className="field__error">{errors.items}</p> : null}
      </div>

      <div className="items-list">
        <div className="items-list__head">
          <span>Item Name</span>
          <span>Qty.</span>
          <span>Price</span>
          <span>Total</span>
          <span />
        </div>

        {items.map((item, index) => (
          <div className="items-list__row" key={item.id}>
            <FormField error={errors[`items.${index}.name`]}>
              <input
                className="field__input field__input--compact"
                value={item.name}
                onChange={(event) => onUpdateItem(item.id, 'name', event.target.value)}
              />
            </FormField>
            <FormField error={errors[`items.${index}.quantity`]}>
              <input
                className="field__input field__input--compact field__input--center"
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(event) => onUpdateItem(item.id, 'quantity', event.target.value)}
              />
            </FormField>
            <FormField error={errors[`items.${index}.price`]}>
              <input
                className="field__input field__input--compact"
                type="number"
                min="0.01"
                step="0.01"
                value={item.price}
                onChange={(event) => onUpdateItem(item.id, 'price', event.target.value)}
              />
            </FormField>
            <div className="items-list__total">
              {formatCurrency(
                roundCurrency(Number(item.quantity || 0) * Number(item.price || 0)),
              )}
            </div>
            <button
              type="button"
              className="icon-button icon-button--danger"
              onClick={() => onRemoveItem(item.id)}
              aria-label={`Remove item ${index + 1}`}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      <button type="button" className="button button--ghost button--block" onClick={onAddItem}>
        + Add New Item
      </button>
    </section>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 13 16" aria-hidden="true">
      <path
        d="M11.58 3.56v10.66c0 .98-.79 1.78-1.77 1.78H2.19A1.78 1.78 0 0 1 .42 14.22V3.56h11.16Zm-3.11-3.56.89.89H13v1.78H0V.89h3.64L4.53 0h3.94Z"
        fill="currentColor"
      />
    </svg>
  )
}
