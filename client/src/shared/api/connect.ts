import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TConnectUserAPI } from "./types/send"

export const connectUser = (
    userId: number,
    position: TLatLng,
    health: number
) => {

    console.log('connectUser userId', userId)
    const data: TConnectUserAPI = {
        event: 'connect',
        payload: {
            position,
            health,
            userId
        }
    }
    WS.sendData(data)
}
