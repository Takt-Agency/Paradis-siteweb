import { lazy, Suspense, type ComponentProps } from 'react'

// Le calendrier (react-day-picker) n'est chargé qu'à la première ouverture d'un champ date
const Calendar = lazy(() => import('./Calendar').then((m) => ({ default: m.Calendar })))

export function LazyCalendar(props: ComponentProps<typeof Calendar>) {
  return (
    <Suspense fallback={<div className="h-[20.75rem] w-[18.5rem]" />}>
      <Calendar {...props} />
    </Suspense>
  )
}
