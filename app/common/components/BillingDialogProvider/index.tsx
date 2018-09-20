import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import BillingDialog from '../BillingDialog'
import { setCredits, setShowBillingDialog } from '../../store/actions'
import { createStructuredSelector } from 'reselect'
import { selectCredits, selectShowBillingDialog } from '../../store/selectors'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

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

type MergedProps = IProps &
  IDispatchToProps &
  IStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any>

class BillingDialogProvider extends React.PureComponent<MergedProps, {}> {
  componentWillMount() {
    const showBillingStr = new URLSearchParams(this.props.location.search).get(
      'showBilling'
    )
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
