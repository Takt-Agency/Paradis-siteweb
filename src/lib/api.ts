import axios from 'axios'
import i18n from '@/i18n'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
  withCredentials: true,
})

// Transmet la langue courante au back-end (contenus FR / EN)
api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = i18n.resolvedLanguage ?? 'fr'
  return config
})
