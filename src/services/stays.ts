import { FEATURED_STAYS } from '@/components/featured-stays/featuredStays.mock'
import { api } from '@/lib/api'
import { normalizeText } from '@/lib/format'
import type { StayCategory } from '@/lib/stayCategories'

export type StaySort = 'recommended' | 'price-asc' | 'price-desc' | 'rating'

/** Critères (CDC §5.1) et filtres (CDC §5.2) de la recherche de séjours */
export type StaySearch = {
  place: string
  checkIn?: string
  checkOut?: string
  guests: number
  categories: StayCategory[]
  priceMin?: number
  priceMax?: number
  freeCancellation: boolean
  sort: StaySort
  page: number
}

/** Un résultat de recherche (CDC §5.3) */
export type StaySummary = {
  slug: string
  name: string
  category: StayCategory
  city: string
  image: string
  description: string
  pricePerNight: number
  freeCancellation: boolean
  /** Disponible sur la période recherchée — fourni par l'API quand des dates sont saisies */
  available?: boolean
  rating?: number
  reviews?: number
}

export type StaySearchResult = {
  items: StaySummary[]
  total: number
  page: number
  pageCount: number
  /** Prix min / max de l'offre, pour borner le filtre de prix */
  priceBounds: { min: number; max: number }
}

export const STAYS_PAGE_SIZE = 6

// Tant que le back-end n'existe pas, VITE_DEMO_DATA=true sert les données de démonstration
const DEMO = import.meta.env.VITE_DEMO_DATA === 'true'

export async function searchStays(query: StaySearch, lang: string): Promise<StaySearchResult> {
  if (DEMO) return searchDemo(query, lang)

  const { data } = await api.get<StaySearchResult>('/hebergements', {
    params: {
      place: query.place || undefined,
      checkIn: query.checkIn,
      checkOut: query.checkOut,
      guests: query.guests,
      categories: query.categories.join(',') || undefined,
      priceMin: query.priceMin,
      priceMax: query.priceMax,
      freeCancellation: query.freeCancellation || undefined,
      sort: query.sort,
      page: query.page,
      pageSize: STAYS_PAGE_SIZE,
    },
  })
  return data
}

// Reproduit côté navigateur le filtrage, le tri et la pagination attendus de l'API.
// Les disponibilités et la capacité ne sont pas simulées : seule l'API pourra les vérifier.
async function searchDemo(query: StaySearch, lang: string): Promise<StaySearchResult> {
  await new Promise((resolve) => setTimeout(resolve, 250))

  const all: StaySummary[] = FEATURED_STAYS.map(({ description, ...stay }) => ({
    ...stay,
    description: lang === 'en' ? description.en : description.fr,
  }))
  const prices = all.map((stay) => stay.pricePerNight)
  const place = normalizeText(query.place)

  const filtered = all.filter(
    (stay) =>
      (!place || normalizeText(stay.city).includes(place) || normalizeText(stay.name).includes(place)) &&
      (!query.categories.length || query.categories.includes(stay.category)) &&
      (query.priceMin === undefined || stay.pricePerNight >= query.priceMin) &&
      (query.priceMax === undefined || stay.pricePerNight <= query.priceMax) &&
      (!query.freeCancellation || stay.freeCancellation),
  )

  if (query.sort === 'price-asc') filtered.sort((a, b) => a.pricePerNight - b.pricePerNight)
  if (query.sort === 'price-desc') filtered.sort((a, b) => b.pricePerNight - a.pricePerNight)
  if (query.sort === 'rating') filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))

  const pageCount = Math.max(1, Math.ceil(filtered.length / STAYS_PAGE_SIZE))
  const page = Math.min(query.page, pageCount)

  return {
    items: filtered.slice((page - 1) * STAYS_PAGE_SIZE, page * STAYS_PAGE_SIZE),
    total: filtered.length,
    page,
    pageCount,
    priceBounds: { min: Math.min(...prices), max: Math.max(...prices) },
  }
}
