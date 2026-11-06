import { faCalendar, faCalendarDays, faHouse, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBed, faLocationDot, faMagnifyingGlass, faMasksTheater, faTicket, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { EASE_OUT } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { DateField } from './fields/DateField'
import { DateRangeField } from './fields/DateRangeField'
import { FieldDivider } from './fields/FieldShell'
import { GuestsField } from './fields/GuestsField'
import { OptionField } from './fields/OptionField'
import { TextField } from './fields/TextField'

type SearchTab = 'stays' | 'events' | 'rentals'

const TABS = [
  { id: 'stays', icon: faBed, path: ROUTES.accommodation },
  { id: 'events', icon: faTicket, path: ROUTES.events },
  { id: 'rentals', icon: faHouse, path: ROUTES.rentals },
] as const

// Exemples de catégories du CDC §11.1 — à remplacer par la liste gérée dans le back-office
const EVENT_CATEGORIES = ['festival', 'concert', 'culture', 'sport', 'conference']

const toIsoDate = (date?: Date) => (date ? format(date, 'yyyy-MM-dd') : '')

// Moteur de recherche (CDC §5.1) : Séjours, Événements, Longue durée
export function BookingSearch() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [tab, setTab] = useState<SearchTab>('stays')

  const [stays, setStays] = useState<{ destination: string; dates?: DateRange; guests: number }>({
    destination: '',
    guests: 1,
  })
  const [events, setEvents] = useState<{ place: string; period?: DateRange; category: string }>({
    place: '',
    category: '',
  })
  const [rentals, setRentals] = useState<{ area: string; moveIn?: Date; budget: string }>({ area: '', budget: '' })

  const onTabKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = (index + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length
    setTab(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const entries: Record<string, string> =
      tab === 'stays'
        ? {
            lieu: stays.destination.trim(),
            arrivee: toIsoDate(stays.dates?.from),
            depart: toIsoDate(stays.dates?.to),
            voyageurs: String(stays.guests),
          }
        : tab === 'events'
          ? {
              lieu: events.place.trim(),
              du: toIsoDate(events.period?.from),
              au: toIsoDate(events.period?.to ?? events.period?.from),
              categorie: events.category,
            }
          : { lieu: rentals.area.trim(), entree: toIsoDate(rentals.moveIn), budget: rentals.budget }

    const params = new URLSearchParams(Object.entries(entries).filter(([, value]) => value))
    navigate({ pathname: TABS.find((item) => item.id === tab)!.path, search: params.toString() })
  }

  const budgetDisplay = rentals.budget ? new Intl.NumberFormat(i18n.resolvedLanguage).format(Number(rentals.budget)) : ''

  return (
    <div className="w-full max-w-[65rem] xl:max-w-[70rem]">
      <div
        role="tablist"
        aria-label={t('search.label')}
        className="grid grid-cols-3 gap-1 rounded-2xl bg-white/55 p-1.5 ring-1 ring-white/70 backdrop-blur-md sm:inline-flex"
      >
        {TABS.map((item, index) => {
          const selected = item.id === tab
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              id={`search-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="search-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-center text-xs leading-tight transition-colors sm:flex-row sm:gap-3 sm:px-6 sm:py-3 sm:text-[0.9375rem]',
                selected ? 'font-semibold text-navy-700' : 'font-medium text-navy-600 hover:text-navy-700',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="search-tab-indicator"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="absolute inset-0 rounded-xl bg-white shadow-[0_6px_16px_-8px_rgba(19,46,73,0.3)]"
                />
              )}
              <FontAwesomeIcon icon={item.icon} className="relative text-base sm:text-[1.0625rem]" />
              <span className="relative">{t(`search.tabs.${item.id}`)}</span>
            </button>
          )
        })}
      </div>

      <form
        id="search-panel"
        role="tabpanel"
        aria-labelledby={`search-tab-${tab}`}
        onSubmit={onSubmit}
        className="mt-2.5 flex flex-col rounded-[1.375rem] bg-white p-2 shadow-[0_22px_50px_-28px_rgba(19,46,73,0.45)] lg:flex-row lg:items-center lg:p-2.5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-center"
          >
            {tab === 'stays' && (
              <>
                <TextField
                  icon={faLocationDot}
                  label={t('search.destination')}
                  placeholder={t('search.destinationPlaceholder')}
                  value={stays.destination}
                  onChange={(e) => setStays((s) => ({ ...s, destination: e.target.value }))}
                />
                <FieldDivider />
                <DateRangeField
                  icon={faCalendarDays}
                  label={t('search.dates')}
                  placeholder={t('search.datesPlaceholder')}
                  value={stays.dates}
                  onChange={(dates) => setStays((s) => ({ ...s, dates }))}
                  minNights={1}
                  startHint={t('search.pickArrival')}
                  endHint={t('search.pickDeparture')}
                />
                <FieldDivider />
                <GuestsField icon={faUser} value={stays.guests} onChange={(guests) => setStays((s) => ({ ...s, guests }))} />
              </>
            )}

            {tab === 'events' && (
              <>
                <TextField
                  icon={faLocationDot}
                  label={t('search.place')}
                  placeholder={t('search.placePlaceholder')}
                  value={events.place}
                  onChange={(e) => setEvents((s) => ({ ...s, place: e.target.value }))}
                />
                <FieldDivider />
                <DateRangeField
                  icon={faCalendarDays}
                  label={t('search.period')}
                  placeholder={t('search.periodPlaceholder')}
                  value={events.period}
                  onChange={(period) => setEvents((s) => ({ ...s, period }))}
                  minNights={0}
                  startHint={t('search.pickStart')}
                  endHint={t('search.pickEnd')}
                />
                <FieldDivider />
                <OptionField
                  icon={faMasksTheater}
                  label={t('search.category')}
                  placeholder={t('search.allCategories')}
                  options={EVENT_CATEGORIES.map((value) => ({ value, label: t(`eventCategories.${value}`) }))}
                  value={events.category}
                  onChange={(category) => setEvents((s) => ({ ...s, category }))}
                />
              </>
            )}

            {tab === 'rentals' && (
              <>
                <TextField
                  icon={faLocationDot}
                  label={t('search.area')}
                  placeholder={t('search.areaPlaceholder')}
                  value={rentals.area}
                  onChange={(e) => setRentals((s) => ({ ...s, area: e.target.value }))}
                />
                <FieldDivider />
                <DateField
                  icon={faCalendar}
                  label={t('search.moveIn')}
                  placeholder={t('search.moveInPlaceholder')}
                  value={rentals.moveIn}
                  onChange={(moveIn) => setRentals((s) => ({ ...s, moveIn }))}
                />
                <FieldDivider />
                <TextField
                  icon={faWallet}
                  label={t('search.budget')}
                  placeholder={t('search.budgetPlaceholder')}
                  inputMode="numeric"
                  value={budgetDisplay}
                  onChange={(e) => setRentals((s) => ({ ...s, budget: e.target.value.replace(/\D/g, '').slice(0, 9) }))}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

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
    </div>
  )
}
