import { Event } from "effector"
import { TSendEvent } from "../../../../../common-types/socket/client-to-server"
import { TSocketStatus } from "./model"

export class Socket {

    private static _instance: Socket;

    socket: WebSocket | null = null

    url: string

    // private socketStatus: 'open' | 'close' = 'close'

    setStatus: Event<TSocketStatus>

    private constructor(
        url: string,
        setStatus: Event<TSocketStatus>
    ) {
        this.url = url
        this.setStatus = setStatus

        this.connect(url)

        Socket._instance = this;

    }

    public static create(
        url: string,
        setStatus: Event<TSocketStatus>
    ) {
        if (Socket._instance) {
            return Socket._instance;
        }
        return new Socket(url, setStatus)
    }

    connect(url: string | null) {

        if (!url) return

        console.log('connect')
        this.socket = new WebSocket(url)
        this.socketListener()
    }

    socketListener() {

        console.log('socketListener', this.socket)

        if (!this.socket) {

            console.log('.......................................socketListener')
            return
        }


        this.socket.onopen = () => {
            console.log('onopen')
            this.setStatus('open')
        }
        this.socket.onclose = () => {
            console.log('onclose')
            this.setStatus('close')
            setTimeout(() => this.connect(this.url), 1500)
        }

        this.socket.onerror = () => {
            console.log('Socket Error')
        }

    }

    sendData(params: TSendEvent) {
        if (!this.socket) return
        this.socket.send(JSON.stringify(params))
    }

    setHandlers(callback: (message: MessageEvent<any>) => void) {
        console.log('setHandlers callback', callback)
        if (!this.socket) return
        this.socket.onmessage = callback
    }

}