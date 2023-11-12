import { WS } from "processes/socket"
import { TGameUnit } from "@ctypes/model"
import { TLevelUpAPI } from "@ctypes/socket/client-to-server"

export const levelUpAPI = (
    type: TGameUnit
) => {

    const data: TLevelUpAPI = {
        event: 'levelUp',
        payload: {
            type
        }
    }
    WS.sendData(data)

}