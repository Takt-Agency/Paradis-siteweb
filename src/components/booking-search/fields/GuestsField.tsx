import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { PopoverField } from './PopoverField'

export const MIN_GUESTS = 1
export const MAX_GUESTS = 20

type Props = { icon: IconDefinition; value: number; onChange: (value: number) => void }

const stepClass =
  'grid size-10 place-items-center rounded-full border border-navy-100 text-navy-700 transition-colors hover:border-navy-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-navy-100'

export function GuestsField({ icon, value, onChange }: Props) {
  const { t } = useTranslation()
  const label = t('search.guest', { count: value })

  return (
    <PopoverField icon={icon} label={t('search.guests')} value={label} placeholder={label} align="end" panelClassName="lg:w-80">
      {() => (
        <div className="flex items-center justify-between gap-6 px-1 py-1">
          <div>
            <p className="font-semibold text-navy-700">{t('search.guests')}</p>
            <p className="text-sm text-navy-400">{t('search.guestsHint')}</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              aria-label={t('search.decrease')}
              disabled={value <= MIN_GUESTS}
              onClick={() => onChange(Math.max(MIN_GUESTS, value - 1))}
              className={stepClass}
            >
              <FontAwesomeIcon icon={faMinus} className="text-xs" />
            </motion.button>
            <output aria-live="polite" className="w-6 text-center text-lg font-semibold tabular-nums text-navy-700">
              {value}
            </output>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              aria-label={t('search.increase')}
              disabled={value >= MAX_GUESTS}
              onClick={() => onChange(Math.min(MAX_GUESTS, value + 1))}
              className={stepClass}
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
            </motion.button>
          </div>
        </div>
      )}
    </PopoverField>
  )
}
