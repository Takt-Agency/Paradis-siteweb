import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// Page provisoire pour les routes pas encore développées
export function PlaceholderPage({ notFound = false }: { notFound?: boolean }) {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
      {notFound && <p className="text-6xl font-extrabold text-brand-500">404</p>}
      <p className="mt-4 text-lg text-navy-500">{t(notFound ? 'common.notFound' : 'common.comingSoon')}</p>
      <Link to="/" className="mt-8 rounded-full bg-navy-700 px-5 py-2.5 font-semibold text-white hover:bg-navy-600">
        {t('common.backHome')}
      </Link>
    </div>
  )
}
