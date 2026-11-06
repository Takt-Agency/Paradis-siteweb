import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  label: string
  icon: IconDefinition
  error?: string
  /** Élément à droite du libellé (ex. lien « mot de passe oublié ») */
  labelAction?: ReactNode
  /** Élément à droite dans le champ (ex. bouton afficher le mot de passe) */
  trailing?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

// Champ de formulaire avec icône, libellé et message d'erreur relié (aria-describedby)
export function InputField({ label, icon, error, labelAction, trailing, ...inputProps }: Props) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[0.9375rem] font-semibold text-navy-700">
          {label}
        </label>
        {labelAction}
      </div>
      <div
        className={cn(
          'mt-2 flex h-14 items-center gap-3 rounded-2xl bg-white px-4 ring-1 transition-shadow focus-within:ring-2',
          error ? 'ring-red-500 focus-within:ring-red-500' : 'ring-navy-100 focus-within:ring-turquoise-500',
        )}
      >
        <FontAwesomeIcon icon={icon} className={cn('w-5 shrink-0 text-[1.0625rem]', error ? 'text-red-500' : 'text-navy-400')} />
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-[0.9375rem] font-medium text-navy-700 outline-none placeholder:font-normal placeholder:text-navy-300"
          {...inputProps}
        />
        {trailing}
      </div>
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-sm text-red-600">
          <FontAwesomeIcon icon={faCircleExclamation} />
          {error}
        </p>
      )}
    </div>
  )
}
