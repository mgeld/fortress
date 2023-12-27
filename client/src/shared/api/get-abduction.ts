import { WS } from "processes/socket"
import { TGetAbductionAPI } from "../../../../common-types/socket/client-to-server"

export const getAbductionAPI = (
    zone_id: number,
    page: number
) => {

    const data: TGetAbductionAPI = {
        event: 'getAbduction',
        payload: {
            zone_id,
            page,
        }
    }
    
    WS.sendData(data)
}