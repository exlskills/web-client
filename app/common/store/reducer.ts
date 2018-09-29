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
  setShowBillingDialog,
  setCheckoutItem
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
  checkoutItem: ICheckoutItem
}
export interface IMobileSidebarData {
  items: ISidebarItem[]
  pathExt: string
  basePath: string
}
export type ICheckoutItem = {
  category: string
  options: any
  refs: any
  quantity: number
  displayUnitCost: number
  displayName: string
  refreshPageAfterCheckout?: boolean
} | null
const storedTheme = localStorage.getItem('theme')
const initialState = fromJS({
  credits: 0,
  showBillingDialog: false,
  authLevel: 0,
  userData: '',
  theme: storedTheme ? storedTheme : THEMES.light,
  mobileSidebarData: {},
  checkoutItem: null
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
    case setCheckoutItem.type:
      return state.set('checkoutItem', action.payload)
    default:
      return state
  }
}
