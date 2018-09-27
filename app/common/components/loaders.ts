import * as Loadable from 'react-loadable'
import Loading from './Loading'

const DELAY_INTERVAL = 500

export const Navbar = Loadable({
  loader: () => System.import('common/components/Navbar'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const SideBarMenu = Loadable({
  loader: () => System.import('common/components/SideBarMenu'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const ActivitiesCalendar = Loadable({
  loader: () => System.import('common/components/Calendar/ActivitiesCalendar'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const ConfirmDialog = Loadable({
  loader: () => System.import('common/components/ConfirmDialog'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const ExamQuestion = Loadable({
  loader: () => System.import('common/components/ExamQuestion'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const ReactSly = Loadable({
  loader: () => System.import('common/components/ReactSly'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const PlainLink = Loadable({
  loader: () => System.import('common/components/PlainLink'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
