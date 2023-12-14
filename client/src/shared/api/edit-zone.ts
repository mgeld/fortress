import { TZoneColor } from "@ctypes/model"
import { TEditZoneAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"

export const editZoneAPI = (
    icon: string,
    name: string,
    description: string,
    color: TZoneColor,
    hash: string
) => {
    const data: TEditZoneAPI = {
        event: 'editZone',
        payload: {
            icon,
            name,
            description,
            color,
            hash
        }
    }
    WS.sendData(data)
}