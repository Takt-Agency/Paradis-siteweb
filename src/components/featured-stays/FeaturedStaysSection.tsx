import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ViewAllLink } from '@/components/ui/ViewAllLink'
import { useFavorites } from '@/hooks/useFavorites'
import { stagger } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { FEATURED_STAYS } from './featuredStays.mock'
import { StayCard } from './StayCard'

// Hébergements mis en avant sur l'accueil (CDC §4.1)
export function FeaturedStaysSection() {
  const { t } = useTranslation()
  const { isFavorite, toggle } = useFavorites()

  return (
    <section aria-labelledby="stays-title" className="bg-navy-700 py-14 lg:py-20">
      <div className="page-container">
        <SectionHeader
          dark
          id="stays-title"
          eyebrow={t('stays.eyebrow')}
          title={t('stays.title')}
          subtitle={t('stays.subtitle')}
          action={<ViewAllLink to={ROUTES.accommodation}>{t('stays.viewAll')}</ViewAllLink>}
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 lg:mt-14 xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0"
        >
          {FEATURED_STAYS.map((stay) => (
            <StayCard key={stay.slug} stay={stay} favorite={isFavorite(stay.slug)} onToggleFavorite={() => toggle(stay.slug)} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
