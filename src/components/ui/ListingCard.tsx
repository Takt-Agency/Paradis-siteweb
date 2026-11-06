import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { fadeUp } from '@/lib/motion'
import { FavoriteButton } from './FavoriteButton'
import { Rating } from './Rating'

type Props = {
  href: string
  title: string
  image: string
  /** Proportions de la photo (classe aspect-*) */
  imageClassName: string
  category: string
  /** Badge de catégorie en haut de la photo, ou à cheval sur le bas de la photo */
  badgePlacement: 'top' | 'bottom'
  location: string
  favorite: boolean
  onToggleFavorite: () => void
  /** Taille et position du cœur sur la photo */
  favoriteClassName: string
  /** Élément supplémentaire posé sur la photo (ex. date d'un événement) */
  overlay?: ReactNode
  rating?: { value: number; reviews?: number }
  price?: { amount: number; unit: string }
  /** Ombre adaptée à un fond sombre */
  onDark?: boolean
  /** Largeur de la carte dans sa liste */
  className?: string
}

const arrow = (
  <span
    aria-hidden
    className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-500 text-white shadow-[0_10px_20px_-10px_rgba(244,122,42,0.8)] transition-colors duration-300 group-hover:bg-brand-600"
  >
    <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />
  </span>
)

// Carte d'annonce commune : hébergements, événements, locations longue durée
export function ListingCard(props: Props) {
  const { t, i18n } = useTranslation()
  const { badgePlacement, price } = props

  const badge = (
    <span
      className={cn(
        'absolute rounded-full bg-turquoise-500 px-3.5 py-1.5 text-sm font-semibold text-white',
        badgePlacement === 'top' ? 'left-4 top-4' : 'left-5 top-0 -translate-y-1/2',
      )}
    >
      {props.category}
    </span>
  )

  const location = (
    <p className={cn('flex items-center gap-2 text-[0.9375rem] text-navy-500', price && 'mt-3')}>
      <FontAwesomeIcon icon={faLocationDot} className="text-navy-300" />
      {props.location}
    </p>
  )

  return (
    <motion.li variants={fadeUp} className={props.className}>
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-shadow duration-300',
          props.onDark
            ? 'shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)] hover:shadow-[0_26px_50px_-22px_rgba(0,0,0,0.6)]'
            : 'shadow-[0_18px_40px_-28px_rgba(19,46,73,0.45)] ring-1 ring-navy-50 hover:shadow-[0_26px_50px_-26px_rgba(19,46,73,0.5)]',
        )}
      >
        <div className={cn('relative overflow-hidden', props.imageClassName)}>
          <img
            src={props.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
          {badgePlacement === 'top' && badge}
          {props.overlay}
          {/* z-10 : au-dessus du lien qui couvre toute la carte */}
          <FavoriteButton
            active={props.favorite}
            onToggle={props.onToggleFavorite}
            name={props.title}
            className={cn('absolute z-10', props.favoriteClassName)}
          />
        </div>

        <div className={cn('relative flex flex-1 flex-col px-5 pb-5 2xl:px-6', badgePlacement === 'bottom' ? 'pt-7' : 'pt-5')}>
          {badgePlacement === 'bottom' && badge}
          <h3 className="font-display text-xl font-bold leading-snug text-navy-700">
            {/* Lien étiré : toute la carte est cliquable */}
            <Link to={props.href} className="after:absolute after:inset-0 after:content-['']">
              {props.title}
            </Link>
          </h3>

          {props.rating && <Rating value={props.rating.value} reviews={props.rating.reviews} className="mt-3" />}

          {price ? (
            <>
              {location}
              <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                <p className="text-navy-500">
                  <span className="block text-sm">{t('listing.from')}</span>
                  <span className="whitespace-nowrap">
                    <span className="font-display text-[1.75rem] font-bold leading-none text-navy-700">
                      {new Intl.NumberFormat(i18n.resolvedLanguage).format(price.amount)}
                    </span>{' '}
                    <span className="text-sm font-semibold text-navy-700">FCFA</span> <span className="text-sm">{price.unit}</span>
                  </span>
                </p>
                {arrow}
              </div>
            </>
          ) : (
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              {location}
              {arrow}
            </div>
          )}
        </div>
      </article>
    </motion.li>
  )
}
