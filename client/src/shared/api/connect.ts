import { TConnectAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
// import { TLatLng } from "shared/types"

export const connectAPI = (
    url: string,
    hash?: number
) => {
    console.log('connectAPI')
    const data: TConnectAPI = {
        event: 'connect',
        payload: {
            url
        }
    }
    if(hash) data.payload.hash = hash

    WS.sendData(data)
}