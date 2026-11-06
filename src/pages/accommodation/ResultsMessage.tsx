import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { fadeUp } from '@/lib/motion'

type Props = { icon: IconDefinition; title: string; text: string; action: string; onAction: () => void }

// Message à la place des résultats : aucun résultat (CDC §5.4) ou erreur de chargement
export function ResultsMessage({ icon, title, text, action, onAction }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-navy-50 sm:py-20"
    >
      <span className="grid size-20 place-items-center rounded-full bg-brand-50 text-3xl text-brand-500">
        <FontAwesomeIcon icon={icon} />
      </span>
      <h2 className="mt-6 max-w-md font-display text-2xl font-bold text-navy-700">{title}</h2>
      <p className="mt-3 max-w-md text-navy-500">{text}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-8 rounded-full bg-navy-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-600"
      >
        {action}
      </button>
    </motion.div>
  )
}
