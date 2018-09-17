import * as React from 'react'
import * as PropTypes from 'prop-types'
import { UpgradeButtonStyled } from './styledComponents'
import messages from './messages'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import { getViewer, isViewerPremium } from '../../utils/viewer'

interface IProps {
  onUpgradeClick: () => void
}
class UpgradeButton extends React.Component<IProps & InjectedIntlProps> {
  static contextTypes = {
    viewer: PropTypes.object
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

export default injectIntl<IProps & InjectedIntlProps>(UpgradeButton)
