import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MAX_GUESTS, MIN_GUESTS } from '@/components/booking-search/fields/GuestsField'
import { categoryFromSlug, categorySlug, type StayCategory } from '@/lib/stayCategories'
import type { StaySearch, StaySort } from '@/services/stays'

// Valeurs de tri dans l'URL (en français, comme les autres paramètres)
const SORT_SLUGS: Record<StaySort, string> = {
  recommended: 'pertinence',
  'price-asc': 'prix-croissant',
  'price-desc': 'prix-decroissant',
  rating: 'note',
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const positiveInt = (value: string | null) => {
  const n = Number(value)
  return value && Number.isInteger(n) && n > 0 ? n : undefined
}

function parse(params: URLSearchParams): StaySearch {
  const checkIn = params.get('arrivee') ?? ''
  const checkOut = params.get('depart') ?? ''
  const sort = (Object.keys(SORT_SLUGS) as StaySort[]).find((key) => SORT_SLUGS[key] === params.get('tri'))
  const guests = positiveInt(params.get('voyageurs')) ?? MIN_GUESTS
  const categories = (params.get('categorie') ?? '')
    .split(',')
    .map(categoryFromSlug)
    .filter((key): key is StayCategory => Boolean(key))

  return {
    place: params.get('lieu') ?? '',
    // Une période n'est retenue que complète et dans le bon ordre
    ...(ISO_DATE.test(checkIn) && ISO_DATE.test(checkOut) && checkIn < checkOut ? { checkIn, checkOut } : {}),
    guests: Math.min(guests, MAX_GUESTS),
    categories: [...new Set(categories)],
    priceMin: positiveInt(params.get('prixMin')),
    priceMax: positiveInt(params.get('prixMax')),
    freeCancellation: params.get('annulation') === 'gratuite',
    sort: sort ?? 'recommended',
    page: positiveInt(params.get('page')) ?? 1,
  }
}

function serialize(query: StaySearch) {
  const entries: [string, string | undefined][] = [
    ['lieu', query.place.trim() || undefined],
    ['arrivee', query.checkIn],
    ['depart', query.checkOut],
    ['voyageurs', query.guests > MIN_GUESTS ? String(query.guests) : undefined],
    ['categorie', query.categories.map(categorySlug).join(',') || undefined],
    ['prixMin', query.priceMin?.toString()],
    ['prixMax', query.priceMax?.toString()],
    ['annulation', query.freeCancellation ? 'gratuite' : undefined],
    ['tri', query.sort === 'recommended' ? undefined : SORT_SLUGS[query.sort]],
    ['page', query.page > 1 ? String(query.page) : undefined],
  ]
  return new URLSearchParams(entries.filter((entry): entry is [string, string] => Boolean(entry[1])))
}

/** Critères et filtres de la recherche, conservés dans l'URL (CDC §5.4) */
export function useStaySearchParams() {
  const [params, setParams] = useSearchParams()
  const query = useMemo(() => parse(params), [params])

  // Tout changement de critère ramène à la première page, sauf un changement de page
  const update = useCallback(
    (patch: Partial<StaySearch>) => setParams((prev) => serialize({ ...parse(prev), page: 1, ...patch })),
    [setParams],
  )

  // Retire les filtres de la colonne latérale en gardant dates et voyageurs
  const clearFilters = useCallback(
    () =>
      update({ place: '', categories: [], priceMin: undefined, priceMax: undefined, freeCancellation: false }),
    [update],
  )

  const resetAll = useCallback(() => setParams(new URLSearchParams()), [setParams])

  return { query, update, clearFilters, resetAll }
}
