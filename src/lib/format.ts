// Montants en FCFA : séparateur de milliers selon la langue (45 000 / 45,000)
export const formatAmount = (amount: number, lang?: string) => new Intl.NumberFormat(lang).format(amount)

// Comparaison de textes sans accents ni majuscules (« ganvie » trouve « Ganvié »)
export const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
