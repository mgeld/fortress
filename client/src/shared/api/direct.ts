import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TDirectAPI } from "./types/send"

export const direct = (
    position: TLatLng,
    userId: number,
) => {
    console.log('direct userId', userId)

    const data: TDirectAPI = {
        event: 'direct',
        payload: {
            position,
            userId,
        }
    }
    WS.sendData(data)
}