import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import BillingDialog from '../BillingDialog'
import {
  setCredits,
  setCheckoutItem,
  setShowBillingDialog
} from '../../store/actions'
import { createStructuredSelector } from 'reselect'
import {
  selectCheckoutItem,
  selectCredits,
  selectShowBillingDialog
} from '../../store/selectors'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ICheckoutItem } from '../../store/reducer'

interface IProps {}

interface IStateToProps {
  credits: number
  showBillingDialog: boolean
}

interface IDispatchToProps {
  setCredits: typeof setCredits
  setCheckoutItem: typeof setCheckoutItem
  setShowBillingDialog: typeof setShowBillingDialog
}

const mapStateToProps = createStructuredSelector({
  credits: selectCredits(),
  showBillingDialog: selectShowBillingDialog(),
  checkoutItem: selectCheckoutItem()
})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setCredits,
      setCheckoutItem,
      setShowBillingDialog
    },
    dispatch
  )
})

type MergedProps = IProps &
  IDispatchToProps &
  IStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any>

class BillingDialogProvider extends React.PureComponent<MergedProps, {}> {
  componentWillMount() {
    const sp = new URLSearchParams(this.props.location.search)
    const ciStr = sp.get('ci')
    const showBillingStr = sp.get('showBilling')
    if (ciStr && ciStr !== '') {
      try {
        const ciJson = window.atob(ciStr)
        const ci = JSON.parse(ciJson)
        this.props.setCheckoutItem(ci as ICheckoutItem)
      } catch (err) {
        console.error('Error parsing checkout item from URL params: ', err)
      }
    }
    if (showBillingStr && showBillingStr !== 'false') {
      this.props.setShowBillingDialog(true)
    }
  }

  toggleDialog = () => {
    this.props.setShowBillingDialog(!this.props.showBillingDialog)
  }

  render() {
    return (
      <BillingDialog
        isOpen={this.props.showBillingDialog}
        handleClose={this.toggleDialog}
      />
    )
  }
}

export default connect<IStateToProps, IDispatchToProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl<MergedProps>(withRouter<MergedProps>(BillingDialogProvider)))
