import ConfirmDialog from 'common/components/ConfirmDialog'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import {
  Wrapper,
  DialogContent,
  Header,
  SubHeaderText,
  DialogContentInner
} from './styledComponents'
import messages from './messages'
import { Prompt } from 'react-router'
import { Button, Icon } from '@blueprintjs/core'
const rse = require('react-stripe-elements') as any

interface IProps {
  isOpen: boolean
  handleClose: () => void
}

interface IStripeProps {
  stripe: any
}

interface IStates {}

type MergedProps = IProps & InjectedIntlProps & IStripeProps

class BillingDialogContents extends React.PureComponent<MergedProps, IStates> {
  state: IStates = {}

  cardSubmit = (ev: any) => {
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload: any) => console.log('[token]', payload))
    } else {
      console.error("Stripe.js hasn't loaded yet.")
    }
    console.log(this.props.stripe)
    console.log(ev)
  }

  render() {
    const { formatMessage } = this.props.intl

    let title = formatMessage(messages.title),
      headline = formatMessage(messages.headline)

    return (
      <Wrapper
        className={`${localStorage.getItem('theme')} exl-mobile-full-dialog`}
        isOpen={this.props.isOpen}
        title={
          <Header>
            {title}
            <SubHeaderText>
              {headline}
            </SubHeaderText>
          </Header>
        }
        onClose={this.props.handleClose}
        canOutsideClickClose={true}
      >
        <DialogContent>
          <DialogContentInner>
            <div className="checkout">
              <h4>Setup Card</h4>
              <rse.CardElement />
              <Button onClick={this.cardSubmit}>Add</Button>
            </div>
          </DialogContentInner>
        </DialogContent>
      </Wrapper>
    )
  }
}

const BillingDialogContentsWithProps = injectIntl<IProps>(
  rse.injectStripe(BillingDialogContents)
)

export default class BillingDialog extends React.PureComponent<IProps, {}> {
  render() {
    return (
      <rse.Elements>
        <BillingDialogContentsWithProps {...this.props} />
      </rse.Elements>
    )
  }
}
