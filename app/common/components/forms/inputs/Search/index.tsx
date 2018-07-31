import FormGroup, {
  FormGroupProps
} from 'common/components/forms/inputs/FormGroup'
import { Icon } from 'common/components/styledComponents'
import { uniqueId } from 'lodash'
import * as React from 'react'

export type InputProps = IProps & React.HTMLProps<HTMLInputElement>

export interface IProps extends FormGroupProps {
  onSearchSubmit?: (value: string) => void
  groupStyle?: any
}

class Search extends React.Component<InputProps, void> {
  static defaultProps = {
    type: 'search',
    error: '',
    inline: false,
    required: false,
    groupStyle: {}
  }

  private _inputId = uniqueId('form-input-')

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode == 13 && this.props.onSearchSubmit) {
      this.props.onSearchSubmit(e.currentTarget.value)
    }
  }

  render() {
    const {
      label,
      error,
      inline,
      disabled,
      required,
      helpText,
      onSearchSubmit,
      labelFor,
      groupStyle,
      ...inputProps
    } = this.props

    return (
      <FormGroup
        style={groupStyle}
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
          <Icon iconName="search" />
          <input
            id={this._inputId}
            className="pt-input"
            dir="auto"
            disabled={disabled}
            onKeyPress={this.handleKeyPress}
            {...inputProps}
          />
        </div>
      </FormGroup>
    )
  }
}

export default Search
