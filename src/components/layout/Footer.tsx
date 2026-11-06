import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import illustration from '@/assets/footer-illustration.webp'
import logo from '@/assets/logo-white.png'
import { CONTACT, FOOTER_COLUMNS, SOCIAL_LINKS } from '@/components/footer/footerConfig'
import { NewsletterForm } from '@/components/footer/NewsletterForm'
import { ROUTES } from '@/lib/routes'
import { LanguageSwitcher } from './LanguageSwitcher'

const YEAR = new Date().getFullYear()

const socialClass =
  'grid size-10 place-items-center rounded-full bg-white/5 text-base text-white ring-1 ring-white/20 transition-colors'

function ColumnTitle({ children }: { children: string }) {
  return (
    <>
      <h2 className="font-display text-lg font-bold text-white">{children}</h2>
      <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-turquoise-500" />
    </>
  )
}

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <div className="relative">
        <div className="page-container relative z-10 grid gap-12 pb-28 pt-16 xl:pb-40 sm:grid-cols-2 lg:grid-cols-3 lg:pt-20 xl:grid-cols-[1.4fr_1.05fr_1.25fr_0.85fr_1.65fr] xl:gap-8">
          {/* Marque */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1 xl:border-r xl:border-white/10 xl:pr-8">
            <Link to={ROUTES.home} className="inline-block">
              <img src={logo} alt="Paradis Direct" width={480} height={98} className="h-10 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/80">{t('footer.tagline')}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  {social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className={`${socialClass} hover:bg-white/15`}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ) : (
                    <span title={social.name} className={socialClass}>
                      <FontAwesomeIcon icon={social.icon} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={t(column.title)}>
              <ColumnTitle>{t(column.title)}</ColumnTitle>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-4 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                    >
                      {link.icon && <FontAwesomeIcon icon={link.icon} className="w-6 text-xl text-white/90" />}
                      <span className="underline-offset-4 group-hover:underline">{t(link.label)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1 xl:border-l xl:border-white/10 xl:pl-8">
            <ColumnTitle>{t('footer.newsletter.title')}</ColumnTitle>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-white/80">{t('footer.newsletter.text')}</p>
            <div className="max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Vagues décoratives (couleurs de la maquette) */}
        <svg
          aria-hidden
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full lg:h-36"
        >
          <path d="M0 70 C 220 10, 470 20, 720 75 S 1180 150, 1440 60 V160 H0 Z" className="fill-[#013252]" />
          <path d="M0 115 C 300 65, 560 150, 870 112 S 1270 62, 1440 100 V160 H0 Z" className="fill-[#053e61]" opacity="0.6" />
        </svg>

        {/* Illustration : statue, maison sur pilotis de Ganvié, palmiers */}
        <img
          src={illustration}
          alt=""
          aria-hidden
          loading="lazy"
          className="mask-soft-edges pointer-events-none absolute bottom-0 right-0 hidden w-[min(34vw,42rem)] lg:block"
        />
      </div>

      <div className="page-container">
        <div className="flex flex-col gap-5 border-t border-white/15 py-7 text-[0.9375rem] text-white/90 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0 sm:divide-x sm:divide-white/20">
            <li className="flex items-center gap-3 sm:pr-6">
              <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
              {CONTACT.city}
            </li>
            <li className="sm:px-6">
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-white">
                <FontAwesomeIcon icon={faPhone} className="text-lg" />
                {CONTACT.phone}
              </a>
            </li>
            <li className="sm:pl-6">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <p>
              © {YEAR} Paradis Direct. {t('footer.rights')}
            </p>
            <LanguageSwitcher dark />
          </div>
        </div>
      </div>
    </footer>
  )
}
