import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { THitPointer } from '@ctypes/model'
import { TBattleFireAPI } from "@ctypes/socket/client-to-server"

export const battleFireAPI = (
    pos: TLatLng,
    to_pos: TLatLng,
    direction: number,
    hitPointer: THitPointer,
) => {
    const data: TBattleFireAPI = {
        event: 'battleFire',
        payload: {
            pos,
            to_pos,
            direction
        }
    }
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer
    }
    
    WS.sendData(data)
}