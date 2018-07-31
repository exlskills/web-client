import { addLocaleData } from 'react-intl'
const enLocaleData = require('react-intl/locale-data/en.js')
const zhLocaleData = require('react-intl/locale-data/zh.js')
import * as zhTranslationMessages from './translations/zh.json'
import * as enTranslationMessages from './translations/en.json'
import Messages = ReactIntl.Messages
const DEFAULT_LOCALE = 'en'

export const appLocales = ['en', 'zh']

addLocaleData([...enLocaleData, ...zhLocaleData])

export const formatTranslationMessages = (locale: string, messages: any) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key]
    if (!message && locale !== DEFAULT_LOCALE) {
      message = (defaultFormattedMessages as any)[key]
    }
    return Object.assign(formattedMessages, { [key]: message })
  }, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages)
}
