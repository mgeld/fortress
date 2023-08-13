import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TConnectAPI } from "../../../../common-types/socket/client-to-server"

export const connectAPI = (
    userId: number,
    name: string,
    position: TLatLng,
) => {
    console.log('connectUser userId', userId)
    const data: TConnectAPI = {
        event: 'connect',
        payload: {
            position,
            name,
            userId
        }
    }
    WS.sendData(data)
}
