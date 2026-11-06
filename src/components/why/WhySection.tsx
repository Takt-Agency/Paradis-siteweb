import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { faAward, faBed, faHeadset, faMobileScreenButton, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'
import { SignupBanner } from './SignupBanner'

// Atouts de la plateforme — chacun correspond à une exigence du CDC (§1.3, §14, §16.3, §17, §20)
const REASONS = [
  { key: 'offer', icon: faBed, accent: 'turquoise' },
  { key: 'secure', icon: faShieldHalved, accent: 'orange' },
  { key: 'support', icon: faHeadset, accent: 'turquoise' },
  { key: 'payment', icon: faCreditCard, accent: 'orange' },
  { key: 'partners', icon: faAward, accent: 'turquoise' },
  { key: 'experience', icon: faMobileScreenButton, accent: 'orange' },
] as const

export function WhySection() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="why-title" className="bg-white py-14 lg:py-20">
      <div className="page-container">
        <SectionHeader
          id="why-title"
          eyebrow={t('why.eyebrow')}
          title={
            <>
              {t('why.titleStart')} <span className="text-brand-500">{t('why.titleBrand')}</span>
            </>
          }
          subtitle={t('why.subtitle')}
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:mt-14 xl:grid-cols-6"
        >
          {REASONS.map((reason) => (
            <motion.li
              key={reason.key}
              variants={fadeUp}
              className="flex flex-col items-center rounded-3xl bg-white px-4 pb-7 pt-6 text-center shadow-[0_18px_40px_-30px_rgba(19,46,73,0.45)] ring-1 ring-navy-50 transition-transform duration-300 hover:-translate-y-1 sm:px-5"
            >
              <span
                className={cn(
                  'grid size-16 place-items-center rounded-2xl text-[1.75rem]',
                  reason.accent === 'turquoise' ? 'bg-turquoise-50 text-turquoise-600' : 'bg-brand-50 text-brand-500',
                )}
              >
                <FontAwesomeIcon icon={reason.icon} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold leading-snug text-navy-700 sm:text-xl">
                {t(`why.reasons.${reason.key}.title`)}
              </h3>
              <span aria-hidden className="mt-4 h-1 w-10 rounded-full bg-brand-500" />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-navy-500">{t(`why.reasons.${reason.key}.text`)}</p>
            </motion.li>
          ))}
        </motion.ul>

        <SignupBanner />
      </div>
    </section>
  )
}
