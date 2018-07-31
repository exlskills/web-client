import * as React from 'react'

import {
  ErrorWrapper,
  GroupWrapper,
  InputWrapper,
  LabelWrapper
} from './styledComponents'

export interface FormGroupProps {
  error?: string
  helpText?: string
  inline?: boolean
  label?: string
  labelFor?: string
  disabled?: boolean
  required?: boolean
  style?: any
}

class FormGroup extends React.PureComponent<FormGroupProps, any> {
  render() {
    const {
      disabled,
      error,
      inline,
      label,
      labelFor,
      required,
      helpText,
      style
    } = this.props

    return (
      <GroupWrapper
        style={style}
        error={error}
        inline={inline}
        disabled={disabled}
      >
        {label &&
          <LabelWrapper labelFor={labelFor} required={required}>
            {label}
          </LabelWrapper>}
        <InputWrapper>
          {this.props.children}
          {(error || helpText) &&
            <ErrorWrapper>
              {error || helpText}
            </ErrorWrapper>}
        </InputWrapper>
      </GroupWrapper>
    )
  }
}

export default FormGroup
