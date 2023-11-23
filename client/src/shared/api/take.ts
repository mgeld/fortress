import { TTakeAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const takeAPI = (
    fort: TLatLng,
    sector: string,
) => {
    
    const data: TTakeAPI = {
        event: 'take',
        payload: {
            fort,
            sector,
        }
    }

    WS.sendData(data)
}