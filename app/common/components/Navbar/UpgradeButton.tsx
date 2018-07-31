import * as React from 'react'
import { UpgradeButtonStyled } from './styledComponents'
import messages from './messages'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { getViewer, isViewerPremium } from '../../utils/viewer'

interface IProps {
  onUpgradeClick: () => void
}
class UpgradeButton extends React.Component<IProps & InjectedIntlProps, void> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  render() {
    if (getViewer().is_demo || isViewerPremium()) {
      return <div />
    }
    return (
      <UpgradeButtonStyled onClick={this.props.onUpgradeClick}>
        {this.props.intl.formatMessage(messages.upgrade)}
      </UpgradeButtonStyled>
    )
  }
}

export default injectIntl<IProps>(UpgradeButton)
