/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable'

import appReducer from 'common/store/reducer'
import languageProviderReducer from './LanguageProvider/reducer'
import routeReducer from './RouteProvider/reducer'

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default combineReducers({
  route: routeReducer,
  language: languageProviderReducer,
  app: appReducer
})
