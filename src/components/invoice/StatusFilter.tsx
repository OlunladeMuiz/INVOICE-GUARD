export interface StatusFilterChipProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function StatusFilterChip({ label, checked, onChange }: StatusFilterChipProps) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  )
}
