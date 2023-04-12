import { API_BASE_URL } from "shared/config"
import { TSendEvent } from "../types/send"

export class Socket {
    socket: WebSocket

    private socketStatus: 'open' | 'close' = 'close'

    constructor() {
        this.socket = new WebSocket(API_BASE_URL)
        this.socketStartListener()

        // this.socket.onmessage = (data) => 
    }

    socketStartListener() {
        this.socket.onopen = () => {
            this.socketStatus = 'open'
        }
        this.socket.onclose = () => {
            this.socketStatus = 'close'
        }
    }

    getSocketStatus() {
        return this.socketStatus
    }

    sendData(params: TSendEvent) {
        this.socket.send(JSON.stringify(params))
    }

    getDataHandlers(callback: (message: MessageEvent<any>) => void) {
        console.log('getDataHandlers callback', callback)
        this.socket.onmessage = callback
    }

}
