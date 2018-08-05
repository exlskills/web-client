import { COOKIES } from 'common/constants'
import * as Cookie from 'js-cookie'

export const getAuthLevelCookie = () =>
  parseInt(Cookie.get(COOKIES.authLevel), 10) || 0;

export const getUserDataCookie = () => Cookie.get(COOKIES.userDataToken);

export const getPathLocale = () => Cookie.get(COOKIES.pathLocale);

export const setPathLocale = (l: string) => Cookie.set(COOKIES.pathLocale, l, { expires: 365*10, path: '/' })
