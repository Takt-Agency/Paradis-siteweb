import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { useDismiss } from '@/hooks/useDismiss'
import { cn } from '@/lib/cn'
import { popoverTransition, popoverVariants } from '@/lib/motion'
import { FieldContent, FieldValue, fieldShellClass } from './FieldShell'

type Props = {
  icon: IconDefinition
  label: string
  value?: string
  placeholder: string
  /** Position du panneau sur desktop */
  align?: 'start' | 'center' | 'end'
  panelClassName?: string
  children: (close: () => void) => ReactNode
}

const ALIGN = {
  start: 'lg:left-0',
  center: 'lg:left-1/2 lg:-translate-x-1/2',
  end: 'lg:right-0',
}

// Champ de recherche qui ouvre un panneau (calendrier, voyageurs, catégorie…)
export function PopoverField({ icon, label, value, placeholder, align = 'start', panelClassName, children }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  // Amène le panneau entièrement dans la vue s'il dépasse en bas de l'écran
  useEffect(() => {
    if (open) panelRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [open])

  return (
    <div ref={ref} className="relative min-w-0 flex-1">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(fieldShellClass, open && 'bg-surface')}
      >
        <FieldContent icon={icon} label={label}>
          <FieldValue value={value} placeholder={placeholder} />
        </FieldContent>
      </button>

      <AnimatePresence>
        {open && (
          <div className={cn('absolute inset-x-0 top-full z-40 pt-3 lg:inset-x-auto lg:w-max', ALIGN[align])}>
            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-label={label}
              variants={popoverVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={popoverTransition}
              className={cn(
                'origin-top rounded-2xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(19,46,73,0.4)] ring-1 ring-navy-900/5',
                panelClassName,
              )}
            >
              {children(close)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
