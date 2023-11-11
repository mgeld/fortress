import { TBattleDirectAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const battleDirectAPI = (
    position: TLatLng,
    // userId: number,
) => {
    const data: TBattleDirectAPI = {
        event: 'battleDirect',
        payload: {
            position,
            // userId,
        }
    }
    WS.sendData(data)
}