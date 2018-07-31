import actionCreatorFactory from 'typescript-fsa'
import { ISidebarItem } from 'common/components/SideBarMenu'

const actionCreator = actionCreatorFactory('containers/App/auth')

export const setAuthLevel = actionCreator<number>('SET_AUTH_LEVEL')
export const setUserData = actionCreator<number>('SET_USER_DATA')
export const logout = actionCreator<void>('LOGOUT')
export const signIn = actionCreator.async<
  { email: string; password: string },
  void
>('SIGN_IN')
export const signUp = actionCreator.async<
  { email: string; password: string },
  void
>('SIGN_UP')
export const verifyEmail = actionCreator<string>('VERIFY_EMAIL')
export const setMobileSidebarData = actionCreator<{
  items: ISidebarItem[]
  pathExt: string
  basePath: string
}>('SET_MOBILE_SIDEBAR_DATA')
