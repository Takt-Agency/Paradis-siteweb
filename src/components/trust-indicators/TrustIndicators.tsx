import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { faHeadset, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { fadeUp } from '@/lib/motion'

const ITEMS = [
  { label: 'trust.secure', icon: faShieldHalved },
  { label: 'trust.support', icon: faHeadset },
  { label: 'trust.payment', icon: faCreditCard },
]

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

export function TrustIndicators({ className }: { className?: string }) {
  const { t } = useTranslation()

  return (
    // Mobile : 3 colonnes sur une seule ligne (icône au-dessus du texte) ; à partir de md : pastilles en ligne
    <motion.ul variants={list} className={cn('grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-3', className)}>
      {ITEMS.map((item) => (
        <motion.li
          key={item.label}
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-white/75 px-2 py-2.5 text-center text-xs font-medium leading-tight text-navy-700 ring-1 ring-white/60 backdrop-blur-md sm:text-sm md:flex-row md:gap-3 md:rounded-full md:px-4 md:text-[0.9375rem]"
        >
          <FontAwesomeIcon icon={item.icon} className="text-[1.0625rem]" />
          {t(item.label)}
        </motion.li>
      ))}
    </motion.ul>
  )
}
