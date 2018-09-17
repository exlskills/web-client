import FormGroup, {
  FormGroupProps
} from 'common/components/forms/inputs/FormGroup'
import { Icon } from 'common/components/styledComponents'
import { debounceHandler } from 'common/utils/forms'
import { uniqueId } from 'lodash'
import * as React from 'react'

export type InputProps = IProps & React.HTMLProps<HTMLInputElement>

export interface IProps extends FormGroupProps {
  onValueChange?: (
    newVal: string,
    oldVal?: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => void
  validate?: (e: React.ChangeEvent<HTMLInputElement>) => void
  iconLeft?: React.ReactNode | string
  iconRight?: React.ReactNode | string
  textarea?: boolean
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    type: 'text',
    error: '',
    inline: false,
    required: false,
    textarea: false
  }

  private _inputId = uniqueId('form-input-')

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(e.target.value, this.props.value as string, e)
    }
    if (this.props.validate) {
      debounceHandler(this.props.validate)(e)
    }
  }

  render() {
    const {
      label,
      error,
      iconLeft,
      iconRight,
      inline,
      disabled,
      required,
      textarea,
      helpText,
      onChange,
      onValueChange,
      validate,
      ...inputProps
    } = this.props

    return (
      <FormGroup
        error={error}
        inline={inline}
        disabled={disabled}
        required={required}
        label={label}
        labelFor={this._inputId}
        helpText={helpText}
      >
        <div
          className={`pt-input-group ${error
            ? 'pt-intent-danger'
            : ''} ${disabled ? 'pt-disabled' : ''}`}
        >
          {React.isValidElement(iconLeft)
            ? iconLeft
            : iconLeft && <Icon iconName={iconLeft as string} />}
          {React.createElement(textarea ? 'textarea' : 'input', {
            id: this._inputId,
            className: 'pt-input',
            onChange: this.handleOnChange,
            dir: 'auto',
            disabled: disabled,
            ...inputProps
          })}
          {React.isValidElement(iconRight)
            ? iconRight
            : iconRight && <Icon iconName={iconRight as string} />}
        </div>
      </FormGroup>
    )
  }
}

export default Input
