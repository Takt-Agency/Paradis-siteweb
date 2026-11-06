import appartement from '@/assets/rentals/appartement-meuble-cotonou.webp'
import maison from '@/assets/rentals/maison-jardin-calavi.webp'
import residence from '@/assets/rentals/residence-securisee-akpakpa.webp'

export type RentalCategory = 'apartment' | 'house' | 'residence'

export type FeaturedRental = {
  slug: string
  title: string
  category: RentalCategory
  location: string
  image: string
  monthlyRent: number
}

// ⚠️ DONNÉES DE DÉMONSTRATION reprises de la maquette (titres, loyers, photos).
// À remplacer par les annonces publiées par les bailleurs / l'agence Paradis (CDC §12.1), via l'API.
export const FEATURED_RENTALS: FeaturedRental[] = [
  {
    slug: 'appartement-meuble-cotonou',
    title: 'Appartement meublé',
    category: 'apartment',
    location: 'Cotonou',
    image: appartement,
    monthlyRent: 350000,
  },
  {
    slug: 'maison-jardin-calavi',
    title: 'Maison avec jardin',
    category: 'house',
    location: 'Calavi',
    image: maison,
    monthlyRent: 500000,
  },
  {
    slug: 'residence-securisee-akpakpa',
    title: 'Résidence sécurisée',
    category: 'residence',
    location: 'Akpakpa',
    image: residence,
    monthlyRent: 400000,
  },
]
