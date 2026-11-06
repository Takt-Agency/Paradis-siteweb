import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import logo from '@/assets/logo-color.png'
import { cn } from '@/lib/cn'
import { EASE_OUT } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { LanguageMenu } from './LanguageMenu'
import { MobileMenu } from './MobileMenu'
import { NavDropdown } from './NavDropdown'
import { NAV_ITEMS, navUnderline } from './navItems'

export function Navbar() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuId = useId()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  // Bloque le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled || mobileOpen ? 'shadow-[0_12px_32px_-20px_rgba(19,46,73,0.4)]' : 'shadow-none',
      )}
    >
      <div className="page-container flex h-[4.75rem] items-center justify-between gap-6 xl:grid xl:h-[5.625rem] xl:grid-cols-[1fr_auto_1fr]">
        <Link to={ROUTES.home} className="shrink-0 justify-self-start" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Paradis Direct" width={480} height={98} className="h-7 w-auto xl:h-[2.125rem]" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-8 whitespace-nowrap 2xl:gap-12">
            {NAV_ITEMS.map((item) =>
              item.kind === 'menu' ? (
                <NavDropdown key={item.id} label={item.label} items={item.items} />
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        navUnderline,
                        'block py-2 text-[0.9375rem] font-medium text-navy-700 2xl:text-base',
                        isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                      )
                    }
                  >
                    {t(item.label)}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 justify-self-end sm:gap-3 2xl:gap-5">
          <LanguageMenu className="hidden xl:block" />

          <Link
            to={ROUTES.login}
            className="group hidden items-center gap-2.5 whitespace-nowrap rounded-full py-1 pl-1 pr-2 text-[0.9375rem] font-medium text-navy-700 xl:flex"
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface ring-1 ring-navy-50 transition-colors group-hover:bg-navy-50">
              <FontAwesomeIcon icon={faUser} className="text-[0.9375rem]" />
            </span>
            {t('nav.login')}
          </Link>

          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className="hidden md:block">
            <Link
              to={ROUTES.partner}
              className="flex h-12 items-center whitespace-nowrap rounded-xl bg-navy-700 px-5 text-[0.9375rem] font-semibold text-white shadow-[0_8px_20px_-12px_rgba(19,46,73,0.8)] transition-colors hover:bg-navy-600"
            >
              {t('nav.partner')}
            </Link>
          </motion.div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={t(mobileOpen ? 'nav.closeMenu' : 'nav.openMenu')}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-xl text-navy-700 transition-colors hover:bg-surface xl:hidden"
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      <MobileMenu id={mobileMenuId} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  )
}
