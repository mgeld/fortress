import { WS } from "processes/socket"
import { TJoystickDirection, TLatLng } from "shared/types"
import { TFireAPI } from "../../../../common-types/socket/client-to-server"
import { THitPointer } from '@ctypes/model'

export const fireAPI = (
    pos: TLatLng,
    toPos: TLatLng,
    direction: TJoystickDirection | null,
    // userId: number,
    
    hitPointer: THitPointer,
    // weapon: string
) => {
    const data: TFireAPI = {
        event: 'fire',
        payload: {
            pos,
            to_pos: toPos,
            direction,
            // userId,
            // weapon
        }
    }
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer
    }
    
    WS.sendData(data)
}