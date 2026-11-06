import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { ListingCard } from '@/components/ui/ListingCard'
import { formatEventDates, formatEventDatesLong } from '@/lib/dates'
import { ROUTES } from '@/lib/routes'
import { parseDay, type FeaturedEvent } from './events.mock'

type Props = { event: FeaturedEvent; favorite: boolean; onToggleFavorite: () => void }

export function EventCard({ event, favorite, onToggleFavorite }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'fr'
  const start = parseDay(event.start)
  const end = event.end ? parseDay(event.end) : undefined
  const dates = formatEventDates(start, end, lang)

  return (
    <ListingCard
      className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-auto"
      href={`${ROUTES.events}/${event.slug}`}
      title={event.title}
      image={event.image}
      imageClassName="aspect-[331/212]"
      category={t(`events.categories.${event.category}`)}
      badgePlacement="bottom"
      location={event.city}
      favorite={favorite}
      onToggleFavorite={onToggleFavorite}
      favoriteClassName="right-2.5 top-2.5 size-10"
      overlay={
        <time
          dateTime={event.end ? `${event.start}/${event.end}` : event.start}
          aria-label={formatEventDatesLong(start, end, lang)}
          className="absolute left-2.5 top-2.5 flex min-h-[3.75rem] min-w-32 items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-[0_6px_16px_-10px_rgba(19,46,73,0.5)]"
        >
          <FontAwesomeIcon icon={faCalendarDays} className="text-xl text-brand-500" />
          <span aria-hidden className="text-[0.9375rem] font-semibold leading-tight text-navy-700">
            <span className="block whitespace-nowrap">{dates.days}</span>
            <span className="block whitespace-nowrap">{dates.month}</span>
          </span>
        </time>
      }
    />
  )
}
