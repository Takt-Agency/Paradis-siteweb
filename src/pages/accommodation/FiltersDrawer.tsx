import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE_OUT } from '@/lib/motion'

type Props = {
  open: boolean
  onClose: () => void
  onReset: () => void
  canReset: boolean
  total?: number
  children: ReactNode
}

// Panneau de filtres mobile / tablette (< 1024px) : s'ouvre depuis le bas de l'écran
export function FiltersDrawer({ open, onClose, onReset, canReset, total, children }: Props) {
  const { t } = useTranslation()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/50 backdrop-blur-[2px]"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-drawer-title"
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl bg-white outline-none"
          >
            <div className="flex items-center justify-between gap-4 border-b border-navy-50 px-5 py-4 sm:px-8">
              <h2 id="filters-drawer-title" className="font-display text-xl font-bold text-navy-700">
                {t('staysPage.filters.title')}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('staysPage.filters.close')}
                className="grid size-10 place-items-center rounded-full text-navy-700 hover:bg-surface"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">{children}</div>

            <div className="flex items-center gap-3 border-t border-navy-50 px-5 py-4 sm:px-8">
              <button
                type="button"
                onClick={onReset}
                disabled={!canReset}
                className="rounded-xl px-4 py-3 font-semibold text-navy-700 underline-offset-4 hover:underline disabled:opacity-40"
              >
                {t('staysPage.filters.reset')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-navy-700 py-3.5 font-semibold text-white transition-colors hover:bg-navy-600"
              >
                {total === undefined ? t('staysPage.filters.showResults') : t('staysPage.filters.show', { count: total })}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
