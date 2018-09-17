import * as React from 'react'
import { BILLING_CONSOLE_URL } from 'common/constants'
import { isViewerPremium } from 'common/utils/viewer'
import BillingDialog from 'common/components/BillingDialog'
import { Button, Icon } from '@blueprintjs/core'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
import Helmet from 'react-helmet'

interface IProps {}

interface IStates {
  billingDialogOpen: boolean
}

class SettingsBilling extends React.Component<
  IProps & InjectedIntlProps,
  IStates
> {
  state: IStates = {
    billingDialogOpen: false
  }

  invertBillingDialogOpen = () => {
    this.setState({ billingDialogOpen: !this.state.billingDialogOpen })
  }

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

        {/*<Button onClick={this.invertBillingDialogOpen}>Show</Button>*/}

        {/* TODO stripe billing <BillingDialog isOpen={this.state.billingDialogOpen} handleClose={this.invertBillingDialogOpen} />*/}

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
                  <Icon iconSize={'inherit'} iconName={'share'} />
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
