import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '@/lib/format'

type Props = {
  bounds: { min: number; max: number }
  min?: number
  max?: number
  /** `undefined` = pas de limite de ce côté */
  onChange: (min?: number, max?: number) => void
}

const STEP = 1000

// Curseur double pour le prix par nuit. La recherche n'est relancée qu'une fois le curseur relâché (anti-rebond).
export function PriceRangeFilter({ bounds, min, max, onChange }: Props) {
  const { t, i18n } = useTranslation()
  const floor = Math.floor(bounds.min / STEP) * STEP
  const ceil = Math.ceil(bounds.max / STEP) * STEP
  const timer = useRef<number | undefined>(undefined)

  const [low, setLow] = useState(min ?? floor)
  const [high, setHigh] = useState(max ?? ceil)

  // Resynchronise le curseur quand le filtre change ailleurs (puce retirée, réinitialisation)
  const [synced, setSynced] = useState({ min, max })
  if (synced.min !== min || synced.max !== max) {
    setSynced({ min, max })
    setLow(min ?? floor)
    setHigh(max ?? ceil)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const commit = (nextLow: number, nextHigh: number) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(
      () => onChange(nextLow > floor ? nextLow : undefined, nextHigh < ceil ? nextHigh : undefined),
      400,
    )
  }

  if (ceil - floor < STEP) return null

  const percent = (value: number) => ((value - floor) / (ceil - floor)) * 100
  const format = (value: number) => `${formatAmount(value, i18n.resolvedLanguage)} FCFA`

  return (
    <div>
      <p aria-live="polite" className="text-[0.9375rem] font-semibold text-navy-700">
        {format(low)} – {format(high)}
      </p>

      <div className="relative mt-4 h-6">
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-navy-50" />
        <span
          aria-hidden
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-500"
          style={{ left: `${percent(low)}%`, right: `${100 - percent(high)}%` }}
        />
        <input
          type="range"
          aria-label={t('staysPage.filters.priceMin')}
          aria-valuetext={format(low)}
          min={floor}
          max={ceil}
          step={STEP}
          value={low}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), high - STEP)
            setLow(value)
            commit(value, high)
          }}
          // La poignée basse passe devant quand elle rejoint le haut de l'échelle
          className="range-thumb absolute inset-0 h-full w-full"
          style={{ zIndex: low > floor + (ceil - floor) / 2 ? 2 : 1 }}
        />
        <input
          type="range"
          aria-label={t('staysPage.filters.priceMax')}
          aria-valuetext={format(high)}
          min={floor}
          max={ceil}
          step={STEP}
          value={high}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), low + STEP)
            setHigh(value)
            commit(low, value)
          }}
          className="range-thumb absolute inset-0 h-full w-full"
        />
      </div>

      <div aria-hidden className="mt-2 flex justify-between text-xs text-navy-400">
        <span>{format(floor)}</span>
        <span>{format(ceil)}</span>
      </div>
    </div>
  )
}
