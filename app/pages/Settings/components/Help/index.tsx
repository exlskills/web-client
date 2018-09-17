import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import messages from './messages'
import { SUPPORT_CONSOLE_URL } from '../../../../common/constants'
import { Icon } from '@blueprintjs/core'
import Helmet from 'react-helmet'

interface IProps {}

class SettingsHelp extends React.Component<IProps & InjectedIntlProps, {}> {
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
        <p>
          {formatMessage(messages.howToSeekHelpBeforeDeskLink)}{' '}
          <a target={'_blank'} rel={'noopener'} href={SUPPORT_CONSOLE_URL}>
            {formatMessage(messages.helpDeskLinkText)} <Icon icon={'share'} />
          </a>
        </p>
        <small>
          {formatMessage(messages.remarks)}
        </small>
      </div>
    )
  }
}

export default injectIntl(SettingsHelp)
