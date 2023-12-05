import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TGetSatelliteAPI } from "../../../../common-types/socket/client-to-server"

export const getSatelliteAPI = (
    position: TLatLng,
    zoneId: number
) => {

    const data: TGetSatelliteAPI = {
        event: 'getSatellite',
        payload: {
            position,
            zoneId,
        }
    }
    
    WS.sendData(data)
}