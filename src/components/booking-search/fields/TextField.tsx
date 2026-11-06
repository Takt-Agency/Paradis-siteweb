import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { FieldContent, fieldShellClass, fieldValueClass } from './FieldShell'

type Props = { icon: IconDefinition; label: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

// Champ de saisie libre (destination, budget…)
export function TextField({ icon, label, ...inputProps }: Props) {
  const id = useId()

  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className={cn(fieldShellClass, 'cursor-text focus-within:bg-surface')}>
        <FieldContent icon={icon} label={label}>
          <input
            id={id}
            autoComplete="off"
            className={cn(
              fieldValueClass,
              'bg-transparent font-medium text-navy-700 outline-none placeholder:font-normal placeholder:text-navy-400',
            )}
            {...inputProps}
          />
        </FieldContent>
      </label>
    </div>
  )
}
