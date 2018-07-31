import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('containers/LanguageProvider')

export const changeLocale = actionCreator<string>('CHANGE_LOCALE')
