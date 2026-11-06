import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/cn'
import { stagger } from '@/lib/motion'
import { DestinationCard } from './DestinationCard'
import { DESTINATIONS } from './destinations'
import { Highlights } from './Highlights'

const arrowClass =
  'grid size-12 place-items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:size-14'

export function DestinationsSection() {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateArrows()
    const observer = new ResizeObserver(updateArrows)
    observer.observe(track)
    return () => observer.disconnect()
  }, [updateArrows])

  // Fait défiler d'une carte (largeur de carte + espacement)
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    const card = track?.querySelector('li')
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  // Les flèches ne s'affichent que s'il y a quelque chose à faire défiler
  const arrows = (canPrev || canNext) && (
    <div className="flex gap-3">
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label={t('destinations.previous')}
        className={cn(arrowClass, 'bg-white text-navy-700 ring-1 ring-navy-100 hover:ring-navy-300')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        aria-label={t('destinations.next')}
        className={cn(arrowClass, 'bg-brand-500 text-white shadow-[0_10px_22px_-12px_rgba(244,122,42,0.8)] hover:bg-brand-600')}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </motion.button>
    </div>
  )

  return (
    <section aria-labelledby="destinations-title" className="relative overflow-hidden bg-surface py-14 lg:py-20">
      <svg
        aria-hidden
        viewBox="0 0 600 260"
        fill="none"
        className="pointer-events-none absolute -right-20 top-6 hidden w-[38.75rem] text-navy-100 lg:block"
      >
        {[0, 22, 44, 66].map((offset) => (
          <path key={offset} d={`M0 ${120 + offset} C 140 ${40 + offset}, 300 ${200 + offset}, 600 ${70 + offset}`} stroke="currentColor" strokeWidth="1.2" />
        ))}
      </svg>

      <div className="page-container relative">
        <SectionHeader
          id="destinations-title"
          eyebrow={t('destinations.eyebrow')}
          title={t('destinations.title')}
          subtitle={t('destinations.subtitle')}
          action={arrows || undefined}
        />

        <motion.ul
          ref={trackRef}
          onScroll={updateArrows}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8 lg:mt-14"
        >
          {DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </motion.ul>

        <div className="mt-10 lg:mt-14">
          <Highlights />
        </div>
      </div>
    </section>
  )
}
