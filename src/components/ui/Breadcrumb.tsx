import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Props = { items: { label: string; to?: string }[]; dark?: boolean }

// Fil d'Ariane entre l'accueil, les résultats et les fiches (CDC §4.2) — le dernier élément est la page courante
export function Breadcrumb({ items, dark = false }: Props) {
  const { t } = useTranslation()

  return (
    <nav aria-label={t('common.breadcrumb')}>
      <ol className={cn('flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm', dark ? 'text-white/70' : 'text-navy-400')}>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <li aria-hidden className="flex">
                <FontAwesomeIcon icon={faChevronRight} className="text-[0.625rem]" />
              </li>
            )}
            <li>
              {item.to ? (
                <Link
                  to={item.to}
                  className={cn('underline-offset-4 transition-colors hover:underline', dark ? 'hover:text-white' : 'hover:text-navy-700')}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={cn('font-medium', dark ? 'text-white' : 'text-navy-700')}>
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
