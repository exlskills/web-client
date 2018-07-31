import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

// Initial routing state
const routeInitialState = fromJS({
  location: null
})

/**
 * Merge route into the global application state
 */
export default function routeReducer(state = routeInitialState, action: any) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      })
    default:
      return state
  }
}
