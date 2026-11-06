import { isAxiosError } from 'axios'
import { api } from '@/lib/api'

export type UserRole = 'client' | 'partner' | 'admin'

export type AuthUser = { id: string; firstName: string; lastName: string; email: string; roles: UserRole[] }

/** Causes d'échec affichées à l'utilisateur */
export type LoginError = 'invalidCredentials' | 'accountBlocked' | 'tooManyAttempts' | 'unavailable'

// Connexion email + mot de passe (CDC §13.1). La session est portée par un cookie
// sécurisé posé par l'API (withCredentials), jamais stockée en clair dans le navigateur.
export async function login(credentials: { email: string; password: string }) {
  const { data } = await api.post<{ user: AuthUser }>('/auth/login', credentials)
  return data.user
}

// Traduit la réponse de l'API en cause lisible — codes à aligner avec le back-end
export function loginErrorCode(error: unknown): LoginError {
  if (!isAxiosError(error) || !error.response) return 'unavailable'
  const code = (error.response.data as { code?: string } | undefined)?.code
  // Partenaire bloqué (CDC §10.5) — un compte en attente de validation peut se connecter (accès limité)
  if (code === 'ACCOUNT_BLOCKED') return 'accountBlocked'
  if (error.response.status === 429) return 'tooManyAttempts'
  if (error.response.status === 401 || error.response.status === 400) return 'invalidCredentials'
  return 'unavailable'
}
