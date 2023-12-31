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
        this.connect();
    }
    static create(url, setStatus) {
        if (Socket._instance) {
            return Socket._instance;
        }
        return new Socket(url, setStatus);
    }
    connect() {
        console.log('Socket connect new WebSocket');
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
            this.setStatus('open');
            if (context === null || context === void 0 ? void 0 : context.socket)
                context.socket.onmessage = this.callback;
        };
        this.socket.onclose = (e) => {
            this.setStatus('close');
        };
        this.socket.onerror = () => {
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
