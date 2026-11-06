import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useDismiss } from '@/hooks/useDismiss'
import { cn } from '@/lib/cn'
import { popoverTransition, popoverVariants } from '@/lib/motion'
import { isMenuActive, navUnderline, type NavMenuEntry } from './navItems'

type Props = { label: string; items: NavMenuEntry[] }

// Menu déroulant desktop : s'ouvre au survol ou au clic, accessible au clavier
export function NavDropdown({ label, items }: Props) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const panelId = useId()

  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const onPointerEnter = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const onPointerLeave = () => {
    closeTimer.current = window.setTimeout(close, 150)
  }
  const onBlur = (e: FocusEvent) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) close()
  }

  const active = isMenuActive(items, pathname)
  const hasHints = items.some((entry) => entry.hint)

  return (
    <li ref={ref} className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          navUnderline,
          'flex items-center gap-2 py-2 text-[0.9375rem] font-medium text-navy-700 2xl:text-base',
          active || open ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
        )}
      >
        {t(label)}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex">
          <FontAwesomeIcon icon={faChevronDown} className="text-[0.6875rem]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5">
            <motion.ul
              id={panelId}
              variants={popoverVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={popoverTransition}
              className={cn(
                // whitespace-normal : annule le nowrap hérité de la barre de navigation
                'origin-top whitespace-normal rounded-2xl bg-white p-2 shadow-[0_20px_50px_-20px_rgba(19,46,73,0.35)] ring-1 ring-navy-900/5',
                hasHints ? 'w-[22rem]' : 'w-64',
              )}
            >
              {items.map((entry) => (
                <li key={entry.to}>
                  <Link
                    to={entry.to}
                    onClick={close}
                    className="group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-navy-700 transition-colors group-hover:bg-white group-hover:text-turquoise-600">
                      <FontAwesomeIcon icon={entry.icon} className="text-[0.9375rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-semibold text-navy-700">{t(entry.label)}</span>
                      {entry.hint && <span className="block text-[0.8125rem] leading-snug text-navy-400">{t(entry.hint)}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
        )}
      </AnimatePresence>
    </li>
  )
}
