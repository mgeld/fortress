import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TBattleDirectAPI } from "../../../../common-types/socket/client-to-server"

export const battleDirectAPI = (
    position: TLatLng,
    userId: number,
) => {
    console.log('?????? battleDirectAPI')
    const data: TBattleDirectAPI = {
        event: 'battleDirect',
        payload: {
            position,
            userId,
        }
    }
    WS.sendData(data)
}