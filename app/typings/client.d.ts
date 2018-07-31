export = client
export as namespace client
import { Store } from 'redux'

declare namespace client {
  type SupportedLocales = 'en' | 'zh'

  interface ExtendedStore extends Store<string> {
    [key: string]: any
  }

  interface SelectOption {
    name: string
    value: string
  }
  type SelectOptions = SelectOption[]

  interface ITheme {
    primary: string
    secondary: string
    secondaryInverse: string
    background: string
    text: string
  }
}
