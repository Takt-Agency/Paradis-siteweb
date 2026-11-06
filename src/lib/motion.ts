import type { Transition, Variants } from 'motion/react'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const popoverTransition: Transition = { duration: 0.2, ease: EASE_OUT }

// Apparition des menus déroulants et popovers
export const popoverVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

// Conteneur qui fait apparaître ses enfants l'un après l'autre
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
}
