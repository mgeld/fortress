import { WS } from "processes/socket"
import { TExtrTypes } from "@ctypes/model"
import { TBuyUnitAPI } from "@ctypes/socket/client-to-server"

export const buyUnitAPI = (
    id: TExtrTypes
) => {
    
    const data: TBuyUnitAPI = {
        event: 'buyUnit',
        payload: {
            id,
        }
    }

    WS.sendData(data)
}