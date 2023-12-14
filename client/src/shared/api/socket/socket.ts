import { Event } from "effector"
import { TSendEvent } from "../../../../../common-types/socket/client-to-server"
import { TSocketStatus } from "./model"

export class Socket {

    private static _instance: Socket;

    socket: WebSocket | null = null

    url: string

    setStatus: Event<TSocketStatus>

    timeOutId: ReturnType<typeof setTimeout> | null = null

    callback: ((message: MessageEvent<any>) => void) | null = null

    private constructor(
        url: string,
        setStatus: Event<TSocketStatus>
    ) {
        this.url = url
        this.setStatus = setStatus

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

    connect() {
        // if (!this.url) return
        console.log('Socket connect')
        this.socket = new WebSocket(this.url)
        this.socketListener()
    }

    destroy() {
        this.socket?.close()
        // if (this.timeOutId)
        //     clearTimeout(this.timeOutId)
    }

    socketListener() {

        const context = this

        if (!this.socket) {
            return
        }
        // this.socket.close()

        this.socket.onopen = () => {
            console.log('socketListener onopen')
            this.setStatus('open')

            if (context?.socket)
                context.socket.onmessage = this.callback
        }
        this.socket.onclose = (e) => {
            console.log('onclose e.code', e.code)
            console.log('onclose e.code', e.reason)
            this.setStatus('close')
            // this.timeOutId = setTimeout(() => this.connect(this.url), 1500)
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
        // if (!this.socket) return
        this.callback = callback
    }

}