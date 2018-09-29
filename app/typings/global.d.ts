declare module 'uuid'
declare module 'react-helmet'
declare module 'js-cookie'
declare module 'react-relay/compat'
declare module 'react-loadable'
declare module 'recharts'
declare module 'reconnectingwebsocket'
declare module 'fontfaceobserver'
declare module 'Prism'

declare var System: any

declare module '*.json' {
  const value: any
  export default value
}

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> }
