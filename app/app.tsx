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
import { appLocales, translationMessages } from './i18n'
const detectNearestBrowserLocale = require('detect-nearest-browser-locale')

// Import CSS reset and Global Styles
import * as FontFaceObserver from 'fontfaceobserver'
import './common/styles/globalStyles.ts'
import { FocusStyleManager } from '@blueprintjs/core'
import { getPathLocale, setPathLocale } from './common/utils/cookies'
import {
  getCurrentPathWithLocale,
  getPathLocaleFromURL,
  redirectForLocaleIfNecessary
} from './common/utils/path-locale'
import { getViewer } from './common/utils/viewer'
import { jwtRefresh } from './common/http/auth'
import { STRIPE_PUB_KEY } from './common/constants'

// Stripe elements
const rse = require('react-stripe-elements') as any

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

// This code inserts our anon pixel that will check if the user has a login, and if not, set the user's cookies for anon browsing
let anonImg = document.createElement('img')
anonImg.style.display = 'none'
anonImg.src = `${process.env.AUTH_BASE_URL}/anonymous.gif`
document.getElementById('anon-pixel-container').appendChild(anonImg)

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}

if (!getPathLocale()) {
  if (getPathLocaleFromURL()) {
    setPathLocale(getPathLocaleFromURL())
  } else {
    setPathLocale(detectNearestBrowserLocale(appLocales))
  }
}

redirectForLocaleIfNecessary()

const browserHistory = createBrowserHistory({
  basename: `/learn-${getPathLocale()}`,
  getUserConfirmation: leaveRouteConfirmation
})
const store = configureStore(initialState, browserHistory)

const render = (messages: any) => {
  let retries = 0
  let isAuthedInterval = setInterval(async () => {
    if (getViewer() && getViewer('user_id')) {
      if (getViewer('is_demo') === false) {
        try {
          await jwtRefresh()
        } catch (err) {
          if (retries < 3) {
            retries++
            console.log('Failed to refresh jwt, retrying...')
            return
          } else {
            throw 'Failed to refresh jwt despite retries'
          }
        }
      }
      clearInterval(isAuthedInterval)
      ReactDOM.render(
        <Provider store={store}>
          <rse.StripeProvider apiKey={STRIPE_PUB_KEY}>
            <LanguageProvider messages={messages}>
              <ConnectedRouter history={browserHistory}>
                <App />
              </ConnectedRouter>
            </LanguageProvider>
          </rse.StripeProvider>
        </Provider>,
        document.getElementById('app')
      )
    }
  }, 100)
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
