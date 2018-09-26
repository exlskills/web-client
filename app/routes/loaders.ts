import * as Loadable from 'react-loadable'
import Loading from 'common/components/Loading'

const DELAY_INTERVAL = 500

export const Settings = Loadable({
  loader: () => System.import('pages/Settings'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Exam = Loadable({
  loader: () => System.import('pages/Exam'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const PreExam = Loadable({
  loader: () => System.import('pages/PreExam'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Section = Loadable({
  loader: () => System.import('pages/Section'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const CourseListing = Loadable({
  loader: () => System.import('pages/CourseListing'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Dashboard = Loadable({
  loader: () => System.import('pages/Dashboard'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Error = Loadable({
  loader: () => System.import('common/pages/Error'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
// Note: We no longer use the landing page -- users are automatically put into the app with an anon user if not logged in
// export const Landing = Loadable({
//   loader: () => System.import('pages/Landing'),
//   loading: Loading,
//   delay: DELAY_INTERVAL
// })
export const Notifications = Loadable({
  loader: () => System.import('pages/Notifications'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const UpgradeCallback = Loadable({
  loader: () => System.import('pages/UpgradeCallback'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Course = Loadable({
  loader: () => System.import('pages/Course'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
