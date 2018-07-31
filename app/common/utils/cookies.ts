import { COOKIES } from 'common/constants'
import * as Cookie from 'js-cookie'

export const getAuthLevelCookie = () =>
  parseInt(Cookie.get(COOKIES.authLevel), 10) || 0

export const getUserDataCookie = () => Cookie.get(COOKIES.userDataToken)
