import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TGetSectorsAPI } from "../../../../common-types/socket/client-to-server"

export const getSectorsAPI = (
    position: TLatLng,
    userId: number
) => {
    const data: TGetSectorsAPI = {
        event: 'getSectors',
        payload: {
            position,
            userId,
        }
    }
    
    WS.sendData(data)
}