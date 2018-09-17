import * as React from 'react'
import { InputGroup, Intent } from '@blueprintjs/core'

interface IProps {
  value: string
  onChange: (e: any) => void
  error?: boolean
}

export default class EmailInput extends React.Component<IProps> {
  static defaultProps = {
    error: false
  }

  render() {
    const { onChange, error, value } = this.props

    return (
      <InputGroup
        onChange={onChange}
        value={value}
        className="pt-large"
        placeholder="Email"
      />
    )
  }
}
