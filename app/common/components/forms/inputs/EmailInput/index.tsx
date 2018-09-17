import Input from 'common/components/forms/inputs/Input'
import * as React from 'react'

interface IProps {
  value: string
  onChange: (value: string) => void
  name?: string
  label?: string
  validate?: (e: any) => void
  error?: string
  placeholder?: string
}

class EmailInput extends React.Component<IProps> {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps: Partial<IProps> = {
    name: 'email'
  }

  render() {
    const { label, value, error, validate, placeholder, onChange } = this.props

    return (
      <Input
        label={label}
        placeholder={placeholder}
        name={name}
        value={value}
        error={error}
        onValueChange={onChange}
        validate={validate}
        type="email"
      />
    )
  }
}

export default EmailInput
