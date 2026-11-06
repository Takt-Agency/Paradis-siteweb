import { faChevronDown, faMagnifyingGlass, faSliders, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { differenceInCalendarDays, parseISO } from 'date-fns'
import { motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import iconMark from '@/assets/icon-white.png'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Pagination } from '@/components/ui/Pagination'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/cn'
import { stagger } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { searchStays, STAYS_PAGE_SIZE, type StaySearch, type StaySort } from '@/services/stays'
import { ActiveFilters } from './ActiveFilters'
import { FiltersDrawer } from './FiltersDrawer'
import { ResultsMessage } from './ResultsMessage'
import { StayResultCard, StayResultSkeleton } from './StayResultCard'
import { StaysFilters } from './StaysFilters'
import { StaysSearchBar } from './StaysSearchBar'
import { useStaySearchParams } from './useStaySearchParams'

const SORTS: { value: StaySort; label: string }[] = [
  { value: 'recommended', label: 'staysPage.sort.recommended' },
  { value: 'price-asc', label: 'staysPage.sort.priceAsc' },
  { value: 'price-desc', label: 'staysPage.sort.priceDesc' },
  { value: 'rating', label: 'staysPage.sort.rating' },
]

const countFilters = (query: StaySearch) =>
  Number(Boolean(query.place)) +
  query.categories.length +
  Number(query.priceMin !== undefined || query.priceMax !== undefined) +
  Number(query.freeCancellation)

// Résultats de recherche de séjours (CDC §4.3 et §5)
export function AccommodationPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'fr'
  const { query, update, clearFilters, resetAll } = useStaySearchParams()
  const { isFavorite, toggle } = useFavorites()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const { data, isPending, isError, isPlaceholderData, refetch } = useQuery({
    queryKey: ['stays', query, lang],
    queryFn: () => searchStays(query, lang),
    placeholderData: keepPreviousData,
  })

  const closeFilters = useCallback(() => setFiltersOpen(false), [])
  const activeFilters = countFilters(query)
  const nights = query.checkIn && query.checkOut ? differenceInCalendarDays(parseISO(query.checkOut), parseISO(query.checkIn)) : 0

  // Les critères de séjour suivent l'utilisateur jusqu'à la fiche (CDC §5.4)
  const stayParams = new URLSearchParams(
    Object.entries({ arrivee: query.checkIn, depart: query.checkOut, voyageurs: query.guests > 1 ? String(query.guests) : undefined })
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  ).toString()

  const goToPage = (page: number) => {
    update({ page })
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filters = <StaysFilters query={query} priceBounds={data?.priceBounds} onChange={update} />

  return (
    <>
      <title>{`${t('staysPage.title')} · Paradis Direct`}</title>

      {/* Pas d'overflow-hidden ici : il couperait le calendrier et scrollIntoView ferait défiler l'en-tête */}
      <section className="relative isolate z-20 bg-navy-700 pb-10 pt-8 lg:pb-14 lg:pt-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img src={iconMark} alt="" className="absolute -right-16 -top-10 hidden w-[26rem] opacity-[0.05] lg:block" />
        </div>
        <div className="page-container">
          <Breadcrumb dark items={[{ label: t('common.home'), to: ROUTES.home }, { label: t('staysPage.title') }]} />
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white [word-spacing:0.08em]"
          >
            {t('staysPage.title')}
          </motion.h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-navy-100">{t('staysPage.subtitle')}</p>
          <div className="mt-8">
            <StaysSearchBar
              key={[query.place, query.checkIn, query.checkOut, query.guests].join('|')}
              initial={query}
              onSubmit={update}
            />
          </div>
        </div>
      </section>

      <div className="bg-surface py-10 lg:py-14">
        <div className="page-container grid items-start gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] xl:gap-10">
          <aside aria-label={t('staysPage.filters.title')} className="sticky top-[6.25rem] hidden lg:block xl:top-[7.125rem]">
            <div className="no-scrollbar max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-3xl bg-white p-6 shadow-[0_18px_40px_-30px_rgba(19,46,73,0.45)] ring-1 ring-navy-50">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-navy-700">{t('staysPage.filters.title')}</h2>
                {activeFilters > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
                  >
                    {t('staysPage.filters.reset')}
                  </button>
                )}
              </div>
              {filters}
            </div>
          </aside>

          <div ref={resultsRef} className="isolate min-w-0 scroll-mt-28">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p aria-live="polite" className="font-display text-xl font-bold text-navy-700 sm:text-2xl">
                {data ? t('staysPage.results', { count: data.total }) : ' '}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="flex h-11 items-center gap-2.5 rounded-full bg-white px-4 text-[0.9375rem] font-semibold text-navy-700 ring-1 ring-navy-100 lg:hidden"
                >
                  <FontAwesomeIcon icon={faSliders} />
                  {t('staysPage.filters.title')}
                  {activeFilters > 0 && (
                    <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-xs text-white">{activeFilters}</span>
                  )}
                </button>

                <label className="relative flex items-center gap-2 text-[0.9375rem] text-navy-500">
                  <span className="hidden sm:inline">{t('staysPage.sort.label')}</span>
                  <select
                    value={query.sort}
                    onChange={(e) => update({ sort: e.target.value as StaySort })}
                    aria-label={t('staysPage.sort.label')}
                    className="h-11 cursor-pointer appearance-none rounded-full bg-white pl-4 pr-10 font-semibold text-navy-700 ring-1 ring-navy-100 outline-none focus-visible:ring-2 focus-visible:ring-turquoise-500"
                  >
                    {SORTS.map((sort) => (
                      <option key={sort.value} value={sort.value}>
                        {t(sort.label)}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-4 text-[0.6875rem] text-navy-700" />
                </label>
              </div>
            </div>

            <ActiveFilters query={query} priceBounds={data?.priceBounds} onChange={update} onClear={clearFilters} />

            <div className="mt-6">
              {isPending ? (
                <ul aria-busy className="space-y-5">
                  {Array.from({ length: 3 }, (_, i) => (
                    <StayResultSkeleton key={i} />
                  ))}
                </ul>
              ) : isError ? (
                <ResultsMessage
                  icon={faTriangleExclamation}
                  title={t('staysPage.error.title')}
                  text={t('staysPage.error.text')}
                  action={t('staysPage.error.retry')}
                  onAction={() => refetch()}
                />
              ) : data.total === 0 ? (
                <ResultsMessage
                  icon={faMagnifyingGlass}
                  title={t('staysPage.empty.title')}
                  text={t('staysPage.empty.text')}
                  action={t('staysPage.empty.reset')}
                  onAction={resetAll}
                />
              ) : (
                <>
                  <motion.ul
                    key={`${data.page}-${data.items.map((stay) => stay.slug).join()}`}
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    aria-busy={isPlaceholderData}
                    className={cn('space-y-5 transition-opacity', isPlaceholderData && 'opacity-60')}
                  >
                    {data.items.map((stay) => (
                      <StayResultCard
                        key={stay.slug}
                        stay={stay}
                        href={`${ROUTES.accommodation}/${stay.slug}${stayParams ? `?${stayParams}` : ''}`}
                        nights={nights}
                        favorite={isFavorite(stay.slug)}
                        onToggleFavorite={() => toggle(stay.slug)}
                      />
                    ))}
                  </motion.ul>
                  {data.total > STAYS_PAGE_SIZE && (
                    <Pagination page={data.page} pageCount={data.pageCount} onChange={goToPage} className="mt-10" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <FiltersDrawer
        open={filtersOpen}
        onClose={closeFilters}
        onReset={clearFilters}
        canReset={activeFilters > 0}
        total={data?.total}
      >
        {filters}
      </FiltersDrawer>
    </>
  )
}
