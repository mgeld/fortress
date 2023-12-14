"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
class Socket {
    constructor(url, setStatus) {
        this.socket = null;
        this.timeOutId = null;
        this.callback = null;
        this.url = url;
        this.setStatus = setStatus;
        Socket._instance = this;
    }
    static create(url, setStatus) {
        if (Socket._instance) {
            return Socket._instance;
        }
        return new Socket(url, setStatus);
    }
    connect() {
        console.log('Socket connect');
        this.socket = new WebSocket(this.url);
        this.socketListener();
    }
    destroy() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
    }
    socketListener() {
        const context = this;
        if (!this.socket) {
            return;
        }
        this.socket.onopen = () => {
            console.log('socketListener onopen');
            this.setStatus('open');
            if (context === null || context === void 0 ? void 0 : context.socket)
                context.socket.onmessage = this.callback;
        };
        this.socket.onclose = (e) => {
            console.log('onclose e.code', e.code);
            console.log('onclose e.code', e.reason);
            this.setStatus('close');
        };
        this.socket.onerror = () => {
            console.log('Socket Error');
        };
    }
    sendData(params) {
        if (!this.socket)
            return;
        this.socket.send(JSON.stringify(params));
    }
    setHandlers(callback) {
        this.callback = callback;
    }
}
exports.Socket = Socket;
