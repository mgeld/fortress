import { WS } from "processes/socket"
import { TLatLng } from "shared/types"
import { TFireAPI } from "../../../../common-types/socket/client-to-server"
import { THitPointer } from '@ctypes/model'

export const fireAPI = (
    pos: TLatLng,
    toPos: TLatLng,
    direction: number,
    hitPointer: THitPointer,
) => {
    const data: TFireAPI = {
        event: 'fire',
        payload: {
            pos,
            to_pos: toPos,
            direction
        }
    }
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer
    }
    
    WS.sendData(data)
}