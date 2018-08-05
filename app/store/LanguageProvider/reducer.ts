import { fromJS } from 'immutable'
import { changeLocale } from './actions'

import { SupportedLocales } from 'typings/client'
import { getPathLocale, setPathLocale } from "../../common/utils/cookies";
import { getPathLocaleFromURL, redirectForLocaleIfNecessary } from "../../common/utils/path-locale";

export interface IReducerState {
  locale: SupportedLocales
}

const initialState = fromJS({
  locale: getPathLocale() ? getPathLocale() : getPathLocaleFromURL()
})

export default (state = initialState, action: any) => {
  switch (action.type) {
    case changeLocale.type:
      setPathLocale(action.payload);
      redirectForLocaleIfNecessary();
      return state.set('locale', action.payload);
    default:
      return state
  }
}
