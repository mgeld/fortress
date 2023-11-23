import { TConnectAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const connectAPI = (
    url: string,
    name: string,
    icon: string,
    position: TLatLng,
) => {
    const data: TConnectAPI = {
        event: 'connect',
        payload: {
            url,
            name,
            icon,
            position,
        }
    }
    WS.sendData(data)
}