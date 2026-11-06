import { faChevronRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { fadeUp } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import type { Destination } from './destinations'

export function DestinationCard({ destination }: { destination: Destination }) {
  const { t } = useTranslation()
  const search = new URLSearchParams({ lieu: destination.name })

  return (
    <motion.li variants={fadeUp} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]">
      <Link
        to={{ pathname: ROUTES.accommodation, search: search.toString() }}
        className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-navy-900 shadow-[0_14px_28px_-18px_rgba(19,46,73,0.5)]"
      >
        <img
          src={destination.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
        />
        <div aria-hidden className="scrim-bottom absolute inset-0" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <h3 className="flex items-center gap-2.5 font-display text-2xl font-bold text-white">
              <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
              {destination.name}
            </h3>
            <p className="mt-1.5 text-[0.9375rem] leading-snug text-white/85">{t(`destinations.items.${destination.slug}`)}</p>
          </div>
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-navy-700 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.li>
  )
}
