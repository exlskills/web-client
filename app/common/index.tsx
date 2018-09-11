import * as React from 'react'
import * as _ from 'lodash'

import Routes from 'routes/index'
import { AppWrapper } from 'common/components/styledComponents'
import { ReactNode } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Navbar from 'common/components/Navbar'
import { NAVBAR_ROUTES } from 'common/constants'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectTheme, selectLocation } from './store/selectors'
import { Record } from 'immutable'
import { Location } from 'history'
import { lightTheme, darkTheme } from 'common/styles/themeConstants'
import { ThemeProvider } from 'styled-components'
import { getViewer } from 'common/utils/viewer'
import { Route } from 'react-router-dom'
import ReactGA from 'react-ga'

// TODO import and show SubscriptionDialog in the future
// import SubscriptionDialog from 'common/components/SubscriptionDialog';

interface IProps {
  children?: ReactNode
}
interface IStateToProps {
  theme: string
  location: Record.Instance<Location>
}

const mapStateToProps = createStructuredSelector({
  theme: selectTheme(),
  location: selectLocation()
})

class App extends React.PureComponent<
  IProps & IStateToProps & RouteComponentProps<string>,
  void
> {
  // eslint-disable-line react/prefer-stateless-function
  static childContextTypes = {
    viewer: React.PropTypes.object
  }
  getChildContext() {
    return {
      viewer: getViewer()
    }
  }

  componentWillMount() {
    if (!navigator.userAgent.startsWith('bot-exlpre-')) {
      ReactGA.initialize('UA-122120459-2', {
        gaOptions: { userId: getViewer('user_id') }
      })
    }
  }

  render() {
    const { theme, location } = this.props

    return (
      <ThemeProvider theme={theme === 'pt-dark' ? darkTheme : lightTheme}>
        <AppWrapper className={theme}>
          {_.findIndex(
            NAVBAR_ROUTES,
            route => location.get('pathname') === route
          ) === -1 && <Navbar />}
          {/*<SubscriptionDialog isOpen={true} />*/}
          <Route
            path="/"
            render={({ location }) => {
              ReactGA.pageview(location.pathname + location.search)
              return null
            }}
          />
          <Routes />
        </AppWrapper>
      </ThemeProvider>
    )
  }
}

export default connect<IStateToProps, {}, IProps>(mapStateToProps)(App)
