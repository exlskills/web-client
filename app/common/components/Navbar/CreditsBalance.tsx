import * as React from 'react'

import { Button, Intent, Tag } from '@blueprintjs/core'
import { InjectedIntlProps, injectIntl } from 'react-intl'

interface IProps {
  credits: number
  onClick: () => void
}

interface IStates {}

import styled from 'styled-components'

const CreditsBadge = styled(Tag)`
  border-radius: 12px !important;
  z-index: 9;
  position: absolute;
  top: -2px;
  right: 20px;
`

class CreditsBalance extends React.PureComponent<
  IProps & InjectedIntlProps,
  IStates
> {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Button
          className={'pt-minimal'}
          iconName={'bank-account'}
          onClick={this.props.onClick}
        />
        <CreditsBadge intent={Intent.SUCCESS}>
          {this.props.credits}
        </CreditsBadge>
      </div>
    )
  }
}

export default injectIntl(CreditsBalance)
