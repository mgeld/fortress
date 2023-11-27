import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TDirectAPI } from "../../../../common-types/socket/client-to-server"

export const directAPI = (
    position: TLatLng,
) => {
    const data: TDirectAPI = {
        event: 'direct',
        payload: {
            position,
        }
    }
    WS.sendData(data)
}