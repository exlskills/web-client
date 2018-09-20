import actionCreatorFactory from 'typescript-fsa'
import { Intent } from '@blueprintjs/core'

const actionCreator = actionCreatorFactory('containers/App')

/**
 * Displays a toast message at thew top of the page
 */
export const addToast = actionCreator<{ message: string; intent: Intent }>(
  'ADD_TOAST'
)
/**
 * Sets page color theme (light/dark)
 */
export const setTheme = actionCreator<string>('SET_THEME')

export const setCredits = actionCreator<number>('SET_CREDITS')

export const setShowBillingDialog = actionCreator<boolean>(
  'SET_SHOW_BILLING_DIALOG'
)

export * from './auth'
