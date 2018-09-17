import { Button, Intent } from '@blueprintjs/core'
import FormGroup, {
  FormGroupProps
} from 'common/components/forms/inputs/FormGroup'
import { Wrapper } from 'common/components/styledComponents'
import { uniqueId } from 'lodash'
import * as React from 'react'
import { SelectOptions } from 'typings/client'
import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'

interface IProps extends FormGroupProps {
  options: SelectOptions
  onValueChange: (
    newVal: string,
    oldVal?: string,
    e?: React.ChangeEvent<HTMLSelectElement>
  ) => void
  validate?: (newVal: string, oldVal: string) => void
  placeholder?: string
  name?: string
  value?: string
  emptyValue?: string
  rightButtonText?: string // Gotcha: prefixed with button would not populated into the props
  onRightButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  rightButton?: React.ReactNode
}

export type SelectProps = IProps // & React.HTMLProps<HTMLSelectElement>

export default class Select extends React.Component<SelectProps> {
  static defaultProps: Partial<IProps> = {
    emptyValue: ''
  }

  private _inputId: string

  constructor(props: SelectProps) {
    super(props)
    this._inputId = uniqueId('form-input-')
  }

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onValueChange(e.target.value, this.props.value, e)
    if (this.props.validate) {
      this.props.validate(e.target.value, this.props.value)
    }
  }

  renderSelect() {
    const {
      children,
      // formgroup props
      error,
      helpText,
      inline,
      label,
      labelFor,
      required,
      // controled props
      disabled,
      options,
      onValueChange,
      validate,
      placeholder,
      value,
      emptyValue,
      rightButton,
      rightButtonText,
      onRightButtonClick,
      ...selectProps
    } = this.props

    return (
      <Wrapper className="pt-select pt-fill">
        <select
          id={this._inputId}
          onChange={this.handleChange}
          value={value ? value : undefined}
          disabled={disabled}
          {...selectProps}
        >
          {placeholder &&
            <option value={emptyValue}>
              {placeholder}
            </option>}
          {options.map(({ name, value }) =>
            <option key={value} value={value}>
              {name}
            </option>
          )}
        </select>
      </Wrapper>
    )
  }

  renderControlGroup() {
    const { rightButton, rightButtonText, onRightButtonClick } = this.props

    if (rightButton) {
      return (
        <Flex>
          <Box flex={1} style={{ marginRight: '10px' }}>
            {this.renderSelect()}
          </Box>
          {rightButton}
        </Flex>
      )
    }

    if (rightButtonText) {
      return (
        <div className="pt-control-group">
          {this.renderSelect()}
          <Button
            intent={Intent.PRIMARY}
            text={rightButtonText}
            onClick={onRightButtonClick}
          />
        </div>
      )
    }
    return this.renderSelect()
  }

  render() {
    const {
      error,
      helpText,
      inline,
      label,
      labelFor,
      disabled,
      required
    } = this.props

    return (
      <FormGroup
        inline={inline}
        label={label}
        labelFor={this._inputId}
        error={error}
        required={required}
        helpText={helpText}
        disabled={disabled}
      >
        {this.renderControlGroup()}
      </FormGroup>
    )
  }
}
