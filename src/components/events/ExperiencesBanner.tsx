import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import bannerMobile from '@/assets/events/experiences-banner-mobile.webp'
import banner from '@/assets/events/experiences-banner.webp'
import iconMark from '@/assets/icon-white.png'
import { fadeUp } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'

// Bandeau d'appel à l'action sous les événements
export function ExperiencesBanner() {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative isolate mt-14 overflow-hidden rounded-3xl bg-navy-700 lg:mt-20 lg:min-h-[17rem]"
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={banner} />
        <img
          src={bannerMobile}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-52 w-full object-cover sm:h-64 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[56%] lg:object-left"
        />
      </picture>

      {/* Courbe de transition photo → bleu (desktop) */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-[30%] hidden h-full w-[30%] fill-navy-700 lg:block"
      >
        {/* La forme dépasse le bord droit de la photo (56 %) pour la recouvrir entièrement */}
        <path d="M45 0 C 20 30, 44 62, 0 100 L100 100 L100 0 Z" />
      </svg>

      <img
        src={iconMark}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute right-10 top-1/2 hidden w-40 -translate-y-1/2 opacity-[0.12] grayscale xl:block"
      />

      {/* xl:pr-52 : espace réservé au filigrane pour qu'il ne passe pas sous le texte */}
      <div className="relative px-6 py-9 sm:px-10 lg:ml-[48%] lg:px-0 lg:py-12 lg:pr-10 xl:pr-52">
        <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white [word-spacing:0.08em]">
          {t('experiences.title')}
        </h2>
        <p className="mt-3 text-lg text-white/85">{t('experiences.text')}</p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-7 inline-block">
          <Link
            to={ROUTES.events}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-[0_12px_24px_-12px_rgba(244,122,42,0.8)] transition-colors hover:bg-brand-600"
          >
            {t('experiences.cta')}
            <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
