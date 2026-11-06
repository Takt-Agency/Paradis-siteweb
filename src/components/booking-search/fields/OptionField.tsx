import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/cn'
import { PopoverField } from './PopoverField'

type Option = { value: string; label: string }

type Props = {
  icon: IconDefinition
  label: string
  placeholder: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

// Liste de choix unique (ex. catégorie d'événement)
export function OptionField({ icon, label, placeholder, options, value, onChange }: Props) {
  const selected = options.find((option) => option.value === value)

  return (
    <PopoverField icon={icon} label={label} value={selected?.label} placeholder={placeholder} align="end" panelClassName="p-1.5 lg:w-64">
      {(close) => (
        <ul>
          {[{ value: '', label: placeholder }, ...options].map((option) => (
            <li key={option.value}>
              <button
                type="button"
                aria-pressed={option.value === value}
                onClick={() => {
                  onChange(option.value)
                  close()
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[0.9375rem] transition-colors hover:bg-surface',
                  option.value === value ? 'font-semibold text-navy-700' : 'text-navy-600',
                )}
              >
                {option.label}
                {option.value === value && <FontAwesomeIcon icon={faCheck} className="text-[0.8125rem] text-turquoise-500" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </PopoverField>
  )
}
