import { TGetSatelliteFortAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const getSatelliteFortAPI = (
    position: TLatLng,
) => {
    const data: TGetSatelliteFortAPI = {
        event: 'getSatelliteFort',
        payload: {
            position
        }
    }
    
    WS.sendData(data)
}