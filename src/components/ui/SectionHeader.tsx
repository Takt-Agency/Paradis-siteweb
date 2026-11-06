import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { fadeIn, fadeUp, stagger } from '@/lib/motion'
import { Eyebrow } from './Eyebrow'

type Props = {
  id: string
  eyebrow: string
  title: ReactNode
  subtitle: string
  action?: ReactNode
  /** Textes clairs pour une section sur fond sombre */
  dark?: boolean
}

// En-tête commun des sections de l'accueil : sur-titre, titre, sous-titre et action à droite
export function SectionHeader({ id, eyebrow, title, subtitle, action, dark = false }: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="min-w-0">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <motion.h2
          id={id}
          variants={fadeUp}
          className={cn(
            'mt-5 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em] [word-spacing:0.08em]',
            dark ? 'text-white' : 'text-navy-700',
          )}
        >
          {title}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className={cn('mt-4 max-w-4xl text-lg leading-relaxed xl:text-xl', dark ? 'text-navy-100' : 'text-navy-600')}
        >
          {subtitle}
        </motion.p>
      </div>
      {action && (
        <motion.div variants={fadeIn} className="shrink-0">
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}
