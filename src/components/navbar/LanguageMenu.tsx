import { faCheck, faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDismiss } from '@/hooks/useDismiss'
import { LANGUAGES } from '@/i18n'
import { cn } from '@/lib/cn'
import { popoverTransition, popoverVariants } from '@/lib/motion'

export function LanguageMenu({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const current = i18n.resolvedLanguage ?? 'fr'

  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${t('nav.language')} : ${t(`languages.${current}`)}`}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full px-2 py-2 text-[0.9375rem] font-semibold text-navy-700 transition-colors hover:text-navy-500"
      >
        <FontAwesomeIcon icon={faGlobe} className="text-[1.0625rem]" />
        <span className="uppercase">{current}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex">
          <FontAwesomeIcon icon={faChevronDown} className="text-[0.625rem]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={popoverTransition}
            className="absolute right-0 top-full z-50 mt-3 w-44 origin-top-right rounded-2xl bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(19,46,73,0.35)] ring-1 ring-navy-900/5"
          >
            {LANGUAGES.map((lng) => (
              <li key={lng}>
                <button
                  type="button"
                  lang={lng}
                  aria-current={lng === current}
                  onClick={() => {
                    i18n.changeLanguage(lng)
                    close()
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[0.9375rem] transition-colors hover:bg-surface',
                    lng === current ? 'font-semibold text-navy-700' : 'text-navy-500',
                  )}
                >
                  {t(`languages.${lng}`)}
                  {lng === current && <FontAwesomeIcon icon={faCheck} className="text-[0.8125rem] text-turquoise-500" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
