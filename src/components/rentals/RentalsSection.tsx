import { faCalendarDays, faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight, faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import visual from '@/assets/rentals/hero-visual.webp'
import { ListingCard } from '@/components/ui/ListingCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useFavorites } from '@/hooks/useFavorites'
import { EASE_OUT, fadeUp, stagger } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { FEATURED_RENTALS } from './rentals.mock'

// Atouts de l'agence immobilière Paradis (CDC §12.3 à §12.5)
const FEATURES = [
  { key: 'contract', icon: faCalendarDays },
  { key: 'signature', icon: faFileSignature },
  { key: 'rent', icon: faCreditCard },
]

export function RentalsSection() {
  const { t } = useTranslation()
  const { isFavorite, toggle } = useFavorites()

  return (
    <section aria-labelledby="rentals-title" className="relative overflow-hidden bg-navy-700 py-14 lg:py-20">
      {/* Halo discret derrière le visuel */}
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-40 hidden size-[60rem] rounded-full bg-white/[0.03] lg:block" />

      <div className="page-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <SectionHeader
              dark
              id="rentals-title"
              eyebrow={t('rentals.eyebrow')}
              title={t('rentals.title')}
              subtitle={t('rentals.subtitle')}
            />

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-y-4 sm:divide-x sm:divide-white/15"
            >
              {FEATURES.map((feature) => (
                <motion.li key={feature.key} variants={fadeUp} className="flex items-center gap-3.5 sm:px-7 sm:first:pl-0">
                  <FontAwesomeIcon icon={feature.icon} className="w-8 shrink-0 text-[1.75rem] text-turquoise-500" />
                  <p className="text-[0.9375rem] font-medium leading-snug text-white/90">
                    <span className="block">{t(`rentals.features.${feature.key}.title`)}</span>
                    {t(`rentals.features.${feature.key}.text`)}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mt-10 inline-block"
            >
              <Link
                to={ROUTES.rentals}
                className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-6 py-3.5 text-[0.9375rem] font-semibold sm:gap-4 sm:px-8 sm:py-4 sm:text-lg text-white shadow-[0_14px_28px_-14px_rgba(244,122,42,0.8)] transition-colors hover:bg-brand-600"
              >
                {t('rentals.cta')}
                <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.img
            src={visual}
            alt=""
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="mx-auto w-full max-w-[38rem] drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)] lg:mr-0"
          />
        </div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 lg:mt-14 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        >
          {FEATURED_RENTALS.map((rental) => (
            <ListingCard
              key={rental.slug}
              className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-auto"
              onDark
              href={`${ROUTES.rentals}/${rental.slug}`}
              title={rental.title}
              image={rental.image}
              imageClassName="aspect-[444/171]"
              category={t(`rentals.categories.${rental.category}`)}
              badgePlacement="bottom"
              location={rental.location}
              price={{ amount: rental.monthlyRent, unit: t('listing.perMonth') }}
              // Préfixe pour ne pas confondre avec les autres favoris
              favorite={isFavorite(`rental:${rental.slug}`)}
              onToggleFavorite={() => toggle(`rental:${rental.slug}`)}
              favoriteClassName="right-3 top-3 size-11"
            />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
