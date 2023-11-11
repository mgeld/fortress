import { TGetUserAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"

export const getUserAPI = () => {
    const data: TGetUserAPI = {
        event: 'getUser',
        payload: {}
    }
    WS.sendData(data)
}