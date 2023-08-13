import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TTakeAPI } from "../../../../common-types/socket/client-to-server"

export const takeAPI = (
    position: TLatLng,
    fort: TLatLng,
    sector: string,
    userId: number,
) => {
    const data: TTakeAPI = {
        event: 'take',
        payload: {
            position,
            fort,
            sector,
            userId,
        }
    }
    
    WS.sendData(data)
}