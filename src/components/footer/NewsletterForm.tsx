import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'motion/react'
import { useId, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/lib/api'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'loading' | 'success' | 'invalid' | 'error'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Inscription à la newsletter — nécessite l'endpoint POST /newsletter côté back-end (hors CDC v2.0)
export function NewsletterForm() {
  const { t } = useTranslation()
  const id = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('invalid')
      return
    }
    setStatus('loading')
    try {
      await api.post('/newsletter', { email: email.trim() })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const message = status === 'success' || status === 'invalid' || status === 'error' ? t(`footer.newsletter.${status}`) : ''

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6">
      <label htmlFor={id} className="sr-only">
        {t('footer.newsletter.placeholder')}
      </label>
      <div className="relative flex h-14 items-center rounded-full bg-white ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-turquoise-500">
        <FontAwesomeIcon icon={faEnvelope} className="pointer-events-none absolute left-5 text-lg text-navy-400" />
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== 'loading') setStatus('idle')
          }}
          placeholder={t('footer.newsletter.placeholder')}
          aria-invalid={status === 'invalid'}
          aria-describedby={`${id}-status`}
          className="h-full w-full min-w-0 rounded-full bg-transparent pl-12 pr-16 text-[0.9375rem] text-navy-700 outline-none placeholder:text-navy-400"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          disabled={status === 'loading'}
          aria-label={t('footer.newsletter.submit')}
          className="absolute inset-y-0 right-0 grid w-14 place-items-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
        </motion.button>
      </div>
      <p
        id={`${id}-status`}
        aria-live="polite"
        className={cn('mt-2 min-h-5 pl-5 text-sm', status === 'success' ? 'text-turquoise-100' : 'text-brand-200')}
      >
        {message}
      </p>
    </form>
  )
}
