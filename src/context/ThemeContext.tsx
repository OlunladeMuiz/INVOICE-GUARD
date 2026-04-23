import type { ReactNode } from 'react'

/**
 * ThemeContext
 * Note: Currently implemented directly in App.tsx
 * This file is kept for future context extraction
 */

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
