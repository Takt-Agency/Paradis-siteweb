import { useTranslation } from 'react-i18next'
import { ListingCard } from '@/components/ui/ListingCard'
import { ROUTES } from '@/lib/routes'
import type { FeaturedStay } from './featuredStays.mock'

type Props = { stay: FeaturedStay; favorite: boolean; onToggleFavorite: () => void }

export function StayCard({ stay, favorite, onToggleFavorite }: Props) {
  const { t } = useTranslation()

  return (
    <ListingCard
      onDark
      className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-auto"
      href={`${ROUTES.accommodation}/${stay.slug}`}
      title={stay.name}
      image={stay.image}
      imageClassName="aspect-[3/2]"
      category={t(`stays.categories.${stay.category}`)}
      badgePlacement="top"
      location={stay.city}
      rating={stay.rating !== undefined ? { value: stay.rating, reviews: stay.reviews } : undefined}
      price={{ amount: stay.pricePerNight, unit: t('listing.perNight') }}
      favorite={favorite}
      onToggleFavorite={onToggleFavorite}
      favoriteClassName="right-4 top-4 size-11"
    />
  )
}
