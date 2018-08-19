import { WS_USI_URL, MESSAGE_TYPES, WS_EVENTS } from './constants'

import * as ReconnectingWebSocket from 'reconnectingwebsocket'

const client = new ReconnectingWebSocket(WS_USI_URL)
const disconnectHandlers = new Map()

const addDisconnectHandler = (id: string, handler: (...args: any[]) => any) => {
  disconnectHandlers.set(id, handler)
}

const removeDisconnectHandler = (id: string) => {
  disconnectHandlers.delete(id)
}

const waitForConnection = (callback: () => void, interval: number = 500) => {
  if (client.readyState === 1) {
    callback()
  } else {
    // optional: implement backoff for interval here
    setTimeout(() => {
      waitForConnection(callback, interval)
    }, interval)
  }
}

client.onopen = () => {
  // Workaround: not sure why the WebSocket.OPEN becomes a function instead of 1
  console.log(WebSocket.OPEN)
  client.readyState = 1
}

client.onclose = () => {
  disconnectHandlers.forEach(handler => {
    handler()
  })
}

client.sendEvent = (eventType: WS_EVENTS, data: { [k: string]: any }) => {
  waitForConnection(() => {
    return client.send(
      JSON.stringify({
        type: MESSAGE_TYPES.notif,
        payload: {
          event: eventType,
          data
        }
      })
    )
  })
}

export default client
export { addDisconnectHandler, removeDisconnectHandler }
