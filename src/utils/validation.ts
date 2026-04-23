import type { InvoiceFormValues, InvoiceFormErrors } from '../types/invoice'

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

export function validateInvoiceForm(values: InvoiceFormValues): InvoiceFormErrors {
  const errors: InvoiceFormErrors = {}

  // Validate sender address
  if (!values.senderAddress.street?.trim()) {
    errors['senderAddress.street'] = "can't be empty"
  }
  if (!values.senderAddress.city?.trim()) {
    errors['senderAddress.city'] = "can't be empty"
  }
  if (!values.senderAddress.postCode?.trim()) {
    errors['senderAddress.postCode'] = "can't be empty"
  }
  if (!values.senderAddress.country?.trim()) {
    errors['senderAddress.country'] = "can't be empty"
  }

  // Validate client info
  if (!values.clientName?.trim()) {
    errors.clientName = "can't be empty"
  }
  if (!values.clientEmail?.trim()) {
    errors.clientEmail = "can't be empty"
  } else if (!EMAIL_PATTERN.test(values.clientEmail.trim())) {
    errors.clientEmail = 'must be a valid email'
  }

  // Validate client address
  if (!values.clientAddress.street?.trim()) {
    errors['clientAddress.street'] = "can't be empty"
  }
  if (!values.clientAddress.city?.trim()) {
    errors['clientAddress.city'] = "can't be empty"
  }
  if (!values.clientAddress.postCode?.trim()) {
    errors['clientAddress.postCode'] = "can't be empty"
  }
  if (!values.clientAddress.country?.trim()) {
    errors['clientAddress.country'] = "can't be empty"
  }

  // Validate description
  if (!values.description?.trim()) {
    errors.description = "can't be empty"
  }

  // Validate items
  if (values.items.length === 0) {
    errors.items = 'An item must be added'
  }

  values.items.forEach((item, index) => {
    if (!item.name?.trim()) {
      errors[`items.${index}.name`] = "can't be empty"
    }

    const quantity = Number(item.quantity)
    if (!item.quantity?.trim() || !Number.isInteger(quantity) || quantity <= 0) {
      errors[`items.${index}.quantity`] = 'must be a positive whole number'
    }

    const price = Number(item.price)
    if (!item.price?.trim()) {
      errors[`items.${index}.price`] = "can't be empty"
    } else if (!Number.isFinite(price) || price <= 0) {
      errors[`items.${index}.price`] = 'must be a positive number'
    }
  })

  return errors
}
