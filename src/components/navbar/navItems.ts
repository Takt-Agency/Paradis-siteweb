import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faBuilding, faLifeRing } from '@fortawesome/free-regular-svg-icons'
import { faBed, faDoorOpen, faHeadset, faHotel, faHouseChimney, faKey } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '@/lib/routes'

export type NavMenuEntry = { label: string; hint?: string; to: string; icon: IconDefinition }

export type NavItem =
  | { kind: 'link'; label: string; to: string }
  | { kind: 'menu'; id: string; label: string; items: NavMenuEntry[] }

// Catégories citées au CDC §1.1 — la liste définitive sera gérée par l'administrateur
const byCategory = (slug: string) => `${ROUTES.accommodation}?categorie=${slug}`

export const NAV_ITEMS: NavItem[] = [
  {
    kind: 'menu',
    id: 'accommodation',
    label: 'nav.accommodation',
    items: [
      { label: 'nav.accommodationMenu.all', hint: 'nav.accommodationMenu.allHint', to: ROUTES.accommodation, icon: faBed },
      { label: 'nav.accommodationMenu.hotels', to: byCategory('hotel'), icon: faHotel },
      { label: 'nav.accommodationMenu.residences', to: byCategory('residence'), icon: faBuilding },
      { label: 'nav.accommodationMenu.guesthouses', to: byCategory('maison-hotes'), icon: faHouseChimney },
      { label: 'nav.accommodationMenu.apartments', to: byCategory('appartement'), icon: faDoorOpen },
    ],
  },
  { kind: 'link', label: 'nav.events', to: ROUTES.events },
  { kind: 'link', label: 'nav.longStay', to: ROUTES.rentals },
  {
    kind: 'menu',
    id: 'services',
    label: 'nav.services',
    items: [
      { label: 'nav.servicesMenu.assistant', hint: 'nav.servicesMenu.assistantHint', to: ROUTES.assistance, icon: faHeadset },
      { label: 'nav.servicesMenu.agency', hint: 'nav.servicesMenu.agencyHint', to: ROUTES.agency, icon: faKey },
      { label: 'nav.servicesMenu.claims', hint: 'nav.servicesMenu.claimsHint', to: ROUTES.claims, icon: faLifeRing },
    ],
  },
]

export const isMenuActive = (items: NavMenuEntry[], pathname: string) =>
  items.some((entry) => pathname === entry.to.split('?')[0])

// Soulignement orange animé au survol / sur la page active
export const navUnderline =
  'relative after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300 after:ease-out-soft'
