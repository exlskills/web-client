import Loading from 'common/components/Loading'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import requireAuthentication from 'routes/requireAuthentication'

import messages from './messages'
import { Wrapper } from './styledComponents'
import { RouteComponentProps, withRouter } from 'react-router'
import { Classes, Dialog } from '@blueprintjs/core'
import {
  getViewer,
  isViewerPremium,
  setViewer
} from '../../common/utils/viewer'
import { jwtRefresh } from '../../common/http/auth'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import LanguageProvider from '../../store/LanguageProvider'
import { ConnectedRouter } from 'react-router-redux'
import App from '../../common'

type MergedProps = IProps & InjectedIntlProps & RouteComponentProps<any>

interface IProps {}

interface IStates {}

@requireAuthentication(1)
class UpgradeCallback extends React.PureComponent<MergedProps, IStates> {
  componentWillMount() {
    let isAuthedInterval = setInterval(async () => {
      await jwtRefresh()
      setViewer(null)
      if (getViewer() && isViewerPremium()) {
        clearInterval(isAuthedInterval)
        window.location.href = `/${window.location.pathname.split(
          '/'
        )[1]}/dashboard`
      }
    }, 1000)
  }

  render() {
    const { formatMessage } = this.props.intl

    return (
      <Wrapper>
        <Helmet>
          <title>
            {formatMessage(messages.pageTitle)}
          </title>
          <meta
            name="description"
            content={formatMessage(messages.pageDescription)}
          />
        </Helmet>
        <Dialog
          isOpen={true}
          canEscapeKeyClose={false}
          canOutsideClickClose={false}
        >
          <br />
          <br />
          <Loading mt={'20px'} height={'200px'} />
          <div style={{ textAlign: 'center' }} className={Classes.DIALOG_BODY}>
            <h2>
              {formatMessage(messages.dialogUpgradingYourAccount)}
            </h2>
            <br />
            <p className={'pt-text-muted'}>
              {formatMessage(messages.dialogThisPageWillReload)}
              <br />
              {formatMessage(messages.dialogHoldOn)}
            </p>
          </div>
        </Dialog>
      </Wrapper>
    )
  }
}

export default injectIntl(withRouter<any>(UpgradeCallback))
