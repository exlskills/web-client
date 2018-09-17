import * as React from 'react'
import { BILLING_CONSOLE_URL } from '../../../../common/constants'
import { isViewerPremium } from '../../../../common/utils/viewer'
import { Icon } from '@blueprintjs/core'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import messages from './messages'
import Helmet from 'react-helmet'

interface IProps {}

class SettingsBilling extends React.Component<IProps & InjectedIntlProps, {}> {
  render() {
    const { formatMessage } = this.props.intl

    return (
      <div>
        <Helmet
          title={formatMessage(messages.pageTitle)}
          meta={[
            {
              name: 'description',
              content: formatMessage(messages.pageDescription)
            }
          ]}
        />
        <h3>
          {formatMessage(messages.pageTitle)}
        </h3>
        <br />
        {isViewerPremium()
          ? <span>
              <p>
                {formatMessage(messages.manageYourPrefsBeforeLink)}{' '}
                <a
                  target={'_blank'}
                  rel={'noopener'}
                  href={BILLING_CONSOLE_URL}
                >
                  {formatMessage(messages.manageYourPrefsLinkText)}{' '}
                  <Icon icon={'share'} />
                </a>
              </p>
              <small>
                {formatMessage(messages.paymentSystemRemarks)}
              </small>
            </span>
          : <p>
              {formatMessage(messages.upgradeToAccess)}
            </p>}
      </div>
    )
  }
}

export default injectIntl(SettingsBilling)
