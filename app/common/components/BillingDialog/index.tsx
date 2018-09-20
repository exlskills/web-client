import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import {
  BuyCreditsForm,
  DialogContent,
  DialogContentInner,
  DialogDivider,
  Header,
  PurchaseCreditsButton,
  PurchaseCreditsNumericInput,
  SubHeaderText,
  Wrapper
} from './styledComponents'
import messages from './messages'
import { Button, Intent, NonIdealState } from '@blueprintjs/core'
import {
  enroll,
  getCredits,
  isEnrolled,
  purchaseCredits,
  unenroll
} from '../../http/credits'
import Loading from '../Loading'
import { jwtRefresh } from '../../http/auth'
import { getViewer, setViewer } from '../../utils/viewer'
import { AUTH_URL } from '../../constants'
import { setCredits } from '../../store/actions'
import { createStructuredSelector } from 'reselect'
import { selectCredits } from '../../store/selectors'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

const rse = require('react-stripe-elements') as any

interface IProps {
  isOpen: boolean
  handleClose: () => void
}

interface IStripeProps {
  stripe: any
}

interface IStates {
  loading: boolean
  isEnrolled: boolean
  showLoginSignup: boolean
  currentPurchaseN: number
}

interface IStateToProps {
  credits: number
}

interface IDispatchToProps {
  setCredits: typeof setCredits
}

interface IStates {}

const mapStateToProps = createStructuredSelector({
  credits: selectCredits()
})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setCredits
    },
    dispatch
  )
})

type MergedProps = IProps &
  IDispatchToProps &
  IStateToProps &
  InjectedIntlProps &
  IStripeProps

class BillingDialogContents extends React.PureComponent<MergedProps, IStates> {
  state: IStates = {
    loading: true,
    isEnrolled: false,
    showLoginSignup: false,
    currentPurchaseN: 1
  }

  componentWillMount() {
    this.fetchMembershipStatus()
  }

  componentWillUnmount() {
    this.setState({ loading: true })
  }

  fetchMembershipStatus = () => {
    this.setState({ loading: true })
    getCredits().then(creditsResp => {
      this.props.setCredits(creditsResp.data.creditsCount)
      isEnrolled().then(result => {
        if (result.data && result.data.enrolled) {
          this.setState({
            loading: false,
            isEnrolled: true,
            showLoginSignup: !!getViewer('is_demo')
          })
        } else {
          this.setState({
            loading: false,
            isEnrolled: false,
            showLoginSignup: !!getViewer('is_demo')
          })
        }
      })
    })
  }

  unenrollSubmit = () => {
    this.setState({ loading: true })
    unenroll().then(result => {
      this.setState({ loading: false, isEnrolled: false })
    })
  }

  cardSubmit = () => {
    this.setState({ loading: true })
    if (this.props.stripe) {
      this.props.stripe.createToken().then((tkn: any) => {
        if (!tkn.token) {
          return
        }
        enroll(tkn).then(result => {
          console.log('Result ', result)
          jwtRefresh().then((res: any) => {
            setViewer(null)
            this.setState({ loading: false, isEnrolled: true })
          })
        })
      })
    } else {
      this.setState({ loading: false })
      console.error("Stripe.js hasn't loaded yet.")
    }
  }

  purchaseCreditsAndUpdateCount = (n: number) => {
    this.setState({ loading: true })
    purchaseCredits(n).then((result: any) => {
      console.log('purchased credits')
      getCredits().then(creditsResp => {
        this.props.setCredits(creditsResp.data.creditsCount)
        this.setState({ loading: false })
      })
    })
  }

  updateCurrentPurchaseN = (val: number) => {
    if (!val || isNaN(val) || val <= 0) {
      val = 1
    } else if (val > 10000) {
      val = 10000
    }
    this.setState({ currentPurchaseN: Math.round(val || 0) }, () =>
      console.log(this.state.currentPurchaseN)
    )
  }

  render() {
    const { formatMessage } = this.props.intl

    // TODO internationalize, clean up text
    // NOTE: Display is used to control which views are shown because Stripe has a bug when adding/removing the components from the render
    return (
      <Wrapper
        className={`${localStorage.getItem('theme')} exl-mobile-full-dialog`}
        isOpen={this.props.isOpen}
        title={
          <Header>
            {formatMessage(messages.title)}
            <SubHeaderText>
              {formatMessage(messages.headline)}
            </SubHeaderText>
          </Header>
        }
        onClose={this.props.handleClose}
        canOutsideClickClose={true}
      >
        <DialogContent>
          <DialogContentInner>
            {this.state.loading && <Loading />}
            <div style={{ display: !this.state.loading ? undefined : 'none' }}>
              <h4>
                Available Credits: {this.props.credits}
              </h4>
              <p>
                This is your current EXLskills Credits balance. You can use your
                credits to pay for certificates, live courses, and time with
                instructors.
              </p>
            </div>
            <DialogDivider hide={this.state.loading} />
            <div
              style={{
                display:
                  !this.state.loading && this.state.showLoginSignup
                    ? undefined
                    : 'none'
              }}
            >
              <br />
              <br />
              <NonIdealState
                description={formatMessage(messages.loginRequiredDescription)}
                action={
                  <a
                    href={`${AUTH_URL}/auth/keycloak?redirect=${encodeURIComponent(
                      `${window.location.protocol}//${window.location
                        .host}${window.location.pathname}?showBilling=true`
                    )}`}
                  >
                    {formatMessage(messages.loginRequiredAction)}
                  </a>
                }
                title={formatMessage(messages.loginRequiredHeadline)}
                visual={'pt-icon-lock'}
              />
            </div>
            <div
              style={{
                display:
                  !this.state.loading && !this.state.showLoginSignup
                    ? undefined
                    : 'none'
              }}
            >
              <h4>Payment Method</h4>
              <p>
                In order to pay for credits, certificates, and live courses on
                EXLskills, you'll need to setup a credit card. You will be able
                to purchase credits as you need them, and your card will be
                charged once a month based on your usage. Don't buy anything?
                You won't be charged!
              </p>
              <div
                style={{ display: this.state.isEnrolled ? undefined : 'none' }}
              >
                <Button intent={Intent.WARNING} onClick={this.unenrollSubmit}>
                  Forget My Credit Card
                </Button>
              </div>
              <div
                style={{ display: !this.state.isEnrolled ? undefined : 'none' }}
              >
                <div style={{ height: '8px' }} />
                <rse.CardElement />
                <div
                  style={{
                    marginTop: '10px',
                    marginBottom: '0px',
                    fontSize: '12px'
                  }}
                  className={'pt-text-muted'}
                >
                  You won't be charged until you make a purchase
                </div>
                <br />
                <Button intent={Intent.SUCCESS} onClick={this.cardSubmit}>
                  Add Card
                </Button>
              </div>
            </div>
            <DialogDivider
              hide={this.state.loading || this.state.showLoginSignup}
            />
            <div
              style={{
                display:
                  !this.state.loading && !this.state.showLoginSignup
                    ? undefined
                    : 'none'
              }}
            >
              <h4>Buy Credits</h4>
              <BuyCreditsForm>
                <PurchaseCreditsNumericInput
                  disabled={!this.state.isEnrolled}
                  clampValueOnBlur={true}
                  minorStepSize={1}
                  onValueChange={this.updateCurrentPurchaseN}
                  min={1}
                  max={10000}
                  value={this.state.currentPurchaseN}
                  step={1}
                />
                <PurchaseCreditsButton
                  disabled={!this.state.isEnrolled}
                  intent={Intent.PRIMARY}
                  onClick={() =>
                    this.purchaseCreditsAndUpdateCount(
                      this.state.currentPurchaseN
                    )}
                >
                  Purchase (Approx. ${this.state.currentPurchaseN})
                </PurchaseCreditsButton>
              </BuyCreditsForm>
            </div>
          </DialogContentInner>
        </DialogContent>
      </Wrapper>
    )
  }
}

const BillingDialogContentsWithProps = connect<
  IStateToProps,
  IDispatchToProps,
  IProps
>(mapStateToProps, mapDispatchToProps)(
  injectIntl<MergedProps>(rse.injectStripe(BillingDialogContents))
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
