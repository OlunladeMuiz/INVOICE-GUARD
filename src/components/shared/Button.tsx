import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'danger-ghost' | 'muted'
  size?: 'default' | 'small'
  block?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'default',
  block = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant}`,
    size !== 'default' && `button--${size}`,
    block && 'button--block',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
