import { useId } from 'react'

export function LogoMark() {
  const maskId = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <mask
          id={maskId}
          x="0"
          y="0"
          width="32"
          height="32"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
        >
          <rect width="32" height="32" fill="white" />
          <polygon points="9,0 23,0 16,9" fill="black" />
        </mask>
      </defs>
      <circle cx="16" cy="17" r="14" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

export function MoonIcon() {
  const maskId = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <mask
          id={maskId}
          x="0"
          y="0"
          width="24"
          height="24"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
        >
          <rect width="24" height="24" fill="white" />
          <circle cx="15.55" cy="8.75" r="7.55" fill="black" />
        </mask>
      </defs>
      <circle cx="10.5" cy="12.5" r="8.25" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="5" fill="currentColor" />
      <path
        d="M10 1V3M10 17V19M19 10H17M3 10H1M16.364 16.364L14.95 17.778M5.05 5.05L3.636 3.636M16.364 3.636L14.95 5.05M5.05 14.95L3.636 16.364"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ProfileAvatar() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="20" fill="#edf7fd" />
      <path
        d="M9.6 15.9c1.8-4.8 5.7-8.2 10.4-8.2 4.8 0 8.4 3.1 10.1 7.6-1.4 1.6-3.4 2.5-6 2.8h-8.4c-2.1-.1-4-.7-6.1-2.2Z"
        fill="#cf3f31"
      />
      <path
        d="M10.3 17.8c2.1-1.5 4.6-2.2 7.4-2.2h4.5c2.7 0 5.2.7 7.4 2.2l-1.5 2.6H11.8l-1.5-2.6Z"
        fill="#b43126"
      />
      <ellipse cx="20" cy="22.1" rx="7.5" ry="8.1" fill="#e6b797" />
      <path
        d="M12.4 23.7c1.2 4.4 4.3 7 7.6 7 3.3 0 6.4-2.6 7.6-7l4.4 2.2V40H8v-14.1l4.4-2.2Z"
        fill="#18352d"
      />
      <path
        d="M14.9 19.1c.7-2.4 2.5-4 5.1-4 2.7 0 4.7 1.4 5.5 4.2-.5 1.4-1.8 2.2-3.9 2.6h-4.4c-1.6-.1-2.7-.8-3-2.8Z"
        fill="#f2caa9"
      />
      <circle cx="18.2" cy="20.8" r=".85" fill="#28160f" />
      <circle cx="21.8" cy="20.6" r=".85" fill="#28160f" />
      <path
        d="M16.2 17.6c1.2-1.7 2.6-2.5 3.8-2.5 1.9 0 4 1.3 5.4 4.1-.7.7-1.7 1.1-2.9 1.3h-3.7c-1.5-.1-2.4-.7-2.6-2.9Z"
        fill="#e8bfa0"
        opacity=".62"
      />
    </svg>
  )
}
