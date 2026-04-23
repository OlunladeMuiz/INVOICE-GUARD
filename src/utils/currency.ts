export function formatCurrency(amount: number): string {
  return `£ ${Number(amount).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100
}
