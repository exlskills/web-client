import * as React from 'react'
import { Button, Icon, Intent } from '@blueprintjs/core'
import { injectIntl } from 'react-intl'
import messages from './messages'
import Helmet from 'react-helmet'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { connect } from 'react-redux'
import {
  setCredits,
  setShowBillingDialog
} from '../../../../common/store/actions'
import { createStructuredSelector } from 'reselect'
import {
  selectCredits,
  selectShowBillingDialog
} from '../../../../common/store/selectors'
import { bindActionCreators, Dispatch } from 'redux'

interface IProps {}

interface IStateToProps {
  credits: number
  showBillingDialog: boolean
}

interface IDispatchToProps {
  setCredits: typeof setCredits
  setShowBillingDialog: typeof setShowBillingDialog
}

const mapStateToProps = createStructuredSelector({
  credits: selectCredits(),
  showBillingDialog: selectShowBillingDialog()
})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setCredits,
      setShowBillingDialog
    },
    dispatch
  )
})

type MergedProps = IProps & IDispatchToProps & IStateToProps & InjectedIntlProps

class SettingsBilling extends React.Component<MergedProps, {}> {
  toggleBillingDialogOpen = () => {
    this.props.setShowBillingDialog(!this.props.showBillingDialog)
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
          {formatMessage(messages.title)}
        </h3>
        <br />
        <div>
          <p>
            {formatMessage(messages.explainer)}
          </p>
          <Button
            iconName={'pt-icon-bank-account'}
            intent={Intent.PRIMARY}
            onClick={this.toggleBillingDialogOpen}
          >
            Open My Billing Preferences
          </Button>
          <br />
          <br />
          <small>
            {formatMessage(messages.stripePartnerRemark)}{' '}
            <a href={'https://stripe.com/'} rel={'noopener'} target={'_blank'}>
              Stripe <Icon iconSize={'inherit'} iconName={'share'} />
            </a>
          </small>
        </div>
      </div>
    )
  }
}

export default connect<IStateToProps, IDispatchToProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl<MergedProps>(SettingsBilling))
