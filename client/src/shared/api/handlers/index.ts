import { TEventsMessage, TMessage } from "../types/messages"

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

        console.log('Handlers constructor', handlers)
        this.handlers = handlers
    }

    handle() {
        return (message: MessageEvent<any>) => {
            const _message = JSON.parse(message.data) as TMessage

            console.log('Handlers handle message-', _message)
            console.log('this.handlers[_message.event]', this.handlers)

            if (!this.handlers[_message.event]) {
                throw new Error('Передан несуществующий обработчик')
            }
            this.handlers[_message.event].handle(_message)
        }
    }
}