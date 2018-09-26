import * as React from 'react'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
import {
  ACCOUNTS_URL,
  ERASE_MY_DATA_FORM_URL
} from '../../../../common/constants'
import { Icon } from '@blueprintjs/core'
import Helmet from 'react-helmet'

interface IProps {}

class SettingsProfile extends React.Component<IProps & InjectedIntlProps, {}> {
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
          {formatMessage(messages.title)}
        </h3>
        <br />
        <p>
          {formatMessage(messages.editAccountInfoBeforeLink)}{' '}
          <a target={'_blank'} rel={'noopener'} href={ACCOUNTS_URL}>
            {formatMessage(messages.editAccountInfoLinkText)}{' '}
            <Icon iconSize={'inherit'} iconName={'share'} />
          </a>
        </p>
        <p>
          {formatMessage(messages.changeAvatarBeforeLink)}{' '}
          <a target={'_blank'} rel={'noopener'} href={'https://gravatar.com'}>
            {formatMessage(messages.gravatarLinkText)}{' '}
            <Icon iconSize={'inherit'} iconName={'share'} />
          </a>
        </p>
        <p>
          {formatMessage(messages.eraseMyDataBeforeLink)}{' '}
          <a target={'_blank'} rel={'noopener'} href={ERASE_MY_DATA_FORM_URL}>
            {formatMessage(messages.eraseMyDataFormLink)}{' '}
            <Icon iconSize={'inherit'} iconName={'share'} />
          </a>
        </p>
        <small>
          {formatMessage(messages.remarks)}{' '}
          <a
            target={'_blank'}
            rel={'noopener'}
            href={'https://github.com/keycloak/keycloak'}
          >
            {formatMessage(messages.keycloakSourceLinkText)}{' '}
            <Icon iconSize={'inherit'} iconName={'share'} />
          </a>
        </small>
      </div>
    )
  }
}

export default injectIntl(SettingsProfile)
