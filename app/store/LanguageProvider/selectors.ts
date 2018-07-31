import { createSelector } from 'reselect'
import { Map, Record } from 'immutable'
import { IReducerState } from './reducer'

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguageDomain = (
  state: Map<string, any>
): Record.Instance<IReducerState> => state.get('language')

/**
 * Select the language locale
 */

export const selectLocale = () =>
  createSelector(selectLanguageDomain, languageState =>
    languageState.get('locale')
  )
