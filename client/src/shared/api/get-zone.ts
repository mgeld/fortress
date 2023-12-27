import { TGetZoneAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"

export const getZoneAPI = (id: number) => {
    const data: TGetZoneAPI = {
        event: 'getZone',
        payload: {
            id
        }
    }
    WS.sendData(data)
}