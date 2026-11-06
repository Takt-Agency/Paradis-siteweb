import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n'
import { cn } from '@/lib/cn'

export function LanguageSwitcher({ className, dark = false }: { className?: string; dark?: boolean }) {
  const { i18n } = useTranslation()

  return (
    <div
      className={cn(
        'inline-flex rounded-full border p-0.5 text-xs font-semibold',
        dark ? 'border-navy-500' : 'border-navy-100',
        className,
      )}
    >
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition-colors',
            i18n.resolvedLanguage === lng
              ? dark
                ? 'bg-white text-navy-700'
                : 'bg-navy-700 text-white'
              : dark
                ? 'text-navy-200 hover:text-white'
                : 'text-navy-500 hover:text-navy-700',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}
