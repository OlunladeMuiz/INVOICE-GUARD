import type { ReactNode } from 'react'

export interface ProvidersProps {
  children: ReactNode
}

/**
 * Providers component - wraps the app with necessary context providers
 * Note: As of React 19, Context API is integrated directly
 * This file is structured to be extensible for future provider needs
 */
export function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}
