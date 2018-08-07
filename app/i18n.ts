import { addLocaleData } from 'react-intl'
const enLocaleData = require('react-intl/locale-data/en.js')
const zhLocaleData = require('react-intl/locale-data/zh.js')
const esLocaleData = require('react-intl/locale-data/es.js')
const ruLocaleData = require('react-intl/locale-data/ru.js')

import * as zhTranslationMessages from './translations/zh.json'
import * as enTranslationMessages from './translations/en.json'
import * as ruTranslationMessages from './translations/ru.json'
import * as zhHKTranslationMessages from './translations/zh-HK.json'
import * as zhTWTranslationMessages from './translations/zh-TW.json'
import * as esTranslationMessages from './translations/es.json'
import Messages = ReactIntl.Messages
const DEFAULT_LOCALE = 'en'

export const appLocales = ['en', 'zh', 'ru', 'es', 'zh-HK', 'zh-TW']

addLocaleData([...enLocaleData, ...zhLocaleData, ...esLocaleData, ...ruLocaleData])

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
  zh: formatTranslationMessages('zh', zhTranslationMessages),
  'zh-HK': formatTranslationMessages('zh-HK', zhHKTranslationMessages),
  'zh-TW': formatTranslationMessages('zh-TW', zhTWTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages)
}
