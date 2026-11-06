import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { differenceInCalendarDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatShortDate } from '@/lib/dates'
import { LazyCalendar } from './LazyCalendar'
import { PopoverField } from './PopoverField'

type Props = {
  icon: IconDefinition
  label: string
  placeholder: string
  value?: DateRange
  onChange: (range?: DateRange) => void
  /** Nombre minimum de nuits (1 pour un séjour, 0 pour une période d'événements) */
  minNights: number
  startHint: string
  endHint: string
}

export function DateRangeField({ icon, label, placeholder, value, onChange, minNights, startHint, endHint }: Props) {
  const { t, i18n } = useTranslation()
  const twoMonths = useMediaQuery('(min-width: 768px)')
  const lang = i18n.resolvedLanguage ?? 'fr'

  const from = value?.from
  const to = value?.to
  const nights = from && to ? differenceInCalendarDays(to, from) : 0

  const display = from ? `${formatShortDate(from, lang)} – ${to ? formatShortDate(to, lang) : '…'}` : undefined

  const onSelect = (range?: DateRange) => {
    // Un séjour doit compter au moins une nuit : un même jour cliqué deux fois reste une date d'arrivée
    if (range?.from && range.to && differenceInCalendarDays(range.to, range.from) < minNights) {
      onChange({ from: range.from, to: undefined })
      return
    }
    onChange(range)
  }

  let hint = startHint
  if (from && !to) hint = endHint
  else if (from && to) hint = minNights > 0 ? t('search.night', { count: nights }) : (display ?? '')

  return (
    <PopoverField icon={icon} label={label} value={display} placeholder={placeholder} align="center">
      {(close) => (
        <div className="flex flex-col items-center">
          <LazyCalendar mode="range" selected={value} onSelect={onSelect} numberOfMonths={twoMonths ? 2 : 1} excludeDisabled />
          <div className="mt-3 flex w-full items-center justify-between gap-4 border-t border-navy-50 pt-3">
            <p aria-live="polite" className="text-sm text-navy-500">
              {hint}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onChange(undefined)}
                disabled={!from}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-500 underline-offset-4 hover:underline disabled:opacity-40"
              >
                {t('search.clear')}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
              >
                {t('search.apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </PopoverField>
  )
}
