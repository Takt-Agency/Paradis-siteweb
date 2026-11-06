import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faCalendarCheck,
  faCircleExclamation,
  faCircleNotch,
  faFileContract,
  faHandshake,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import heroImage from '@/assets/hero-benin-1280.webp'
import logo from '@/assets/logo-white.png'
import { InputField } from '@/components/forms/InputField'
import { PasswordField } from '@/components/forms/PasswordField'
import { EASE_OUT, fadeUp, stagger } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'
import { login, loginErrorCode } from '@/services/auth'

// Ce que l'espace client permet (CDC §13)
const BENEFITS = [
  { key: 'bookings', icon: faCalendarCheck },
  { key: 'manage', icon: faPenToSquare },
  { key: 'rentals', icon: faFileContract },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Fields = { email: string; password: string }

function validate({ email, password }: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (!email.trim()) errors.email = 'auth.errors.emailRequired'
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'auth.errors.emailInvalid'
  if (!password) errors.password = 'auth.errors.passwordRequired'
  return errors
}

// Seules les adresses internes sont acceptées comme retour après connexion (pas de redirection ouverte)
const safeRedirect = (value: string | null) => (value?.startsWith('/') && !value.startsWith('//') ? value : null)

// Connexion client et partenaire (CDC §4.3 et §13.1)
export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [params] = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<Fields>({ email: '', password: '' })
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({})
  const [submitted, setSubmitted] = useState(false)

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth', 'me'], user)
      // Retour à la page d'origine (ex. réservation en cours, CDC §9.1), sinon vers l'espace adapté
      const partnerOnly = user.roles.includes('partner') && !user.roles.includes('client')
      navigate(safeRedirect(params.get('redirection')) ?? (partnerOnly ? ROUTES.partnerSpace : ROUTES.home), { replace: true })
    },
  })

  const setField = (name: keyof Fields, value: string) => {
    const next = { ...fields, [name]: value }
    setFields(next)
    // Après une première tentative, les erreurs se mettent à jour pendant la saisie
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('[aria-invalid=true]')?.focus())
      return
    }
    mutation.mutate({ email: fields.email.trim(), password: fields.password })
  }

  const serverError = mutation.isError ? loginErrorCode(mutation.error) : null

  return (
    <>
      <title>{`${t('auth.login.title')} · Paradis Direct`}</title>

      <section className="bg-surface py-10 sm:py-14 lg:py-20">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto grid max-w-[70rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-40px_rgba(19,46,73,0.45)] ring-1 ring-navy-50 lg:grid-cols-[1fr_1.05fr]"
          >
            {/* Visuel et avantages du compte */}
            <aside className="relative isolate hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:p-12">
              <img src={heroImage} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-900/95 via-navy-800/75 to-navy-700/40" />

              <Link to={ROUTES.home} className="self-start">
                <img src={logo} alt="Paradis Direct" width={480} height={98} className="h-9 w-auto" />
              </Link>

              <div>
                <h2 className="font-display text-[2rem] font-extrabold leading-tight tracking-[-0.02em] [word-spacing:0.08em]">
                  {t('auth.login.panelTitle')}
                </h2>
                <motion.ul variants={stagger} initial="hidden" animate="visible" className="mt-8 space-y-4">
                  {BENEFITS.map((benefit) => (
                    <motion.li key={benefit.key} variants={fadeUp} className="flex items-center gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-turquoise-100 ring-1 ring-white/15 backdrop-blur-sm">
                        <FontAwesomeIcon icon={benefit.icon} />
                      </span>
                      <span className="text-[0.9375rem] leading-snug text-white/90">{t(`auth.login.benefits.${benefit.key}`)}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </aside>

            {/* Formulaire */}
            <div className="px-6 py-10 sm:px-12 sm:py-12 xl:px-16 xl:py-14">
              <h1 className="font-display text-[clamp(1.875rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-0.02em] text-navy-700">
                {t('auth.login.title')}
              </h1>
              <p className="mt-2 text-navy-500">{t('auth.login.subtitle')}</p>

              <AnimatePresence initial={false}>
                {serverError && (
                  <motion.div
                    key={serverError}
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 flex gap-3 rounded-2xl bg-red-50 px-4 py-3.5 text-sm leading-relaxed text-red-700 ring-1 ring-red-100">
                      <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5 shrink-0" />
                      {t(`auth.login.errors.${serverError}`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-8 space-y-5">
                <InputField
                  label={t('auth.email')}
                  icon={faEnvelope}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={t('auth.emailPlaceholder')}
                  value={fields.email}
                  onChange={(e) => setField('email', e.target.value)}
                  error={errors.email && t(errors.email)}
                />
                <PasswordField
                  label={t('auth.password')}
                  name="password"
                  autoComplete="current-password"
                  placeholder={t('auth.passwordPlaceholder')}
                  value={fields.password}
                  onChange={(e) => setField('password', e.target.value)}
                  error={errors.password && t(errors.password)}
                  labelAction={
                    <Link
                      to={ROUTES.forgotPassword}
                      className="text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
                    >
                      {t('auth.login.forgot')}
                    </Link>
                  }
                />

                <motion.button
                  type="submit"
                  disabled={mutation.isPending}
                  whileHover={mutation.isPending ? undefined : { scale: 1.01 }}
                  whileTap={mutation.isPending ? undefined : { scale: 0.98 }}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-brand-500 text-[1.0625rem] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(244,122,42,0.75)] transition-colors hover:bg-brand-600 disabled:cursor-wait disabled:opacity-80"
                >
                  {mutation.isPending ? (
                    <>
                      <FontAwesomeIcon icon={faCircleNotch} spin />
                      {t('auth.login.submitting')}
                    </>
                  ) : (
                    t('auth.login.submit')
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-[0.9375rem] text-navy-500">
                {t('auth.login.noAccount')}{' '}
                <Link to={ROUTES.register} className="font-semibold text-navy-700 underline underline-offset-4 hover:text-brand-600">
                  {t('auth.login.register')}
                </Link>
              </p>

              <div className="mt-8 flex items-start gap-4 rounded-2xl bg-surface p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-turquoise-50 text-turquoise-600">
                  <FontAwesomeIcon icon={faHandshake} />
                </span>
                <div>
                  <p className="font-semibold text-navy-700">{t('auth.login.partnerTitle')}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-500">{t('auth.login.partnerText')}</p>
                  <Link
                    to={ROUTES.partner}
                    className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                  >
                    {t('auth.login.partnerCta')}
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
