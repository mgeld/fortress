"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
class Socket {
    constructor(url, setStatus) {
        this.socket = null;
        this.socketStatus = 'close';
        this.url = url;
        this.setStatus = setStatus;
        this.connect();
    }
    connect() {
        console.log('connect');
        this.socket = new WebSocket(this.url);
        this.socketListener();
    }
    socketListener() {
        console.log('socketListener', this.socket);
        if (!this.socket)
            return;
        this.socket.onopen = () => {
            console.log('onopen');
            this.socketStatus = 'open';
            this.setStatus('open');
        };
        this.socket.onclose = () => {
            console.log('onclose');
            this.setStatus('close');
            setTimeout(() => this.connect(), 1500);
        };
    }
    getSocketStatus() {
        return this.socketStatus;
    }
    sendData(params) {
        console.log('sendData this.url', this.url);
        if (!this.socket)
            return;
        this.socket.send(JSON.stringify(params));
    }
    setHandlers(callback) {
        console.log('setHandlers callback', callback);
        if (!this.socket)
            return;
        this.socket.onmessage = callback;
    }
}
exports.Socket = Socket;
