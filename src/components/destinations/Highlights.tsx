import { faLandmark, faLeaf, faUmbrellaBeach, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { fadeUp, stagger } from '@/lib/motion'

const ITEMS = [
  { key: 'beaches', icon: faUmbrellaBeach },
  { key: 'heritage', icon: faLandmark },
  { key: 'nature', icon: faLeaf },
  { key: 'culture', icon: faUsers },
]

// Les 4 atouts du Bénin, sous le carrousel des destinations
export function Highlights() {
  const { t } = useTranslation()

  return (
    <motion.ul
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-navy-100"
    >
      {ITEMS.map((item) => (
        <motion.li key={item.key} variants={fadeUp} className="flex items-center gap-4 lg:justify-center lg:px-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-navy-700 shadow-[0_8px_24px_-14px_rgba(19,46,73,0.35)] ring-1 ring-navy-50 sm:size-[4.5rem]">
            <FontAwesomeIcon icon={item.icon} className="text-xl sm:text-2xl" />
          </span>
          <p className="text-[0.9375rem] leading-snug text-navy-600 sm:text-lg">
            <span className="block font-semibold text-navy-700">{t(`destinations.highlights.${item.key}.title`)}</span>
            {t(`destinations.highlights.${item.key}.text`)}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  )
}
