"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handlers = exports.Handler = void 0;
class Handler {
}
exports.Handler = Handler;
class Handlers {
    constructor(handlers) {
        this.handlers = handlers;
    }
    handle() {
        return (message) => {
            const _message = JSON.parse(message.data);
            if (!this.handlers[_message.event]) {
                throw new Error('1 Передан несуществующий обработчик');
            }
            this.handlers[_message.event].handle(_message);
        };
    }
}
exports.Handlers = Handlers;
