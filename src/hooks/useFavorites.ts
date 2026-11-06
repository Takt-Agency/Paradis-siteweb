import { useCallback, useSyncExternalStore } from 'react'

// Favoris mémorisés dans le navigateur, partagés entre tous les composants.
// À synchroniser avec le compte client quand l'API existera (fonction hors CDC v2.0).
const KEY = 'paradis-favoris'
const EMPTY: string[] = []
const listeners = new Set<() => void>()
let cache: string[] | null = null

function read(): string[] {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    cache = Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: string[]) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Stockage indisponible (navigation privée…) : les favoris restent valables pour la session
  }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY)

  const toggle = useCallback((slug: string) => {
    const current = read()
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug])
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  return { isFavorite, toggle }
}
