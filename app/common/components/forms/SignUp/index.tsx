import * as React from 'react'

import { CenteredForm } from 'common/components/forms/styledComponents'
import { Button, Intent } from '@blueprintjs/core'
import PasswordInput from 'common/components/forms/inputs/Password'
import EmailInput from 'common/components/forms/inputs/Email'
import { validatePassword, validateEmail } from 'common/utils/forms'
import { signUp, addToast } from 'common/store/actions'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IState {
  password: string
  email: string
  emailError: boolean
  passwordError: boolean
}

interface IDispatchToProps {
  signUp: typeof signUp.started
  addToast: typeof addToast
}

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      signUp: signUp.started,
      addToast
    },
    dispatch
  )
})

// TODO: delegate validation logic to inputs rather than parent form
class SignupForm extends React.Component<IDispatchToProps, IState> {
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    const { password, email } = this.state
    const passwordError = validatePassword(password)
    const emailError = validateEmail(email)
    if (password.length && email.length && !passwordError && !emailError) {
      this.props.signUp({
        email,
        password
      })
    } else {
      const { addToast } = this.props
      if (!email.length) {
        addToast({
          message: 'Please enter an email address',
          intent: Intent.WARNING
        })
        this.setState({
          emailError: true
        })
      } else if (emailError) {
        addToast({
          message: emailError,
          intent: Intent.DANGER
        })
        this.setState({
          emailError: true
        })
      } else if (!password.length) {
        addToast({
          message: 'Please enter a password',
          intent: Intent.WARNING
        })
        this.setState({
          passwordError: true
        })
      } else if (passwordError) {
        addToast({
          message: passwordError,
          intent: Intent.DANGER
        })
        this.setState({
          passwordError: true
        })
      }
    }
  }

  handleEmailChange = (e: any) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e: any) => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const { email, password, emailError, passwordError } = this.state

    return (
      <CenteredForm onSubmit={this.handleSubmit}>
        <div className="pt-control-group pt-vertical">
          <EmailInput
            value={email}
            onChange={this.handleEmailChange}
            error={emailError}
          />
          <PasswordInput
            value={password}
            togglable={true}
            onChange={this.handlePasswordChange}
            error={passwordError}
          />
          <Button
            className="pt-large"
            intent={Intent.PRIMARY}
            type="submit"
            text="Register"
          />
        </div>
      </CenteredForm>
    )
  }
}

export default connect<{}, IDispatchToProps, {}>(null, mapDispatchToProps)(
  SignupForm
)
