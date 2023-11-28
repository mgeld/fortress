import { TBattleDirectAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"
import { TLatLng } from "shared/types"

export const battleDirectAPI = (
    position: TLatLng,
) => {
    const data: TBattleDirectAPI = {
        event: 'battleDirect',
        payload: {
            position,
        }
    }
    WS.sendData(data)
}