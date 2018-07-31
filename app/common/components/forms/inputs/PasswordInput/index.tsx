import Input from 'common/components/forms/inputs/Input'
import * as React from 'react'

interface IProps {
  value: string
  onChange: (value: string) => void
  name?: string
  label?: string
  validate?: (e: any) => void
  error?: string
  showToggle?: boolean
}

interface IStates {
  visible: boolean
}

class PasswordInput extends React.Component<IProps, IStates> {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps: Partial<IProps> = {
    name: 'password',
    showToggle: true
  }

  state = {
    visible: false
  }

  togglePasswordVisibility = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  renderToggleIcon = () => {
    return (
      <span
        className={`pt-icon ${this.state.visible
          ? 'pt-icon-eye-off'
          : 'pt-icon-eye-open'}`}
        onClick={this.togglePasswordVisibility}
      />
    )
  }

  render() {
    const {
      label,
      value,
      error,
      validate,
      showToggle,
      name,
      onChange
    } = this.props

    return (
      <Input
        label={label}
        value={value}
        error={error}
        onValueChange={onChange}
        validate={validate}
        name={name}
        iconRight={showToggle && this.renderToggleIcon()}
        type={this.state.visible ? 'text' : 'password'}
      />
    )
  }
}

export default PasswordInput
