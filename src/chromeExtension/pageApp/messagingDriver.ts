import xs, { Producer, Listener, Stream } from 'xstream'
import { stringify, parse }               from 'flatted'
import { Patch }                          from 'diffGraphs'

export interface PatchMessage {
  action: "patchGraph",
  target: "panel",
  payload: Patch
}

export type Message = PatchMessage

interface MyListener<T> extends Producer<T> {
  messageListener: (e: MessageEvent) => void,
  listener: (e: any) => void
}

export default function makeMessagingDriver(window: Window) {
  return function(sink$: Stream<Message>) {

    sink$.addListener({
      next: (message: Message) => window.postMessage({
        target: message.target,
        action: message.action,
        payload: message.payload// stringify(message.payload)
      }, '*')
    })

    let listener: Listener<any>

    let messageListener = (e: MessageEvent): void => {
      if (e.data.target == 'pageScript') {
        // listener.next(parse(e.data.payload))
        listener.next(e.data)
      }
    }

    return xs.create(<MyListener<any>>{
      start: innerListener => {
        listener = innerListener
        window.addEventListener('message', messageListener)
      },

      stop: () => {
        window.removeEventListener('message', messageListener)
      },
    });
  }
}