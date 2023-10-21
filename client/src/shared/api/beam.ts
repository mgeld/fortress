import { TBeamAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const beamAPI = (
    position: TLatLng,
    fort: TLatLng,
    sector: string,
    userId: number,
) => {
    
    const data: TBeamAPI = {
        event: 'beam',
        payload: {
            position,
            fort,
            sector,
            userId,
        }
    }

    WS.sendData(data)
}