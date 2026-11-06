import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { ROUTES } from '@/lib/routes'
import { HomePage } from '@/pages/home/HomePage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

// Routes publiques prévues au CDC §4.3 — branchées au fur et à mesure
const UPCOMING = [
  ROUTES.accommodation,
  `${ROUTES.accommodation}/:slug`,
  ROUTES.events,
  `${ROUTES.events}/:slug`,
  ROUTES.rentals,
  `${ROUTES.rentals}/:slug`,
  ROUTES.login,
  ROUTES.register,
  ROUTES.partner,
  ROUTES.assistance,
  ROUTES.agency,
  ROUTES.claims,
  ROUTES.services,
  ROUTES.about,
  ROUTES.howItWorks,
  ROUTES.faq,
  ROUTES.partnerSpace,
  ROUTES.proSolutions,
  ROUTES.terms,
  ROUTES.cancellation,
  ROUTES.privacy,
  ROUTES.legal,
]

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      ...UPCOMING.map((path) => ({ path, element: <PlaceholderPage /> })),
      { path: '*', element: <PlaceholderPage notFound /> },
    ],
  },
])
