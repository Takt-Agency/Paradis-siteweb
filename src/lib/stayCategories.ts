// Catégories d'hébergement citées au CDC §1.1 — la liste définitive sera gérée par l'administrateur.
// `slug` : valeur utilisée dans l'URL des résultats (?categorie=…)
export const STAY_CATEGORIES = [
  { key: 'hotel', slug: 'hotel' },
  { key: 'residence', slug: 'residence' },
  { key: 'guesthouse', slug: 'maison-hotes' },
  { key: 'apartment', slug: 'appartement' },
  { key: 'ecolodge', slug: 'ecolodge' },
] as const

export type StayCategory = (typeof STAY_CATEGORIES)[number]['key']

export const categoryFromSlug = (slug: string) => STAY_CATEGORIES.find((c) => c.slug === slug)?.key

export const categorySlug = (key: StayCategory) => STAY_CATEGORIES.find((c) => c.key === key)!.slug
