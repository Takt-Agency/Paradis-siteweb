import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight, faCalendarCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FavoriteButton } from '@/components/ui/FavoriteButton'
import { Rating } from '@/components/ui/Rating'
import { formatAmount } from '@/lib/format'
import { fadeUp } from '@/lib/motion'
import type { StaySummary } from '@/services/stays'

type Props = {
  stay: StaySummary
  href: string
  /** Nombre de nuits de la période recherchée (0 sans dates) */
  nights: number
  favorite: boolean
  onToggleFavorite: () => void
}

// Résultat de recherche de séjour (CDC §5.3) : horizontal à partir de la tablette
export function StayResultCard({ stay, href, nights, favorite, onToggleFavorite }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage

  return (
    <motion.li variants={fadeUp}>
      <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-30px_rgba(19,46,73,0.45)] ring-1 ring-navy-50 transition-shadow duration-300 hover:shadow-[0_26px_50px_-26px_rgba(19,46,73,0.5)] md:flex-row">
        <div className="relative aspect-[3/2] shrink-0 overflow-hidden md:aspect-auto md:w-[42%] md:min-h-64 xl:w-[23rem]">
          <img
            src={stay.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-turquoise-500 px-3.5 py-1.5 text-sm font-semibold text-white">
            {t(`stays.categories.${stay.category}`)}
          </span>
          {/* z-10 : au-dessus du lien qui couvre toute la carte */}
          <FavoriteButton
            active={favorite}
            onToggle={onToggleFavorite}
            name={stay.name}
            className="absolute right-4 top-4 z-10 size-11"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-snug text-navy-700 sm:text-[1.375rem]">
                {/* Lien étiré : toute la carte est cliquable */}
                <Link to={href} className="after:absolute after:inset-0 after:content-['']">
                  {stay.name}
                </Link>
              </h3>
              <p className="mt-1.5 flex items-center gap-2 text-[0.9375rem] text-navy-500">
                <FontAwesomeIcon icon={faLocationDot} className="text-navy-300" />
                {stay.city}
              </p>
            </div>
            {stay.rating !== undefined && <Rating value={stay.rating} reviews={stay.reviews} />}
          </div>

          <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-navy-500">{stay.description}</p>

          {(stay.freeCancellation || stay.available) && (
            <ul className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
              {stay.available && (
                <li className="flex items-center gap-2 rounded-full bg-turquoise-50 px-3 py-1.5 text-turquoise-600">
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  {t('staysPage.card.available')}
                </li>
              )}
              {stay.freeCancellation && (
                <li className="flex items-center gap-2 rounded-full bg-turquoise-50 px-3 py-1.5 text-turquoise-600">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  {t('staysPage.card.freeCancellation')}
                </li>
              )}
            </ul>
          )}

          {/* Pousse le prix en bas de la carte, avec un écart minimum */}
          <div aria-hidden className="min-h-5 flex-1" />
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-navy-50 pt-5">
            <div className="text-navy-500">
              <p className="text-sm">{t('listing.from')}</p>
              <p className="whitespace-nowrap">
                <span className="font-display text-[1.75rem] font-bold leading-none text-navy-700">
                  {formatAmount(stay.pricePerNight, lang)}
                </span>{' '}
                <span className="text-sm font-semibold text-navy-700">FCFA</span>{' '}
                <span className="text-sm">{t('listing.perNight')}</span>
              </p>
              <p className="mt-1 text-xs text-navy-400">
                {nights > 0 &&
                  `${t('staysPage.card.total', { count: nights, total: formatAmount(stay.pricePerNight * nights, lang) })} · `}
                {t('staysPage.card.serviceFees')}
              </p>
            </div>

            <span
              aria-hidden
              className="inline-flex items-center gap-3 rounded-full bg-brand-500 px-5 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_10px_20px_-10px_rgba(244,122,42,0.8)] transition-colors duration-300 group-hover:bg-brand-600"
            >
              {t('staysPage.card.view')}
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export function StayResultSkeleton() {
  return (
    <li aria-hidden className="flex animate-pulse flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-navy-50 md:flex-row">
      <div className="aspect-[3/2] bg-navy-50 md:aspect-auto md:min-h-64 md:w-[42%] xl:w-[23rem]" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-6 w-2/3 rounded-lg bg-navy-50" />
        <div className="h-4 w-1/4 rounded-lg bg-navy-50" />
        <div className="mt-2 h-4 w-full rounded-lg bg-navy-50" />
        <div className="h-4 w-4/5 rounded-lg bg-navy-50" />
        <div className="mt-auto flex items-end justify-between pt-6">
          <div className="h-8 w-40 rounded-lg bg-navy-50" />
          <div className="h-11 w-44 rounded-full bg-navy-50" />
        </div>
      </div>
    </li>
  )
}
