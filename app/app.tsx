import 'babel-polyfill'

// Import all the third party stuff
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import 'sanitize.css/sanitize.css'
import './common/styles/theme.scss'

// Import root app
import App from 'common/index'
import createBrowserHistory from 'history/createBrowserHistory'
import { leaveRouteConfirmation } from './routes/confirmation'

// Import Language Provider
import LanguageProvider from 'store/LanguageProvider'

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico'
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store'

// Import i18n messages
import { translationMessages } from './i18n'

// Import CSS reset and Global Styles
import * as FontFaceObserver from 'fontfaceobserver'
import './common/styles/globalStyles.ts'
import { FocusStyleManager } from '@blueprintjs/core'

// Load NotoSans font
const notoSansFontObserver = new FontFaceObserver('NotoSans')
const html = document.documentElement

html.classList.add('fonts-loading')

notoSansFontObserver
  .load()
  .then(() => {
    html.classList.remove('fonts-loading')
    html.classList.add('fonts-loaded')
  })
  .catch(() => {
    html.classList.remove('fonts-loading')
    html.classList.add('fonts-failed')
  })
// Only shows blue highlight on tabs and input elements
FocusStyleManager.onlyShowFocusOnTabs()

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}

const browserHistory = createBrowserHistory({
  basename: '/learn',
  getUserConfirmation: leaveRouteConfirmation
})
const store = configureStore(initialState, browserHistory)

const render = (messages: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={browserHistory}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  )
}

// Hot reloadable translation json files
if ((module as any).hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  ;(module as any).hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise(resolve => {
    resolve(System.import('intl'))
  })
    .then(() => Promise.all([System.import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}
