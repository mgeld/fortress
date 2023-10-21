import { TGetUserAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"

export const getUserAPI = (
    userId: number
) => {
    const data: TGetUserAPI = {
        event: 'getUser',
        payload: {
            userId
        }
    }
    WS.sendData(data)
}