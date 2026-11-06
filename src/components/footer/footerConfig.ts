import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faInstagram, faLinkedinIn, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBed, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '@/lib/routes'

type FooterLink = { label: string; to: string; icon?: IconDefinition }

export const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'footer.services.title',
    links: [
      { label: 'nav.accommodation', to: ROUTES.accommodation, icon: faBed },
      { label: 'nav.events', to: ROUTES.events, icon: faCalendarDays },
      { label: 'nav.longStay', to: ROUTES.rentals, icon: faHouse },
      { label: 'footer.services.other', to: ROUTES.services, icon: faTableCellsLarge },
    ],
  },
  {
    title: 'footer.info.title',
    links: [
      { label: 'footer.info.about', to: ROUTES.about },
      { label: 'footer.info.howItWorks', to: ROUTES.howItWorks },
      { label: 'footer.info.faq', to: ROUTES.faq },
      { label: 'footer.info.terms', to: ROUTES.terms },
      // Exigés en pied de page par le CDC §4.1
      { label: 'footer.info.cancellation', to: ROUTES.cancellation },
      { label: 'footer.info.privacy', to: ROUTES.privacy },
      { label: 'footer.info.legal', to: ROUTES.legal },
    ],
  },
  {
    title: 'footer.partners.title',
    links: [
      { label: 'nav.partner', to: ROUTES.partner },
      { label: 'footer.partners.space', to: ROUTES.partnerSpace },
      { label: 'footer.partners.pro', to: ROUTES.proSolutions },
    ],
  },
]

// ⚠️ Coordonnées reprises de la maquette : à confirmer par le client avant la mise en ligne
export const CONTACT = {
  city: 'Cotonou, Bénin',
  phone: '+229 01 23 45 67 89',
  email: 'contact@paradisdirect.bj',
}

// Liens des réseaux sociaux : à renseigner (une icône sans URL n'est pas cliquable)
export const SOCIAL_LINKS: { name: string; icon: IconDefinition; url: string }[] = [
  { name: 'Facebook', icon: faFacebookF, url: '' },
  { name: 'Instagram', icon: faInstagram, url: '' },
  { name: 'YouTube', icon: faYoutube, url: '' },
  { name: 'LinkedIn', icon: faLinkedinIn, url: '' },
  { name: 'TikTok', icon: faTiktok, url: '' },
]
