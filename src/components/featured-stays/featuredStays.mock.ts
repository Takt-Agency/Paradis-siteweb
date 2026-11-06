import ecolodgeOuidah from '@/assets/stays/ecolodge-ouidah.webp'
import hotelCotonou from '@/assets/stays/hotel-azalai-cotonou.webp'
import residencePalmiers from '@/assets/stays/residence-les-palmiers.webp'
import villaLittoral from '@/assets/stays/villa-du-littoral.webp'

export type StayCategory = 'hotel' | 'guesthouse' | 'apartment' | 'ecolodge'

export type FeaturedStay = {
  slug: string
  name: string
  category: StayCategory
  city: string
  image: string
  pricePerNight: number
  /** Note sur 5 et nombre d'avis — hors CDC v2.0 (module d'avis à prévoir) */
  rating?: number
  reviews?: number
}

// ⚠️ DONNÉES DE DÉMONSTRATION reprises de la maquette (noms, prix, notes, photos).
// À remplacer par les hébergements « mis en avant » par l'administrateur (CDC §4.1), via l'API.
export const FEATURED_STAYS: FeaturedStay[] = [
  {
    slug: 'hotel-azalai-cotonou',
    name: 'Hôtel Azalaï Cotonou',
    category: 'hotel',
    city: 'Cotonou',
    image: hotelCotonou,
    pricePerNight: 45000,
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
    rating: 4.5,
    reviews: 92,
  },
]
