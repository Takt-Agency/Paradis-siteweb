import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ViewAllLink } from '@/components/ui/ViewAllLink'
import { useFavorites } from '@/hooks/useFavorites'
import { stagger } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { EventCard } from './EventCard'
import { FEATURED_EVENTS } from './events.mock'
import { ExperiencesBanner } from './ExperiencesBanner'

// Événements à venir mis en avant sur l'accueil (CDC §4.1 et §11)
export function EventsSection() {
  const { t } = useTranslation()
  const { isFavorite, toggle } = useFavorites()

  return (
    <section aria-labelledby="events-title" className="bg-surface py-14 lg:py-20">
      <div className="page-container">
        <SectionHeader
          id="events-title"
          eyebrow={t('events.eyebrow')}
          title={t('events.title')}
          subtitle={t('events.subtitle')}
          action={<ViewAllLink to={ROUTES.events}>{t('events.viewAll')}</ViewAllLink>}
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 lg:mt-14 xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0"
        >
          {FEATURED_EVENTS.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              // Préfixe pour ne pas confondre avec les favoris d'hébergements
              favorite={isFavorite(`event:${event.slug}`)}
              onToggleFavorite={() => toggle(`event:${event.slug}`)}
            />
          ))}
        </motion.ul>

        <ExperiencesBanner />
      </div>
    </section>
  )
}
