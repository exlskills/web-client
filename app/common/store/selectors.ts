import { Map } from 'immutable'
import { createSelector } from 'reselect'
import { IReducerState, IRouteReducerState } from './reducer'
import { Record } from 'immutable'

const selectAppDomain = () => (
  state: Map<string, any>
): Record.Instance<IReducerState> => state.get('app')

const selectRouteDomain = () => (
  state: Map<string, any>
): Record.Instance<IRouteReducerState> => state.get('route')

export const selectLocation = () =>
  createSelector(selectRouteDomain(), state => state.get('location'))

export const selectTheme = () =>
  createSelector(selectAppDomain(), state => state.get('theme'))

export const selectCredits = () =>
  createSelector(selectAppDomain(), state => state.get('credits'))

export const selectShowBillingDialog = () =>
  createSelector(selectAppDomain(), state => state.get('showBillingDialog'))

export const selectCheckoutItem = () =>
  createSelector(selectAppDomain(), state => state.get('checkoutItem'))

export const selectAuthLevel = () =>
  createSelector(selectAppDomain(), state => state.get('authLevel'))

export const selectUserData = () =>
  createSelector(selectAppDomain(), state => state.get('userData'))

export const selectMobileSidebarData = () =>
  createSelector(selectAppDomain(), state => state.get('mobileSidebarData'))
