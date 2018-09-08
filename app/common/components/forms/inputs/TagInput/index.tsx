import FormGroup, {
  FormGroupProps
} from 'common/components/forms/inputs/FormGroup'
// import { Icon } from 'common/components/styledComponents'
// import { uniqueId } from 'lodash'
import * as React from 'react'
import { TagInput as BlueTagInput } from '@blueprintjs/labs'

export type InputProps = IProps // & React.HTMLProps<HTMLInputElement>

export interface IProps extends FormGroupProps {
  values?: string[]
  onAdd?: (values: string[]) => void
  onChange?: (values: string[]) => void
  onRemove?: (value: string) => void
}

class TagInput extends React.Component<InputProps, void> {
  static defaultProps: IProps = {
    values: [],
    error: '',
    inline: false,
    required: false
  }

  render() {
    const {
      label,
      error,
      inline,
      disabled,
      required,
      helpText,
      ...inputProps
    } = this.props

    return (
      <FormGroup
        error={error}
        inline={inline}
        disabled={disabled}
        required={required}
        label={label}
        helpText={helpText}
      >
        <BlueTagInput
          leftIconName={'tag'}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          values={this.props.values}
          onChange={this.props.onChange}
        />
      </FormGroup>
    )
  }
}

export default TagInput
