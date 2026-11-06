import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const fieldShellClass =
  'flex w-full min-w-0 items-center gap-4 rounded-2xl px-5 py-3.5 text-left transition-colors duration-200 hover:bg-surface'

export const fieldValueClass = 'block w-full truncate text-[0.9375rem] leading-snug'

type Props = { icon: IconDefinition; label: ReactNode; children: ReactNode }

// Contenu commun à tous les champs : icône + libellé + valeur
export function FieldContent({ icon, label, children }: Props) {
  return (
    <>
      <FontAwesomeIcon icon={icon} className="w-5 shrink-0 text-[1.1875rem] text-navy-700" />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold leading-tight text-navy-700">{label}</span>
        <span className="mt-0.5 block">{children}</span>
      </span>
    </>
  )
}

export function FieldDivider() {
  return <span aria-hidden className="mx-5 h-px shrink-0 bg-navy-50 lg:mx-0 lg:h-11 lg:w-px lg:self-center lg:bg-navy-100" />
}

export function FieldValue({ value, placeholder }: { value?: string; placeholder: string }) {
  return (
    <span className={cn(fieldValueClass, value ? 'font-medium text-navy-700' : 'text-navy-400')}>{value || placeholder}</span>
  )
}
