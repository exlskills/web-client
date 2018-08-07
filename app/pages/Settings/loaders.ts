import * as Loadable from 'react-loadable'
import Loading from 'common/components/Loading'

const DELAY_INTERVAL = 500

export const Profile = new Loadable({
  loader: () => System.import('pages/Settings/components/Profile'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Help = new Loadable({
  loader: () => System.import('pages/Settings/components/Help'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Billing = new Loadable({
  loader: () => System.import('pages/Settings/components/Billing'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Privacy = new Loadable({
  loader: () => System.import('pages/Settings/components/Privacy'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
