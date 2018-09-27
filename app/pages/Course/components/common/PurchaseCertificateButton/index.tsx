import {
  setCheckoutItem,
  setCredits,
  setShowBillingDialog
} from '../../../../../common/store/actions'
import { createStructuredSelector } from 'reselect'
import {
  selectCheckoutItem,
  selectCredits,
  selectShowBillingDialog
} from '../../../../../common/store/selectors'
import { bindActionCreators, Dispatch } from 'redux'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { ICheckoutItem } from '../../../../../common/store/reducer'
import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Intent } from '@blueprintjs/core'

interface IProps {
  courseId: string
  itemDisplayName: string
  buttonStyle: any
  buttonText: string
  certCost: number
}

interface IStateToProps {
  showBillingDialog: boolean
  checkoutItem: ICheckoutItem
}

interface IDispatchToProps {
  setShowBillingDialog: typeof setShowBillingDialog
  setCheckoutItem: typeof setCheckoutItem
}

interface IStates {}

const mapStateToProps = createStructuredSelector({
  showBillingDialog: selectShowBillingDialog(),
  checkoutItem: selectCheckoutItem()
})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setShowBillingDialog,
      setCheckoutItem
    },
    dispatch
  )
})

type MergedProps = IProps & IDispatchToProps & IStateToProps & InjectedIntlProps

class PurchaseCertificateButton extends React.PureComponent<MergedProps, {}> {
  onClick = () => {
    this.props.setCheckoutItem({
      category: 'course_cert',
      quantity: 1,
      options: {
        certificate_type: 'verified'
      },
      refs: {
        course_id: this.props.courseId
      },
      displayUnitCost: this.props.certCost,
      displayName: this.props.itemDisplayName
    })
    this.props.setShowBillingDialog(true)
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.onClick}
          style={this.props.buttonStyle}
          intent={Intent.SUCCESS}
        >
          {this.props.buttonText}
        </Button>
      </div>
    )
  }
}

export default connect<IStateToProps, IDispatchToProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl<MergedProps>(PurchaseCertificateButton))
