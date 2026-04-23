import type { ReactNode } from 'react'

export interface PageShellProps {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="page">
      <div className="page__inner">{children}</div>
    </main>
  )
}
