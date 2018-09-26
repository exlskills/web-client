import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import {
  PriorToCheckoutNote,
  BuyCreditsForm,
  CurrentPeriodNote,
  DialogContent,
  DialogContentInner,
  DialogDivider,
  Header,
  PurchaseCreditsButton,
  PurchaseCreditsNumericInput,
  SubHeaderText,
  Wrapper,
  YouWontBeChargedNote
} from './styledComponents'
import messages from './messages'
import { Button, Intent, NonIdealState } from '@blueprintjs/core'
import {
  enroll,
  getCredits,
  getCurrentUsage,
  isEnrolled,
  purchaseCredits,
  unenroll
} from '../../http/credits'
import Loading from '../Loading'
import { jwtRefresh } from '../../http/auth'
import { getViewer, setViewer } from '../../utils/viewer'
import { AUTH_URL } from '../../constants'
import { setCheckoutItem, setCredits } from '../../store/actions'
import { createStructuredSelector } from 'reselect'
import { selectCheckoutItem, selectCredits } from '../../store/selectors'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import ConfirmDialog from '../ConfirmDialog'
import * as moment from 'moment'
import { ICheckoutItem } from '../../store/reducer'
import Toaster from 'common/components/Toaster'
import { purchaseItem } from '../../http/checkout'

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
  showConfirmPurchaseDialog: boolean
  showConfirmCheckoutDialog: boolean
  billingPeriodEndsAt: number
  currentUsage: number
}

interface IStateToProps {
  credits: number
  checkoutItem: ICheckoutItem
}

interface IDispatchToProps {
  setCredits: typeof setCredits
  setCheckoutItem: typeof setCheckoutItem
}

const mapStateToProps = createStructuredSelector({
  credits: selectCredits(),
  checkoutItem: selectCheckoutItem()
})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setCredits,
      setCheckoutItem
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
    currentPurchaseN: 1,
    currentUsage: 0,
    showConfirmPurchaseDialog: false,
    showConfirmCheckoutDialog: false,
    billingPeriodEndsAt: 0
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
          getCurrentUsage().then(usageResp => {
            this.setState({
              loading: false,
              isEnrolled: true,
              showLoginSignup: !!getViewer('is_demo'),
              currentUsage: usageResp.data.totalUsage,
              billingPeriodEndsAt: usageResp.data.endsAt
            })
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
      this.setState({
        loading: false,
        isEnrolled: false,
        currentUsage: 0,
        billingPeriodEndsAt: 0
      })
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
          jwtRefresh().then((res: any) => {
            setViewer(null)
            getCurrentUsage().then(usageResp => {
              this.setState({
                loading: false,
                isEnrolled: true,
                currentUsage: usageResp.data.totalUsage,
                billingPeriodEndsAt: usageResp.data.endsAt
              })
            })
          })
        })
      })
    } else {
      let toast = {
        message: this.props.intl.formatMessage(
          messages.anErrorOccurredPurchasingPleaseRetry
        ),
        intent: Intent.DANGER
      }
      Toaster.show(toast)
      this.setState({ loading: false })
      console.error("Stripe.js hasn't loaded yet.")
    }
  }

  showConfirmPurchaseDialog = () => {
    this.setState({ showConfirmPurchaseDialog: true })
  }

  onConfirmPurchaseCancel = () => {
    this.setState({ showConfirmPurchaseDialog: false })
  }

  onConfirmPurchaseOk = () => {
    this.setState({ showConfirmPurchaseDialog: false })
    this.purchaseCreditsAndUpdateCount(this.state.currentPurchaseN)
  }

  showConfirmCheckoutDialog = () => {
    this.setState({ showConfirmCheckoutDialog: true })
  }

  onConfirmCheckoutCancel = () => {
    this.setState({ showConfirmCheckoutDialog: false })
  }

  onConfirmCheckoutOk = (ci: ICheckoutItem) => () => {
    this.setState({ showConfirmCheckoutDialog: false, loading: true })
    purchaseItem(ci)
      .then(result => {
        getCredits().then(creditsResp => {
          getCurrentUsage().then(usageResp => {
            this.setState({
              currentUsage: usageResp.data.totalUsage,
              billingPeriodEndsAt: usageResp.data.endsAt
            })
            this.props.setCredits(creditsResp.data.creditsCount)
            let toast = {
              message: this.props.intl.formatMessage(
                messages.thankYouForYourPurchaseToast
              ),
              intent: Intent.SUCCESS
            }
            Toaster.show(toast)
            this.props.handleClose()
            this.props.setCheckoutItem(null)
            this.setState({ loading: false })
          })
        })
      })
      .catch(err => {
        let toast = {
          message: this.props.intl.formatMessage(
            messages.anErrorOccurredPurchasingPleaseRetry
          ),
          intent: Intent.DANGER
        }
        Toaster.show(toast)
      })
  }

  purchaseCreditsAndUpdateCount = (n: number) => {
    this.setState({ loading: true })
    purchaseCredits(n)
      .then((result: any) => {
        getCredits().then(creditsResp => {
          getCurrentUsage().then(usageResp => {
            this.setState({
              currentUsage: usageResp.data.totalUsage,
              billingPeriodEndsAt: usageResp.data.endsAt
            })
            this.props.setCredits(creditsResp.data.creditsCount)
            this.setState({ loading: false })
          })
        })
      })
      .catch(err => {
        let toast = {
          message: this.props.intl.formatMessage(
            messages.anErrorOccurredPurchasingPleaseRetry
          ),
          intent: Intent.DANGER
        }
        Toaster.show(toast)
      })
  }

  updateCurrentPurchaseN = (val: number) => {
    if (!val || isNaN(val) || val <= 0) {
      val = 1
    } else if (val > 10000) {
      val = 10000
    }
    this.setState({ currentPurchaseN: Math.round(val || 0) })
  }

  confirmPurchaseText = (state: IStates) => {
    const { formatMessage } = this.props.intl
    return {
      title: formatMessage(messages.confirmPurchaseCoinsTitle),
      text: formatMessage(messages.confirmPurchaseCoinsText, {
        coins: state.currentPurchaseN,
        cost: `US$${state.currentPurchaseN}`
      }),
      submit: formatMessage(messages.confirmPurchaseCoinsSubmitBtn),
      cancel: formatMessage(messages.confirmPurchaseCoinsCancelBtn)
    }
  }

  confirmCheckoutText = (currentBal: number, ci: ICheckoutItem) => {
    const { formatMessage } = this.props.intl
    const checkoutTotalCost = ci ? ci.quantity * ci.displayUnitCost : 0
    let txt = formatMessage(messages.confirmCheckoutText, {
      item: ci ? ci.displayName : '',
      cost: checkoutTotalCost
    })
    if (currentBal < checkoutTotalCost) {
      txt += ` ${formatMessage(messages.confirmCheckoutTextCoinsAddition, {
        cost: checkoutTotalCost - currentBal
      })}`
    }
    return {
      title: formatMessage(messages.confirmCheckoutTitle),
      text: txt,
      submit: formatMessage(messages.confirmCheckoutSubmitBtn),
      cancel: formatMessage(messages.confirmCheckoutCancelBtn)
    }
  }

  renderCompleteCheckout = (currentBal: number, ci: ICheckoutItem) => {
    const { formatMessage } = this.props.intl
    const checkoutTotalCost = ci.quantity * ci.displayUnitCost
    const extraCost = checkoutTotalCost - currentBal
    return (
      <div>
        <ul>
          <li>
            {ci.displayName}
          </li>
        </ul>
        <p>
          {formatMessage(messages.checkoutSubTotalCoins, {
            coins: ci.quantity * ci.displayUnitCost
          })}
          <br />
          {formatMessage(messages.yourCostHeading)}&nbsp;
          <strong>
            {extraCost <= 0 &&
              formatMessage(messages.yourTotalCoveredByBalance, {
                cost: checkoutTotalCost
              })}
            {extraCost === checkoutTotalCost &&
              formatMessage(messages.yourTotalFiat, {
                cost: checkoutTotalCost
              })}
            {extraCost > 0 &&
              extraCost < checkoutTotalCost &&
              formatMessage(messages.yourTotalMixed, {
                cost: currentBal,
                extraCost
              })}
          </strong>
        </p>
        <Button
          disabled={!this.state.isEnrolled}
          intent={Intent.PRIMARY}
          onClick={this.showConfirmCheckoutDialog}
        >
          {formatMessage(messages.completeCheckoutBtn)}
        </Button>
        <PriorToCheckoutNote>
          {!this.state.isEnrolled && currentBal < checkoutTotalCost
            ? formatMessage(messages.addPaymentMethodToCompleteCheckout)
            : formatMessage(messages.youWillBeAskedToConfirmNote)}
        </PriorToCheckoutNote>
      </div>
    )
  }

  handleDialogClose = () => {
    // Clear the checkout item if the user closes
    this.props.setCheckoutItem(null)
    this.props.handleClose()
  }

  render() {
    const { formatMessage } = this.props.intl

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
        onClose={this.handleDialogClose}
        canOutsideClickClose={true}
      >
        <DialogContent>
          <ConfirmDialog
            onSubmit={this.onConfirmPurchaseOk}
            onCancel={this.onConfirmPurchaseCancel}
            showDialog={this.state.showConfirmPurchaseDialog}
            messageText={this.confirmPurchaseText(this.state)}
          />
          <ConfirmDialog
            onSubmit={this.onConfirmCheckoutOk(this.props.checkoutItem)}
            onCancel={this.onConfirmCheckoutCancel}
            showDialog={this.state.showConfirmCheckoutDialog}
            messageText={this.confirmCheckoutText(
              this.props.credits,
              this.props.checkoutItem
            )}
          />
          <DialogContentInner>
            {this.state.loading && <Loading />}
            <div
              style={{
                display:
                  !this.state.loading &&
                  this.props.checkoutItem &&
                  !this.state.showLoginSignup
                    ? undefined
                    : 'none'
              }}
            >
              <h4>
                {formatMessage(messages.checkoutTitle)}
              </h4>
              {this.props.checkoutItem &&
                this.renderCompleteCheckout(
                  this.props.credits,
                  this.props.checkoutItem
                )}
              <DialogDivider />
            </div>
            <div style={{ display: !this.state.loading ? undefined : 'none' }}>
              <h4>
                {formatMessage(messages.accountBalance)}
                {this.props.credits}
              </h4>
              <p>
                {formatMessage(messages.accountBalanceExplanation)}
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
                        .host}${window.location
                        .pathname}?showBilling=true&ci=${encodeURIComponent(
                        window.btoa(JSON.stringify(this.props.checkoutItem))
                      )}`
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
              <h4>
                {formatMessage(messages.paymentMethodTitle)}
              </h4>
              <p>
                {formatMessage(messages.paymentMethodExplanation)}
              </p>
              <div
                style={{ display: this.state.isEnrolled ? undefined : 'none' }}
              >
                <Button intent={Intent.WARNING} onClick={this.unenrollSubmit}>
                  {formatMessage(messages.forgetMyCreditCard)}
                </Button>
              </div>
              <div
                style={{ display: !this.state.isEnrolled ? undefined : 'none' }}
              >
                <div style={{ height: '8px' }} />
                <rse.CardElement />
                <YouWontBeChargedNote>
                  {formatMessage(messages.youWontBeChargedNote)}
                </YouWontBeChargedNote>
                <br />
                <Button intent={Intent.SUCCESS} onClick={this.cardSubmit}>
                  {formatMessage(messages.addCardBtnMsg)}
                </Button>
              </div>
            </div>
            <DialogDivider
              hide={
                this.state.loading ||
                this.state.showLoginSignup ||
                !!this.props.checkoutItem
              }
            />
            <div
              style={{
                display:
                  !this.state.loading &&
                  !this.props.checkoutItem &&
                  !this.state.showLoginSignup
                    ? undefined
                    : 'none'
              }}
            >
              <h4>
                {formatMessage(messages.buyCoinsTitle)}
              </h4>
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
                  onClick={this.showConfirmPurchaseDialog}
                >
                  {formatMessage(messages.purchaseCoinsButtonText, {
                    coins: this.state.currentPurchaseN
                  })}
                </PurchaseCreditsButton>
              </BuyCreditsForm>
              <CurrentPeriodNote>
                {this.state.isEnrolled
                  ? this.state.currentUsage > 0
                    ? formatMessage(messages.currentBillingPeriodNote, {
                        usage: this.state.currentUsage,
                        date: moment(
                          new Date(this.state.billingPeriodEndsAt * 1000)
                        ).format('LL')
                      })
                    : formatMessage(messages.usageForCurrentPeriodIsZeroNote, {
                        date: moment(
                          new Date(this.state.billingPeriodEndsAt * 1000)
                        ).format('LL')
                      })
                  : formatMessage(messages.addPaymentMethodToPurchaseCoins)}
              </CurrentPeriodNote>
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
