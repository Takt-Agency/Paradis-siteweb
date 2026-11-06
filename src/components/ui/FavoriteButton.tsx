import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

type Props = { active: boolean; onToggle: () => void; name: string; className?: string }

// Cœur « favori » posé sur une photo de carte (taille et position via className)
export function FavoriteButton({ active, onToggle, name, className }: Props) {
  const { t } = useTranslation()

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      aria-pressed={active}
      aria-label={t(active ? 'favorites.remove' : 'favorites.add', { name })}
      onClick={onToggle}
      className={cn(
        'grid place-items-center rounded-full bg-white text-navy-700 shadow-[0_6px_16px_-8px_rgba(19,46,73,0.5)] transition-colors hover:text-brand-500',
        className,
      )}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: active ? 0.5 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className="flex"
      >
        <FontAwesomeIcon icon={active ? faHeart : faHeartRegular} className={cn('text-[1.0625rem]', active && 'text-brand-500')} />
      </motion.span>
    </motion.button>
  )
}
