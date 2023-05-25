import { Event } from "effector"
import { TSendEvent } from "../../../../../common-types/socket/client-to-server"
import { TSocketStatus } from "./model"

export class Socket {
    socket: WebSocket | null = null

    url: string

    private socketStatus: 'open' | 'close' = 'close'

    setStatus: Event<TSocketStatus>

    constructor(url: string, setStatus: Event<TSocketStatus>) {

        this.url = url
        this.setStatus = setStatus

        this.connect()
    }

    connect() {
        console.log('connect')
        this.socket = new WebSocket(this.url)
        this.socketListener()
    }

    socketListener() {

        console.log('socketListener', this.socket)

        if (!this.socket) return

        this.socket.onopen = () => {
            console.log('onopen')
            this.socketStatus = 'open'
            this.setStatus('open')
        }
        this.socket.onclose = () => {
            console.log('onclose')
            this.setStatus('close')
            setTimeout(() => this.connect(), 1500)
        }
    }

    getSocketStatus() {
        return this.socketStatus
    }

    sendData(params: TSendEvent) {
        console.log('sendData this.url', this.url)
        if (!this.socket) return
        this.socket.send(JSON.stringify(params))
    }

    setHandlers(callback: (message: MessageEvent<any>) => void) {
        console.log('setHandlers callback', callback)
        if (!this.socket) return
        this.socket.onmessage = callback
    }

}