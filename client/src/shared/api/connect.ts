import { TConnectAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const connectAPI = (
    vkUserId: number,
    name: string,
    icon: string,
    position: TLatLng,
) => {

    console.log('connectAPI vkUserId', vkUserId)
    console.log('connectAPI name', name)
    console.log('connectAPI icon', icon)
    const data: TConnectAPI = {
        event: 'connect',
        payload: {
            vkUserId,
            name,
            icon,
            position,
        }
    }
    WS.sendData(data)
}