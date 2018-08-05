export const GRAPHQL_BASE_URL = process.env.GRAPHQL_BASE_URL
export const GRAPHQL_URL = `${GRAPHQL_BASE_URL}/${process.env.GRAPHQL_PATH}`
export const EDITOR_URL = `${process.env.EDITOR_BASE_URL}`
export const AUTH_URL = `${process.env.AUTH_BASE_URL}`
export const CLIENT_URL = process.env.CLIENT_URL
export const NODE_ENV = process.env.NODE_ENV
export const IC_APP_ID = process.env.IC_APP_ID
export const DEFAULT_LOCALE = 'en'
export const NAVBAR_ROUTES = ['/']
export const DEFAULT_PAGE_SIZE = 25
export const DISCUSSION_LIMIT = 100
export const COMMENT_LIMIT = 25

export const THEMES = {
  dark: 'pt-dark',
  light: 'pt-light'
}

/** Auth **/
export enum AUTH_LEVELS {
  logged_out,
  trial,
  logged_in
}
export const COOKIES = {
  userDataToken: 'user_data',
  authLevel: 'authLvl',
  session: 'sessId',
  error: 'err',
  completedTutorial: 'completedTutorial',
  showTutorial: 'showTutorial',
  locale: 'locale',
  courseLocale: 'courseLocale',
  pathLocale: 'pathLocale'
}

export const EDITOR_DEFAULT_HEIGHT = '500px'
export const EDITOR_DEFAULT_NAME = ''
export const EDITOR_DEFAULT_FILENAME = 'ImportExample.java'
export const EDITOR_DEFAULT_CONTENT = ''
export const EDITOR_DEFAULT_ENV = 'java_default_free'
