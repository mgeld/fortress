import { WS } from "processes/socket"
import { TGetUserAPI } from "../../../../common-types/socket/client-to-server"

export const getUserAPI = (
    userId: number
) => {
    console.log('getUserAPI userId', userId)
    const data: TGetUserAPI = {
        event: 'getUser',
        payload: {
            userId
        }
    }
    WS.sendData(data)
}