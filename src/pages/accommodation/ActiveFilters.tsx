import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '@/lib/format'
import type { StaySearch, StaySearchResult } from '@/services/stays'

type Props = {
  query: StaySearch
  priceBounds?: StaySearchResult['priceBounds']
  onChange: (patch: Partial<StaySearch>) => void
  onClear: () => void
}

type Chip = { id: string; label: string; remove: Partial<StaySearch> }

// Puces des filtres actifs, retirables une à une
export function ActiveFilters({ query, priceBounds, onChange, onClear }: Props) {
  const { t, i18n } = useTranslation()
  const amount = (value?: number) => (value === undefined ? '…' : formatAmount(value, i18n.resolvedLanguage))

  const chips: (Chip | false | '')[] = [
    query.place && { id: 'place', label: query.place, remove: { place: '' } },
    ...query.categories.map((key) => ({
      id: `category-${key}`,
      label: t(`stays.categories.${key}`),
      remove: { categories: query.categories.filter((c) => c !== key) },
    })),
    (query.priceMin !== undefined || query.priceMax !== undefined) && {
      id: 'price',
      label: `${amount(query.priceMin ?? priceBounds?.min)} – ${amount(query.priceMax ?? priceBounds?.max)} FCFA`,
      remove: { priceMin: undefined, priceMax: undefined },
    },
    query.freeCancellation && {
      id: 'cancellation',
      label: t('staysPage.filters.freeCancellation'),
      remove: { freeCancellation: false },
    },
  ]
  const visible = chips.filter((chip): chip is Chip => Boolean(chip))

  if (!visible.length) return null

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <AnimatePresence initial={false}>
        {visible.map((chip) => (
          <motion.button
            key={chip.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            type="button"
            onClick={() => onChange(chip.remove)}
            aria-label={t('staysPage.filters.remove', { label: chip.label })}
            className="flex items-center gap-2 rounded-full bg-white py-2 pl-4 pr-3 text-sm font-medium text-navy-700 ring-1 ring-navy-100 transition-colors hover:ring-navy-700"
          >
            {chip.label}
            <FontAwesomeIcon icon={faXmark} className="text-xs text-navy-400" />
          </motion.button>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={onClear}
        className="px-2 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
      >
        {t('staysPage.filters.clearAll')}
      </button>
    </div>
  )
}
