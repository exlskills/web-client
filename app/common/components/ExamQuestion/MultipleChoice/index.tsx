import { Checkbox, Radio } from '@blueprintjs/core'
import { isEqual, uniqueId } from 'lodash'
import * as React from 'react'
let Markdown = require('react-remarkable')

import { OptionWrapper, Wrapper } from './styledComponents'

// TODO: This could be replaced with IOptionProps from `@blueprintjs/core`
export type MultiOptionProps = {
  text: string
  value: string
  disabled?: boolean
}

// TODO: Consider to use string[] only to simplize code
export type MultiAnswerProps = string | string[]

interface IProps {
  options: MultiOptionProps[]
  selectedOptions?: MultiAnswerProps
  correctOptions?: MultiAnswerProps
  showResults?: boolean
  multiSelection?: boolean
  onChange?: (selected: MultiAnswerProps) => void
}

class MultipleChoice extends React.Component<IProps, {}> {
  private autoRadioName = uniqueId('MultipleChoice.Radio-')

  handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.value
    const selectedOptions = (this.props.selectedOptions as string[]) || []
    let newSelectionArray

    if (selectedOptions.indexOf(newSelection) > -1) {
      newSelectionArray = selectedOptions.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...selectedOptions, newSelection]
    }

    if (this.props.onChange) {
      this.props.onChange(newSelectionArray)
    }
  }

  handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  getOptionElement() {
    return this.props.multiSelection ? Checkbox : Radio
  }

  getOptionProps(option: MultiOptionProps) {
    const selectedOptions = this.getSelectedOptions()

    if (this.props.multiSelection) {
      return {
        // label: option.text,
        value: option.value,
        checked: selectedOptions.indexOf(option.value) != -1,
        onChange: this.handleCheckboxChange
      }
    } else {
      return {
        // label: option.text,
        value: option.value,
        checked: option.value === selectedOptions,
        // disabled: disabled || this.props.disabled,
        name: this.autoRadioName,
        onChange: this.handleRadioChange
      }
    }
  }

  getSelectedOptions() {
    const { multiSelection, selectedOptions } = this.props

    return multiSelection
      ? (selectedOptions as string[]) || []
      : (selectedOptions as string) || ''
  }

  getCorrectOptions() {
    const { multiSelection, correctOptions } = this.props

    return multiSelection
      ? (correctOptions as string[]) || []
      : (correctOptions as string) || ''
  }

  isOptionChecked(item: MultiOptionProps) {
    const { multiSelection } = this.props
    const selectedOptions = this.getSelectedOptions()

    return multiSelection
      ? selectedOptions.indexOf(item.value) != -1
      : selectedOptions == item.value
  }

  isAnswerCorrect() {
    const { multiSelection } = this.props
    const selectedOptions = this.getSelectedOptions()
    const correctOptions = this.getCorrectOptions()

    return multiSelection
      ? isEqual(
          (selectedOptions as string[]).sort(),
          (correctOptions as string[]).sort()
        )
      : selectedOptions == correctOptions
  }

  render() {
    const { options, showResults } = this.props

    return (
      <Wrapper>
        {options.map(item =>
          <OptionWrapper
            key={`check_${item.value}`}
            correct={
              this.isOptionChecked(item) && showResults
                ? this.isAnswerCorrect()
                : null
            }
          >
            {React.createElement(
              this.getOptionElement(),
              this.getOptionProps(item),
              <Markdown options={{ html: true }} source={item.text || ''} />
            )}
          </OptionWrapper>
        )}
      </Wrapper>
    )
  }
}

export default MultipleChoice
