import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import iconMark from '@/assets/icon-white.png'
import { fadeUp } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'

// Bandeau final d'inscription (création de compte client, CDC §13.1)
export function SignupBanner() {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative isolate mt-12 overflow-hidden rounded-3xl bg-navy-700 px-6 py-9 sm:px-10 lg:mt-14 lg:px-14 lg:py-10"
    >
      {/* Bandes diagonales décoratives */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/3 lg:block">
        <span className="absolute -top-10 right-24 h-[150%] w-16 rotate-[35deg] rounded-full bg-white/[0.04]" />
        <span className="absolute -top-10 right-2 h-[150%] w-16 rotate-[35deg] rounded-full bg-white/[0.04]" />
      </div>

      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex items-center gap-8 lg:gap-10">
          <img src={iconMark} alt="" aria-hidden className="w-16 shrink-0 sm:w-24" />
          <span aria-hidden className="hidden h-24 w-px bg-white/20 lg:block" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-white [word-spacing:0.08em]">
            {t('signup.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/85">{t('signup.text')}</p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="shrink-0 self-start lg:self-center">
          <Link
            to={ROUTES.register}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-6 py-3.5 text-[0.9375rem] font-semibold sm:gap-4 sm:px-8 sm:py-4 sm:text-lg text-white shadow-[0_14px_28px_-14px_rgba(244,122,42,0.8)] transition-colors hover:bg-brand-600"
          >
            {t('signup.cta')}
            <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
