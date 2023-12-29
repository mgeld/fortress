import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TGetSectorsAPI } from "../../../../common-types/socket/client-to-server"

export const getSectorsAPI = (
    position: TLatLng,
) => {
    const data: TGetSectorsAPI = {
        event: 'getSectors',
        payload: {
            position,
        }
    }
    
    WS.sendData(data)
}