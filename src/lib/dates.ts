export const startOfToday = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase() + text.slice(1)

// Badge de date d'événement : { days: '15 – 17', month: 'Nov.' }, sur un ou plusieurs mois
export function formatEventDates(start: Date, end: Date | undefined, lang: string) {
  const day = (d: Date) => String(d.getDate()).padStart(2, '0')
  const month = (d: Date) => capitalize(new Intl.DateTimeFormat(lang, { month: 'short' }).format(d))
  const sameDay = !end || end.toDateString() === start.toDateString()
  if (sameDay) return { days: day(start), month: month(start) }
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  return {
    days: `${day(start)} – ${day(end)}`,
    month: sameMonth ? month(start) : `${month(start)} – ${month(end)}`,
  }
}

// Version complète pour les lecteurs d'écran : « 15–17 novembre 2026 »
export function formatEventDatesLong(start: Date, end: Date | undefined, lang: string) {
  const format = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' })
  return end && end.toDateString() !== start.toDateString() ? format.formatRange(start, end) : format.format(start)
}

// « 12 nov. » ; l'année n'est ajoutée que si elle diffère de l'année en cours
export function formatShortDate(date: Date, lang: string) {
  const sameYear = date.getFullYear() === new Date().getFullYear()
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric' }).format(date)
}
