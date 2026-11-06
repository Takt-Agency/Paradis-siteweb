import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useId, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DESTINATIONS } from '@/components/destinations/destinations'
import { cn } from '@/lib/cn'
import { normalizeText } from '@/lib/format'
import { STAY_CATEGORIES, type StayCategory } from '@/lib/stayCategories'
import type { StaySearch, StaySearchResult } from '@/services/stays'
import { PriceRangeFilter } from './PriceRangeFilter'

type Props = {
  query: StaySearch
  priceBounds?: StaySearchResult['priceBounds']
  onChange: (patch: Partial<StaySearch>) => void
}

function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-navy-50 py-6 first:border-t-0 first:pt-0 last:pb-0">
      <legend className="float-left mb-4 w-full font-display text-base font-bold text-navy-700">{legend}</legend>
      <div className="clear-left">{children}</div>
    </fieldset>
  )
}

const optionClass =
  'flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-[0.9375rem] text-navy-600 transition-colors hover:bg-surface has-[:checked]:font-semibold has-[:checked]:text-navy-700'

// Filtres des résultats de séjours (CDC §5.2) : catégorie, lieu, prix, annulation gratuite.
// Les disponibilités sur la période sont filtrées via les dates de la barre de recherche.
export function StaysFilters({ query, priceBounds, onChange }: Props) {
  const { t } = useTranslation()
  const place = normalizeText(query.place)
  // Nom unique : les filtres peuvent être affichés deux fois (colonne et panneau mobile)
  const radioName = useId()

  const toggleCategory = (key: StayCategory) =>
    onChange({
      categories: query.categories.includes(key) ? query.categories.filter((c) => c !== key) : [...query.categories, key],
    })

  return (
    <div>
      <Group legend={t('staysPage.filters.category')}>
        <ul className="-mx-2 space-y-0.5">
          {STAY_CATEGORIES.map(({ key }) => (
            <li key={key}>
              <label className={optionClass}>
                <input
                  type="checkbox"
                  checked={query.categories.includes(key)}
                  onChange={() => toggleCategory(key)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="grid size-5 shrink-0 place-items-center rounded-md border-2 border-navy-200 text-[0.625rem] text-transparent transition-colors peer-checked:border-navy-700 peer-checked:bg-navy-700 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise-500"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                {t(`stays.categories.${key}`)}
              </label>
            </li>
          ))}
        </ul>
      </Group>

      <Group legend={t('staysPage.filters.destination')}>
        <ul className="-mx-2 space-y-0.5">
          {[{ slug: '', name: t('staysPage.filters.allDestinations') }, ...DESTINATIONS].map((destination) => (
            <li key={destination.slug}>
              <label className={optionClass}>
                <input
                  type="radio"
                  name={radioName}
                  checked={destination.slug ? place === normalizeText(destination.name) : !place}
                  onChange={() => onChange({ place: destination.slug ? destination.name : '' })}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="size-5 shrink-0 rounded-full border-2 border-navy-200 transition-all peer-checked:border-[0.375rem] peer-checked:border-navy-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise-500"
                />
                {destination.name}
              </label>
            </li>
          ))}
        </ul>
      </Group>

      {priceBounds && (
        <Group legend={t('staysPage.filters.price')}>
          <PriceRangeFilter
            bounds={priceBounds}
            min={query.priceMin}
            max={query.priceMax}
            onChange={(priceMin, priceMax) => onChange({ priceMin, priceMax })}
          />
        </Group>
      )}

      <Group legend={t('staysPage.filters.cancellation')}>
        <label className="flex cursor-pointer items-center justify-between gap-4 text-[0.9375rem] text-navy-600">
          {t('staysPage.filters.freeCancellation')}
          <input
            type="checkbox"
            role="switch"
            checked={query.freeCancellation}
            onChange={(e) => onChange({ freeCancellation: e.target.checked })}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={cn(
              'relative h-7 w-12 shrink-0 rounded-full bg-navy-100 transition-colors peer-checked:bg-turquoise-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise-500',
              'after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-200 peer-checked:after:translate-x-5',
            )}
          />
        </label>
      </Group>
    </div>
  )
}
