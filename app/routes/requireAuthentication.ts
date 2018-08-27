import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { getAuthLevelCookie, getUserDataCookie } from 'common/utils/cookies'
import { setAuthLevel, setUserData } from 'common/store/actions'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { anonymousAccess, intercomUserHash } from '../common/http/auth'
import { setViewer, getViewer } from 'common/utils/viewer'
import { IC_APP_ID } from '../common/constants'

interface IDispatchToProps {
  setAuthLevel: typeof setAuthLevel
  setUserData: typeof setUserData
}

type MergedProps = RouteComponentProps<string> & IDispatchToProps

export default (requiredAuthLevel = 0) => (Component: any) => {
  class AuthenticatedRoute extends React.Component<MergedProps, void> {
    componentDidMount() {
      if (!getUserDataCookie()) {
        anonymousAccess().then(() => {
          this.props.setAuthLevel(getAuthLevelCookie() || 1)
          this.props.setUserData(getUserDataCookie())
          setViewer(getUserDataCookie())
          let curPath = this.props.location.pathname
          this.props.history.replace('/')
          this.props.history.replace(curPath)
          this.loadIntercom()
        })
        return
      } else if ((getAuthLevelCookie() || 1) < requiredAuthLevel) {
        this.props.history.replace('/')
      }
      this.props.setAuthLevel(getAuthLevelCookie() || 1)
      this.props.setUserData(getUserDataCookie())
      setViewer(getUserDataCookie())
      this.loadIntercom()
    }

    loadIntercom() {
      if (navigator.userAgent.startsWith('bot-exlpre-')) {
        // Don't load intercom for the exl prerender bot
        return
      }
      if (window.location.pathname.match(new RegExp('/learn.*/exams'))) {
        // Don't show intercom during exams
        ;(window as any).Intercom('shutdown')
        return
      }
      intercomUserHash().then((resp: any) => {
        if (!resp.data || !resp.data.userIdHash) {
          return
        }
        const viewer = getViewer()
        if (viewer && viewer.user_id && IC_APP_ID) {
          ;(window as any).Intercom('boot', {
            app_id: IC_APP_ID,
            name: viewer.full_name,
            user_id: viewer.user_id,
            email: viewer.email,
            user_hash: resp.data.userIdHash
          })
        }
      })
    }

    render() {
      const { setAuthLevel, setUserData, ...otherProps } = this.props

      return React.createElement(Component, otherProps)
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
    ...bindActionCreators(
      {
        setAuthLevel,
        setUserData
      },
      dispatch
    )
  })

  return connect<{}, IDispatchToProps, {}>(null, mapDispatchToProps)(
    AuthenticatedRoute
  ) as any
}
