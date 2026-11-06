import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { cn } from '@/lib/cn'
import { EASE_OUT } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { NAV_ITEMS } from './navItems'

type Props = { open: boolean; onClose: () => void; id: string }

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.35, ease: EASE_OUT },
}

// Menu mobile / tablette (< 1280px)
export function MobileMenu({ open, onClose, id }: Props) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div id={id} {...collapse} className="overflow-hidden border-t border-navy-50 bg-white xl:hidden">
          <nav
            aria-label={t('nav.openMenu')}
            className="page-container max-h-[calc(100dvh-4.75rem)] overflow-y-auto pb-8 pt-3"
          >
            <ul className="divide-y divide-navy-50">
              {NAV_ITEMS.map((item) =>
                item.kind === 'link' ? (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn('block py-4 text-[1.0625rem] font-medium', isActive ? 'text-brand-500' : 'text-navy-700')
                      }
                    >
                      {t(item.label)}
                    </NavLink>
                  </li>
                ) : (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-expanded={expanded === item.id}
                      onClick={() => setExpanded((v) => (v === item.id ? null : item.id))}
                      className="flex w-full items-center justify-between py-4 text-[1.0625rem] font-medium text-navy-700"
                    >
                      {t(item.label)}
                      <motion.span animate={{ rotate: expanded === item.id ? 180 : 0 }} className="flex">
                        <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.id && (
                        <motion.ul {...collapse} className="overflow-hidden">
                          {item.items.map((entry) => (
                            <li key={entry.to}>
                              <Link
                                to={entry.to}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-navy-600 hover:bg-surface"
                              >
                                <FontAwesomeIcon icon={entry.icon} className="w-5 text-[0.9375rem] text-navy-400" />
                                {t(entry.label)}
                              </Link>
                            </li>
                          ))}
                          <li aria-hidden className="h-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to={ROUTES.login}
                onClick={onClose}
                className="flex items-center justify-center gap-2.5 rounded-xl border border-navy-100 py-3 font-semibold text-navy-700"
              >
                <FontAwesomeIcon icon={faUser} />
                {t('nav.login')}
              </Link>
              <Link
                to={ROUTES.partner}
                onClick={onClose}
                className="rounded-xl bg-navy-700 py-3 text-center font-semibold text-white md:hidden"
              >
                {t('nav.partner')}
              </Link>
              <LanguageSwitcher className="mt-2 self-center" />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
