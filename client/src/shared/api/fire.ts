import { THitPointer } from "features/control-fire/model"
import { WS } from "processes/socket"
import { TJoystickDirection, TLatLng } from "shared/types"
import { TFireAPI } from "./types/send"

export const fire = (
    position: TLatLng,
    direction: TJoystickDirection | null,
    userId: number,
    hitPointer: THitPointer
) => {
    
    console.log('fire userId', userId)
    const data: TFireAPI = {
        event: 'fire',
        payload: {
            position,
            direction,
            userId
        }
    }
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer
    }
    WS.sendData(data)
}