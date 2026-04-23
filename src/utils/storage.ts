export const STORAGE_KEYS = {
  invoices: 'invoice-guard:invoices',
  theme: 'invoice-guard:theme',
} as const

export function loadStoredValue<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveStoredValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can fail in private mode or if quota is exceeded.
  }
}
