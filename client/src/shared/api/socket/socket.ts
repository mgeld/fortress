import { Event } from "effector"
import { TSocketStatus } from "./model"
import { TSendEvent } from "@ctypes/socket/client-to-server";

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

        this.connect()
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
        console.log('Socket connect new WebSocket')
        this.socket = new WebSocket(this.url)
        this.socketListener()
    }

    
    destroy() {
        this.socket?.close()
    }

    socketListener() {

        const context = this

        if (!this.socket) {
            return
        }

        this.socket.onopen = () => {
            this.setStatus('open')

            if (context?.socket)
                context.socket.onmessage = this.callback
        }
        this.socket.onclose = (e) => {
            this.setStatus('close')
        }

        this.socket.onerror = () => {
        }

    }

    // Отправка сообщений на сервер
    sendData(params: TSendEvent) {
        if (!this.socket) return
        this.socket.send(JSON.stringify(params))
    }

    // Устанавливаем обработчики для входящих сообщений от бэка
    setHandlers(callback: (message: MessageEvent<any>) => void) {
        this.callback = callback
    }

}