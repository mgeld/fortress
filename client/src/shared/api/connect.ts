import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TConnectAPI } from "../../../../common-types/socket/client-to-server"

export const connectAPI = (
    userId: number,
    position: TLatLng,
) => {
    console.log('connectUser userId', userId)
    const data: TConnectAPI = {
        event: 'connect',
        payload: {
            position,
            userId
        }
    }
    WS.sendData(data)
}
