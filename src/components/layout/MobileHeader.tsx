import type { ThemeMode } from '../../types/theme'
import { LogoMark, MoonIcon, ProfileAvatar, SunIcon } from './NavIcons'

export interface MobileHeaderProps {
  theme: ThemeMode
  onHome: () => void
  onToggleTheme: () => void
}

export function MobileHeader({ theme, onHome, onToggleTheme }: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <button
        type="button"
        className="mobile-header__brand"
        aria-label="Go to invoice list"
        onClick={onHome}
      >
        <span className="mobile-header__brand-top" />
        <LogoMark />
      </button>

      <div className="mobile-header__actions">
        <span className="mobile-header__spacer" aria-hidden="true" />

        <div className="mobile-header__control">
          <button
            type="button"
            className="mobile-header__theme-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <span className="mobile-header__divider" aria-hidden="true" />

        <div className="mobile-header__profile">
          <div className="avatar" aria-hidden="true">
            <ProfileAvatar />
          </div>
        </div>
      </div>
    </header>
  )
}
