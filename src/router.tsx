import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { ROUTES } from '@/lib/routes'
import { HomePage } from '@/pages/home/HomePage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

// Routes publiques prévues au CDC §4.3 — branchées au fur et à mesure
const UPCOMING = [
  `${ROUTES.accommodation}/:slug`,
  ROUTES.events,
  `${ROUTES.events}/:slug`,
  ROUTES.rentals,
  `${ROUTES.rentals}/:slug`,
  ROUTES.register,
  ROUTES.forgotPassword,
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
      // Chargée à la demande pour alléger la page d'accueil
      {
        path: ROUTES.accommodation,
        lazy: () => import('@/pages/accommodation/AccommodationPage').then((m) => ({ Component: m.AccommodationPage })),
      },
      {
        path: ROUTES.login,
        lazy: () => import('@/pages/auth/LoginPage').then((m) => ({ Component: m.LoginPage })),
      },
      ...UPCOMING.map((path) => ({ path, element: <PlaceholderPage /> })),
      { path: '*', element: <PlaceholderPage notFound /> },
    ],
  },
])
