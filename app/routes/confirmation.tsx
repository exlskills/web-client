import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Dialog, Button, Intent } from '@blueprintjs/core'
import ConfirmDialog from 'common/components/ConfirmDialog'
export const leaveRouteConfirmation = (message: any, callback: any) => {
  const modal = document.createElement('div')
  document.body.appendChild(modal)

  const cleanup = () => {
    ReactDOM.unmountComponentAtNode(modal)
    document.body.removeChild(modal)
  }

  const cancelNavigate = () => {
    cleanup()
    callback(false)
  }

  const continueNavigate = () => {
    cleanup()
    callback(true)
  }
  message = JSON.parse(message)

  ReactDOM.render(
    <ConfirmDialog
      onSubmit={continueNavigate}
      onCancel={cancelNavigate}
      showDialog={true}
      messageText={{
        title: message.title,
        text: message.text,
        submit: message.submit,
        cancel: message.cancel
      }}
      swapButtons={true}
    />,
    modal
  )
}
