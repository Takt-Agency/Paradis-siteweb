import ecolodgeOuidah from '@/assets/stays/ecolodge-ouidah.webp'
import hotelCotonou from '@/assets/stays/hotel-azalai-cotonou.webp'
import residencePalmiers from '@/assets/stays/residence-les-palmiers.webp'
import villaLittoral from '@/assets/stays/villa-du-littoral.webp'
import type { StayCategory } from '@/lib/stayCategories'

export type FeaturedStay = {
  slug: string
  name: string
  category: StayCategory
  city: string
  image: string
  pricePerNight: number
  /** Description courte affichée dans les résultats (CDC §5.3) */
  description: { fr: string; en: string }
  /** Filtre « annulation gratuite » (CDC §5.2) */
  freeCancellation: boolean
  /** Note sur 5 et nombre d'avis — hors CDC v2.0 (module d'avis à prévoir) */
  rating?: number
  reviews?: number
}

// ⚠️ DONNÉES DE DÉMONSTRATION reprises de la maquette (noms, prix, notes, photos).
// Descriptions et conditions d'annulation : textes provisoires.
// À remplacer par les données de l'API (hébergements validés par l'administrateur).
export const FEATURED_STAYS: FeaturedStay[] = [
  {
    slug: 'hotel-azalai-cotonou',
    name: 'Hôtel Azalaï Cotonou',
    category: 'hotel',
    city: 'Cotonou',
    image: hotelCotonou,
    pricePerNight: 45000,
    description: {
      fr: 'Hôtel au cœur de Cotonou, pratique pour les séjours d’affaires comme pour découvrir la ville.',
      en: 'Hotel in the heart of Cotonou, convenient for business trips as well as city breaks.',
    },
    freeCancellation: true,
    rating: 4,
    reviews: 128,
  },
  {
    slug: 'villa-du-littoral',
    name: 'Villa du Littoral',
    category: 'guesthouse',
    city: 'Grand-Popo',
    image: villaLittoral,
    pricePerNight: 38000,
    description: {
      fr: 'Maison d’hôtes au calme près de l’océan, pour se reposer en famille ou entre amis.',
      en: 'Quiet guesthouse near the ocean, to unwind with family or friends.',
    },
    freeCancellation: false,
    rating: 5,
    reviews: 74,
  },
  {
    slug: 'residence-les-palmiers',
    name: 'Résidence Les Palmiers',
    category: 'apartment',
    city: 'Cotonou',
    image: residencePalmiers,
    pricePerNight: 42000,
    description: {
      fr: 'Appartements équipés, adaptés aux séjours de quelques nuits comme aux séjours prolongés.',
      en: 'Fully equipped apartments, suited to short stays as well as longer ones.',
    },
    freeCancellation: true,
    rating: 4,
    reviews: 56,
  },
  {
    slug: 'ecolodge-ouidah',
    name: 'Écolodge Ouidah',
    category: 'ecolodge',
    city: 'Ouidah',
    image: ecolodgeOuidah,
    pricePerNight: 43000,
    description: {
      fr: 'Écolodge au cœur de la nature, idéal pour découvrir le patrimoine de Ouidah.',
      en: 'Ecolodge surrounded by nature, ideal for exploring the heritage of Ouidah.',
    },
    freeCancellation: false,
    rating: 4.5,
    reviews: 92,
  },
]
