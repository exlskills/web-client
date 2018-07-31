import { Checkbox } from '@blueprintjs/core'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'
import { InputsWrapper, SubmitButton, Wrapper } from './styledComponents'

interface IProps {
  onSubmit: () => void
}

interface IStates {
  agree: boolean
}

class SubmitCard extends React.PureComponent<
  IProps & InjectedIntlProps,
  IStates
> {
  state = {
    agree: false
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ agree: e.target.checked })
  }

  render() {
    const { formatMessage } = this.props.intl

    return (
      <Wrapper>
        <InputsWrapper>
          {formatMessage(messages.txtNotice)}
        </InputsWrapper>
        <InputsWrapper>
          <Checkbox
            label={formatMessage(messages.agreeLabel)}
            onChange={this.handleChange}
          />
        </InputsWrapper>
        <SubmitButton
          disabled={!this.state.agree}
          onClick={this.props.onSubmit}
          text={formatMessage(messages.submit)}
        />
      </Wrapper>
    )
  }
}

export default injectIntl(SubmitCard)
