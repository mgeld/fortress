import { WS } from "processes/socket"
import { TJoystickDirection, TLatLng } from "shared/types"
import { THitPointer } from '@ctypes/model'
import { TBattleFireAPI } from "@ctypes/socket/client-to-server"

export const battleFireAPI = (
    position: TLatLng,
    direction: TJoystickDirection | null,
    userId: number,
    
    hitPointer: THitPointer,
    weapon: string
) => {
    const data: TBattleFireAPI = {
        event: 'battleFire',
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