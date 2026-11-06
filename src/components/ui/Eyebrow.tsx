import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { fadeIn } from '@/lib/motion'

type Props = { children: ReactNode; className?: string; dark?: boolean }

// Sur-titre de section : trait orange + texte en capitales espacées
export function Eyebrow({ children, className, dark = false }: Props) {
  return (
    <motion.p
      variants={fadeIn}
      className={cn(
        'flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm',
        dark ? 'text-white' : 'text-navy-700',
        className,
      )}
    >
      <span aria-hidden className="h-0.5 w-9 rounded-full bg-brand-500" />
      {children}
    </motion.p>
  )
}
