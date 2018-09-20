/**
 * Auth and global app data
 */
import { fromJS, Record } from 'immutable'
import {
  setAuthLevel,
  setTheme,
  setCredits,
  setUserData,
  setMobileSidebarData,
  setShowBillingDialog
} from './actions'
import { THEMES } from 'common/constants'
import { Location } from 'history'
import { ISidebarItem } from 'common/components/SideBarMenu'
export interface IRouteReducerState {
  location: Record.Instance<Location>
}
export interface IReducerState {
  credits: number
  showBillingDialog: boolean
  authLevel: number
  userData: string
  theme: string
  mobileSidebarData: IMobileSidebarData
}
export interface IMobileSidebarData {
  items: ISidebarItem[]
  pathExt: string
  basePath: string
}
const storedTheme = localStorage.getItem('theme')
const initialState = fromJS({
  credits: 0,
  showBillingDialog: false,
  authLevel: 0,
  userData: '',
  theme: storedTheme ? storedTheme : THEMES.light,
  mobileSidebarData: {}
})

export default (state = initialState, action: any) => {
  switch (action.type) {
    case setAuthLevel.type:
      return state.set('authLevel', action.payload)
    case setUserData.type:
      return state.set('userData', action.payload)
    case setTheme.type:
      return state.set('theme', action.payload)
    case setCredits.type:
      return state.set('credits', action.payload)
    case setShowBillingDialog.type:
      return state.set('showBillingDialog', action.payload)
    case setMobileSidebarData.type:
      return state.set('mobileSidebarData', action.payload)
    default:
      return state
  }
}
