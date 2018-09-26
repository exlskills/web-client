import { Checkbox, Radio } from '@blueprintjs/core'
import { isEqual, uniqueId } from 'lodash'
import * as React from 'react'
const Markdown = require('react-remarkable')
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'
import { OptionWrapper, Wrapper } from './styledComponents'
import { shuffle } from '../../../utils/shuffle'

// TODO: This could be replaced with IOptionProps from `@blueprintjs/core`
export type MultiOptionProps = {
  text: string
  value: string
  disabled?: boolean
}

export type QuestionResponseData = {
  selected_ids?: string[]
  user_files?: string
}

interface IProps {
  options: MultiOptionProps[]
  selectedOptions?: QuestionResponseData
  correctOptions?: QuestionResponseData
  showResults?: boolean
  multiSelection?: boolean
  onChange?: (selected: QuestionResponseData) => void
}

interface IStates {}

class MultipleChoice extends React.Component<IProps, IStates> {
  state: IStates = {}

  private autoRadioName = uniqueId('MultipleChoice.Radio-')

  handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.value
    const selectedOptions =
      (this.props.selectedOptions.selected_ids as string[]) || []
    let newSelectionArray: string[]

    if (selectedOptions.indexOf(newSelection) > -1) {
      newSelectionArray = selectedOptions.filter(
        s => s !== newSelection
      ) as string[]
    } else {
      newSelectionArray = [...selectedOptions, newSelection] as string[]
    }

    if (this.props.onChange) {
      this.props.onChange({ selected_ids: newSelectionArray })
    }
  }

  handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange({ selected_ids: [e.target.value] })
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
        checked: selectedOptions.indexOf(option.value) != -1,
        // disabled: disabled || this.props.disabled,
        name: this.autoRadioName,
        onChange: this.handleRadioChange
      }
    }
  }

  getSelectedOptions() {
    return (this.props.selectedOptions.selected_ids as string[]) || []
  }

  getCorrectOptions() {
    return (this.props.correctOptions.selected_ids as string[]) || []
  }

  isOptionChecked(item: MultiOptionProps) {
    const selectedOptions = this.getSelectedOptions()
    return selectedOptions.indexOf(item.value) != -1
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
              <MarkdownStyleWrapper>
                <Markdown options={{ html: true }} source={item.text || ''} />
              </MarkdownStyleWrapper>
            )}
          </OptionWrapper>
        )}
      </Wrapper>
    )
  }
}

export default MultipleChoice
