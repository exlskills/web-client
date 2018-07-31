import { fromJS } from 'immutable'
import { changeLocale } from './actions'

import { DEFAULT_LOCALE } from 'common/constants'
import { SupportedLocales } from 'typings/client'

export interface IReducerState {
  locale: SupportedLocales
}

const initialState = fromJS({
  locale: DEFAULT_LOCALE
})

export default (state = initialState, action: any) => {
  switch (action.type) {
    case changeLocale.type:
      return state.set('locale', action.payload)
    default:
      return state
  }
}
