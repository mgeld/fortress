"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broadcast = void 0;
class Broadcast {
    constructor(wss) {
        this.wss = wss;
    }
    message(message, ws) {
        this.wss.clients.forEach(client => {
            if (client === ws)
                return;
            client.send(JSON.stringify(message));
        });
    }
}
exports.Broadcast = Broadcast;
