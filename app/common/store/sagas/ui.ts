import { Toaster } from '@blueprintjs/core'
import { SagaIterator } from 'redux-saga'

const toaster = Toaster.create()

export function* showToasts(action: any): SagaIterator {
  toaster.show({
    message: action.payload.message,
    intent: action.payload.intent
  })
  yield null
}
