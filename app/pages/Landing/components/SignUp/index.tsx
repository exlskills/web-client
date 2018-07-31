import { Button } from '@blueprintjs/core'
import EmailInput from 'common/components/forms/inputs/EmailInput'
import PasswordInput from 'common/components/forms/inputs/PasswordInput'
import { validateEmail, validatePassword } from 'common/utils/forms'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'

interface IProps {
  onSubmit: (form: any) => void
  onAlreadyRegisteredClick: () => void
  isLoading?: boolean
}

interface IStates {
  email: string
  emailError: string
  password: string
  passwordError: string
}

class SignUp extends React.PureComponent<IProps & InjectedIntlProps, IStates> {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  }

  handleEmailChange = (value: string) => {
    this.setState({ email: value })
  }

  validateEmailInput = (e: any) => {
    const errorCode = validateEmail(e.target.value)
    const errorMsg = errorCode
      ? this.props.intl.formatMessage((messages as any)[errorCode])
      : ''

    this.setState({ emailError: errorMsg })
  }

  handlePasswordChange = (value: string) => {
    this.setState({ password: value })
  }

  validatePasswordInput = (e: any) => {
    const errorCode = validatePassword(e.target.value)
    const errorMsg = errorCode
      ? this.props.intl.formatMessage((messages as any)[errorCode])
      : ''

    this.setState({ passwordError: errorMsg })
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = this.state
    const { formatMessage } = this.props.intl
    const emailLength = email.length
    const passwordLength = password.length

    if (!emailLength || !passwordLength) {
      this.setState({
        emailError: emailLength
          ? this.state.emailError
          : formatMessage(messages.emailEmpty),
        passwordError: passwordLength
          ? this.state.passwordError
          : formatMessage(messages.passwordEmpty)
      })
      return false
    }

    let form = { data: { email, password } }
    this.props.onSubmit(form)
  }

  render() {
    const { email, password, emailError, passwordError } = this.state
    const { isLoading, onAlreadyRegisteredClick } = this.props
    const { formatMessage } = this.props.intl

    return (
      <form onSubmit={this.handleFormSubmit}>
        <EmailInput
          label={formatMessage(messages.email)}
          value={email}
          error={emailError}
          onChange={this.handleEmailChange}
          validate={this.validateEmailInput}
        />
        <PasswordInput
          label={formatMessage(messages.password)}
          value={password}
          error={passwordError}
          onChange={this.handlePasswordChange}
          validate={this.validatePasswordInput}
        />
        <div style={{ marginBottom: '1em' }}>
          <a onClick={onAlreadyRegisteredClick}>
            {formatMessage(messages.alreadyRegistered)}
          </a>
        </div>
        <Button
          type="submit"
          style={{ width: '100%' }}
          disabled={!!(passwordError || emailError) || isLoading}
        >
          {isLoading
            ? formatMessage(messages.pleaseWait)
            : formatMessage(messages.registerButton)}
        </Button>
      </form>
    )
  }
}

export default injectIntl(SignUp)
