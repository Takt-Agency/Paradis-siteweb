import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import hero768 from '@/assets/hero-benin-768.webp'
import hero1280 from '@/assets/hero-benin-1280.webp'
import hero1536 from '@/assets/hero-benin-1536.webp'
import iconMark from '@/assets/icon-white.png'
import { BookingSearch } from '@/components/booking-search/BookingSearch'
import { TrustIndicators } from '@/components/trust-indicators/TrustIndicators'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { EASE_OUT, fadeIn, fadeUp } from '@/lib/motion'
import './Hero.css'

const sequence: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

export function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Parallaxe très légère de la photo et du monogramme
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '12%'])
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-20%'])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      // z-10 : les panneaux de recherche passent au-dessus de la section suivante
      className="relative isolate z-10 flex min-h-[calc(100svh-4.75rem)] flex-col xl:min-h-[max(45rem,calc(100svh-5.625rem))]"
    >
      {/* Seul le décor est recadré : les panneaux de recherche peuvent déborder du hero */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          src={hero1536}
          srcSet={`${hero768} 768w, ${hero1280} 1280w, ${hero1536} 1536w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.06 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          className="size-full object-cover object-[62%_center]"
        />
        <div className="hero-overlay absolute inset-0" />
        <motion.img
          src={iconMark}
          alt=""
          style={{ y: markY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE_OUT }}
          className="pointer-events-none absolute right-[12%] top-[6%] hidden w-[min(27vw,28.75rem)] select-none xl:block"
        />
      </div>

      <div className="page-container flex flex-1 flex-col pb-10 pt-12 sm:pt-16 xl:py-16">
        {/* Bloc centré verticalement : l'espace libre se répartit en haut et en bas */}
        <motion.div variants={sequence} initial="hidden" animate="visible" className="flex flex-1 flex-col xl:justify-center">
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-5 font-display text-[clamp(2.25rem,4.2vw,4.25rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-navy-700 sm:mt-6"
          >
            <span className="block">{t('hero.titleLine1')}</span>
            <span className="block">{t('hero.titleLine2')}</span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mt-4 max-w-[36rem] text-lg 2xl:max-w-[40rem] leading-relaxed text-navy-600 sm:mt-5 sm:text-xl xl:text-[1.375rem] xl:leading-[1.45]"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="relative z-10 mt-8 xl:mt-11">
            <BookingSearch />
          </motion.div>

          <TrustIndicators className="mt-8 xl:mt-14" />
        </motion.div>
      </div>
    </section>
  )
}
