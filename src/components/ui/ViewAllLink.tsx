import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// Lien « Voir tous les… » en pastille blanche
export function ViewAllLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-4 rounded-full bg-white px-6 py-3.5 font-semibold text-navy-700 shadow-[0_10px_30px_-18px_rgba(19,46,73,0.4)] ring-1 ring-navy-50 transition-shadow hover:shadow-[0_14px_34px_-16px_rgba(19,46,73,0.45)]"
    >
      {children}
      <FontAwesomeIcon icon={faArrowRight} className="text-brand-500 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
