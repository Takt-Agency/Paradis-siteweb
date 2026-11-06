import jazz from '@/assets/events/benin-jazz-festival.webp'
import masks from '@/assets/events/festival-masques-zangbeto.webp'
import crafts from '@/assets/events/foire-internationale-artisanat.webp'
import marathon from '@/assets/events/marathon-international-cotonou.webp'

export type EventCategory = 'culture' | 'music' | 'sport' | 'crafts'

export type FeaturedEvent = {
  slug: string
  title: string
  category: EventCategory
  city: string
  image: string
  /** Dates au format AAAA-MM-JJ (fin facultative pour un événement d'un jour) */
  start: string
  end?: string
}

// ⚠️ DONNÉES DE DÉMONSTRATION reprises de la maquette (titres, dates, photos).
// À remplacer par les événements publiés et mis en avant par l'administrateur (CDC §11.5), via l'API.
export const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    slug: 'festival-masques-zangbeto',
    title: 'Festival des Masques Zangbeto',
    category: 'culture',
    city: 'Ouidah',
    image: masks,
    start: '2026-11-15',
    end: '2026-11-17',
  },
  {
    slug: 'benin-jazz-festival',
    title: 'Bénin Jazz Festival',
    category: 'music',
    city: 'Cotonou',
    image: jazz,
    start: '2026-12-05',
    end: '2026-12-07',
  },
  {
    slug: 'marathon-international-cotonou',
    title: 'Marathon International de Cotonou',
    category: 'sport',
    city: 'Cotonou',
    image: marathon,
    start: '2026-12-21',
  },
  {
    slug: 'foire-internationale-artisanat',
    title: "Foire Internationale de l'Artisanat",
    category: 'crafts',
    city: 'Cotonou',
    image: crafts,
    start: '2027-01-10',
    end: '2027-01-14',
  },
]

// « 2026-11-15 » → date locale à minuit (évite le décalage UTC de new Date('2026-11-15'))
export const parseDay = (value: string) => {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}
