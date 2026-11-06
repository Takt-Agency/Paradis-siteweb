import { faCalendarDays, faUser } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format, parseISO } from 'date-fns'
import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import type { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'
import { DateRangeField } from '@/components/booking-search/fields/DateRangeField'
import { FieldDivider } from '@/components/booking-search/fields/FieldShell'
import { GuestsField } from '@/components/booking-search/fields/GuestsField'
import { TextField } from '@/components/booking-search/fields/TextField'
import { EASE_OUT } from '@/lib/motion'
import type { StaySearch } from '@/services/stays'

type Criteria = Pick<StaySearch, 'place' | 'checkIn' | 'checkOut' | 'guests'>
type Props = { initial: Criteria; onSubmit: (criteria: Criteria) => void }

const toIsoDate = (date?: Date) => (date ? format(date, 'yyyy-MM-dd') : undefined)

// Moteur de recherche de séjours sur la page de résultats (CDC §5 : accessible depuis les résultats).
// Pré-rempli avec les critères de l'URL ; le parent le remonte (key) quand ceux-ci changent.
export function StaysSearchBar({ initial, onSubmit }: Props) {
  const { t } = useTranslation()
  const [place, setPlace] = useState(initial.place)
  const [guests, setGuests] = useState(initial.guests)
  const [dates, setDates] = useState<DateRange | undefined>(
    initial.checkIn && initial.checkOut ? { from: parseISO(initial.checkIn), to: parseISO(initial.checkOut) } : undefined,
  )

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // Une période incomplète (arrivée sans départ) n'est pas envoyée
    const complete = dates?.from && dates.to
    onSubmit({
      place: place.trim(),
      checkIn: complete ? toIsoDate(dates.from) : undefined,
      checkOut: complete ? toIsoDate(dates.to) : undefined,
      guests,
    })
  }

  return (
    <form
      role="search"
      aria-label={t('search.label')}
      onSubmit={submit}
      className="flex flex-col rounded-[1.375rem] bg-white p-2 shadow-[0_22px_50px_-28px_rgba(0,0,0,0.6)] lg:flex-row lg:items-center lg:p-2.5"
    >
      <div className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-center">
        <TextField
          icon={faLocationDot}
          label={t('search.destination')}
          placeholder={t('search.destinationPlaceholder')}
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <FieldDivider />
        <DateRangeField
          icon={faCalendarDays}
          label={t('search.dates')}
          placeholder={t('search.datesPlaceholder')}
          value={dates}
          onChange={setDates}
          minNights={1}
          startHint={t('search.pickArrival')}
          endHint={t('search.pickDeparture')}
        />
        <FieldDivider />
        <GuestsField icon={faUser} value={guests} onChange={setGuests} />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        className="mt-2 flex h-14 shrink-0 items-center justify-center gap-3 rounded-2xl bg-brand-500 px-8 text-[1.0625rem] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(244,122,42,0.75)] transition-colors hover:bg-brand-600 lg:ml-3 lg:mt-0"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[1.0625rem]" />
        {t('search.submit')}
      </motion.button>
    </form>
  )
}
