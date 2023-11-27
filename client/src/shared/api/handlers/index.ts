import { TEventsMessage, TMessage } from '@ctypes/socket/server-to-client'

export type THandlers = {
    [key in TEventsMessage]: Handler
}

export abstract class Handler {
    static EVENT: TEventsMessage
    abstract handle(message: TMessage): void
}

export class Handlers {
    public handlers: THandlers

    constructor(handlers: THandlers) {

        // console.log('Handlers constructor', handlers)
        this.handlers = handlers
    }

    handle() {
        return (message: MessageEvent<any>) => {
            const _message = JSON.parse(message.data) as TMessage

            if (!this.handlers[_message.event]) {
                throw new Error('1 Передан несуществующий обработчик')
            }
            this.handlers[_message.event].handle(_message)
        }
    }
}