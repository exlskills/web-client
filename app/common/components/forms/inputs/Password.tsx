import * as React from 'react'
import { InputGroup, Intent } from '@blueprintjs/core'

interface IProps {
  togglable?: boolean
  error?: boolean
  value: string
  onChange: (e: any) => void
}

interface IState {
  showPassword: boolean
}

export default class PasswordInput extends React.Component<IProps, IState> {
  state = {
    showPassword: false
  }

  static defaultProps = {
    togglable: false
  }

  handleToggleClick = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  renderEyeToggle() {
    const { showPassword } = this.state

    return (
      <span
        className={`pt-icon ${showPassword
          ? 'pt-icon-eye-off'
          : 'pt-icon-eye-open'}`}
        onClick={this.handleToggleClick}
      />
    )
  }

  render() {
    const { error, togglable, onChange, value } = this.props
    const { showPassword } = this.state

    return (
      <InputGroup
        onChange={onChange}
        value={value}
        className="pt-large"
        type={showPassword ? 'text' : 'password'}
        leftIconName="lock"
        rightElement={togglable && this.renderEyeToggle()}
        placeholder="Password"
        intent={error && Intent.DANGER}
      />
    )
  }
}
