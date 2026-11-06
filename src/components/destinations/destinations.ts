import cotonou from '@/assets/destinations/cotonou.webp'
import ganvie from '@/assets/destinations/ganvie.webp'
import grandPopo from '@/assets/destinations/grand-popo.webp'
import ouidah from '@/assets/destinations/ouidah.webp'

export type Destination = { slug: string; name: string; image: string }

// Destinations mises en avant (maquette validée) — à terme gérées par l'administrateur (lieux, CDC §4.1)
// Les photos actuelles sont extraites de la maquette : à remplacer par les photos définitives.
export const DESTINATIONS: Destination[] = [
  { slug: 'cotonou', name: 'Cotonou', image: cotonou },
  { slug: 'grand-popo', name: 'Grand-Popo', image: grandPopo },
  { slug: 'ouidah', name: 'Ouidah', image: ouidah },
  { slug: 'ganvie', name: 'Ganvié', image: ganvie },
]
