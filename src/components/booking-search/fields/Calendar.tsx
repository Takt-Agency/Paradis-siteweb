import { DayPicker, type DayPickerProps } from 'react-day-picker'
import { enUS, fr } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import { useTranslation } from 'react-i18next'
import { startOfToday } from '@/lib/dates'

const LOCALES = { fr, en: enUS }

// Calendrier aux couleurs de la charte, dans la langue de l'interface, sans dates passées
export function Calendar(props: DayPickerProps) {
  const { i18n } = useTranslation()
  const today = startOfToday()

  return (
    <DayPicker
      className="pd-calendar"
      locale={LOCALES[(i18n.resolvedLanguage as keyof typeof LOCALES) ?? 'fr'] ?? fr}
      weekStartsOn={1}
      startMonth={today}
      disabled={{ before: today }}
      {...props}
    />
  )
}
