import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { InputField } from './InputField'

type Props = Omit<ComponentProps<typeof InputField>, 'icon' | 'type' | 'trailing'>

// Mot de passe avec bouton afficher / masquer
export function PasswordField(props: Props) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <InputField
      {...props}
      icon={faLock}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={t(visible ? 'auth.hidePassword' : 'auth.showPassword')}
          aria-pressed={visible}
          className="-mr-1 grid size-10 shrink-0 place-items-center rounded-full text-navy-400 transition-colors hover:bg-surface hover:text-navy-700"
        >
          <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
        </button>
      }
    />
  )
}
