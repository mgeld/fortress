import { WS } from "processes/socket"
import { TJoystickDirection, TLatLng } from "shared/types"
import { TFireAPI } from "../../../../common-types/socket/client-to-server"
import { THitPointer } from '@ctypes/model'

export const fireAPI = (
    position: TLatLng,
    direction: TJoystickDirection | null,
    userId: number,
    
    hitPointer: THitPointer,
    weapon: string
) => {
    const data: TFireAPI = {
        event: 'fire',
        payload: {
            position,
            direction,
            userId,
            weapon
        }
    }
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer
    }
    
    WS.sendData(data)
}