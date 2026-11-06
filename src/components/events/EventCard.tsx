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
          className="absolute left-2.5 top-2.5 flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 shadow-[0_6px_16px_-10px_rgba(19,46,73,0.5)]"
        >
          <FontAwesomeIcon icon={faCalendarDays} className="text-base text-brand-500" />
          <span aria-hidden className="text-[0.9375rem] font-semibold text-navy-700">
            {dates.days} {dates.month}
          </span>
        </time>
      }
    />
  )
}
