import { Server, WebSocket } from "ws";
import { IWebSocket } from "../../api/socket/server";
import { TMessage } from "../../common-types/socket/server-to-client";

class Broadcast {

    constructor(private wss: Server<WebSocket>) {}

    message(
        message: TMessage,
        ws?: IWebSocket
    ) {
        this.wss.clients.forEach(client => {
            if (client === ws) return
            client.send(JSON.stringify(message));
        })
    }
    
}

export {
    Broadcast
}