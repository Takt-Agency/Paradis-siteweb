import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

type Props = { value: number; reviews?: number; className?: string }

// Note sur 5 avec demi-étoiles
export function Rating({ value, reviews, className }: Props) {
  const { t, i18n } = useTranslation()
  const label = t('stays.rating', { value: value.toLocaleString(i18n.resolvedLanguage), count: reviews ?? 0 })

  return (
    <p role="img" aria-label={label} className={cn('flex items-center gap-2', className)}>
      <span className="flex gap-1 text-[0.9375rem]">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={value >= star || value < star - 0.5 ? faStar : faStarHalfStroke}
            className={value >= star - 0.5 ? 'text-brand-500' : 'text-brand-100'}
          />
        ))}
      </span>
      {reviews !== undefined && (
        <span aria-hidden className="text-[0.9375rem] text-navy-400">
          {t('stays.reviews', { count: reviews })}
        </span>
      )}
    </p>
  )
}
