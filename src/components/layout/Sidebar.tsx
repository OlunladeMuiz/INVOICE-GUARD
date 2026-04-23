import type { ThemeMode } from '../../types/theme'
import { LogoMark, MoonIcon, ProfileAvatar, SunIcon } from './NavIcons'

export interface SidebarProps {
  theme: ThemeMode
  onHome: () => void
  onToggleTheme: () => void
}

export function Sidebar({ theme, onHome, onToggleTheme }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Primary">
      <button
        type="button"
        className="sidebar__brand"
        aria-label="Go to invoice list"
        onClick={onHome}
      >
        <span className="sidebar__brand-top" />
        <LogoMark />
      </button>

      <div className="sidebar__actions">
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="sidebar__divider" aria-hidden="true" />

        <div className="avatar avatar--small" aria-hidden="true">
          <ProfileAvatar />
        </div>
      </div>
    </aside>
  )
}
