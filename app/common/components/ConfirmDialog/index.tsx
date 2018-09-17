import * as React from 'react'
import { Dialog, Button, Intent } from '@blueprintjs/core'

interface IProps {
  onSubmit: () => void
  onCancel: () => void
  showDialog: boolean
  messageText: {
    title: string
    text: string
    submit: string
    cancel: string
  }
  swapButtons?: boolean
}
interface IStates {}

export default class ConfirmDialog extends React.PureComponent<
  IProps,
  IStates
> {
  render() {
    let props = this.props
    let messageText = props.messageText
    return (
      <Dialog
        className={localStorage.getItem('theme')}
        isOpen={props.showDialog}
        onClose={props.onCancel}
        title={messageText.title}
      >
        <div className="pt-dialog-body">
          {messageText.text.split('\n').map((item: any, key: any) => {
            return (
              <div key={key}>
                {item}
              </div>
            )
          })}
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button
              intent={this.props.swapButtons ? Intent.PRIMARY : Intent.NONE}
              onClick={props.onCancel}
              text={messageText.cancel}
            />
            <Button
              intent={!this.props.swapButtons ? Intent.PRIMARY : Intent.NONE}
              onClick={props.onSubmit}
              text={messageText.submit}
            />
          </div>
        </div>
      </Dialog>
    )
  }
}
