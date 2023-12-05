import { TGetRatingAPI } from "@ctypes/socket/client-to-server"
import { WS } from "processes/socket"

export const getRatingAPI = () => {
    const data: TGetRatingAPI = {
        event: 'getRating',
        payload: {}
    }
    WS.sendData(data)
}