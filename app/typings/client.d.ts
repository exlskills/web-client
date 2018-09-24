export = client
export as namespace client
import { Store } from 'redux'

declare namespace client {
  type SupportedLocales = 'en' | 'zh' | 'es' | 'ru' | 'zh-HK' | 'zh-TW'

  interface ExtendedStore extends Store<string> {
    [key: string]: any
  }

  interface SelectOption {
    name: string
    value: string
  }
  type SelectOptions = SelectOption[]

  interface ITheme {
    navbar: string
    activeNavbarItem: string
    sidebar: string
    activeSidebarItem: string
    sidebarDot: string
    contentBackground: string
    questionBackground: string
    secondaryText: string
    highlightedText: string
    primary: string
    secondary: string
    secondaryInverse: string
    background: string
    text: string
  }
}
