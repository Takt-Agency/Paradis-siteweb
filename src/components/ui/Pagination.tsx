import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

type Props = { page: number; pageCount: number; onChange: (page: number) => void; className?: string }

// Pages affichées : la première, la dernière et les voisines de la page courante (… entre les deux)
function visiblePages(page: number, pageCount: number) {
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pageCount))
  const sorted = [...pages].sort((a, b) => a - b)
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? (['gap', p] as const) : [p]))
}

const itemClass = 'grid size-11 place-items-center rounded-full text-[0.9375rem] font-semibold transition-colors'

// Pagination des résultats (CDC §5.4) — masquée s'il n'y a qu'une page
export function Pagination({ page, pageCount, onChange, className }: Props) {
  const { t } = useTranslation()
  if (pageCount <= 1) return null

  return (
    <nav aria-label={t('pagination.label')} className={cn('flex items-center justify-center gap-1.5', className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t('pagination.previous')}
        className={cn(itemClass, 'text-navy-700 hover:bg-white disabled:pointer-events-none disabled:opacity-30')}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
      </button>

      {visiblePages(page, pageCount).map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} aria-hidden className="w-6 text-center text-navy-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={t('pagination.page', { page: p })}
            aria-current={p === page ? 'page' : undefined}
            className={cn(itemClass, p === page ? 'bg-navy-700 text-white' : 'text-navy-700 hover:bg-white')}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label={t('pagination.next')}
        className={cn(itemClass, 'text-navy-700 hover:bg-white disabled:pointer-events-none disabled:opacity-30')}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
      </button>
    </nav>
  )
}
