import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useTranslation } from 'react-i18next'
import { formatShortDate } from '@/lib/dates'
import { LazyCalendar } from './LazyCalendar'
import { PopoverField } from './PopoverField'

type Props = {
  icon: IconDefinition
  label: string
  placeholder: string
  value?: Date
  onChange: (date?: Date) => void
}

export function DateField({ icon, label, placeholder, value, onChange }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'fr'
  const display = value ? formatShortDate(value, lang) : undefined

  return (
    <PopoverField icon={icon} label={label} value={display} placeholder={placeholder} align="center">
      {(close) => (
        <LazyCalendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date)
            if (date) close()
          }}
        />
      )}
    </PopoverField>
  )
}
