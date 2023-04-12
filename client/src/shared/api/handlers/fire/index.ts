import { firesAPI } from "shared/api/events";
import { fromToDirectionPos } from "shared/lib/fromToDirectionPos";
import { Handler } from "..";
import { TFire } from "../../types/messages";

class FireHandler extends Handler {

    handle(message: TFire) {

        console.log('FireHandler handle')

        const FIRE_ID: number = Date.now()
        const FIRE_DISTANCE = 300

        const from_pos = message.payload.position
        const hit_pos = message.payload.hitPointer?.pos
        const direction = message.payload.direction

        firesAPI.events.addFire({
            id: FIRE_ID,
            from_pos,
            to_pos: fromToDirectionPos(from_pos, direction, FIRE_DISTANCE),
            hit_pos,
            direction
        })

        setTimeout(() => {
            firesAPI.events.delFireById({ fire_id: FIRE_ID })
        }, 500)
    }
}

FireHandler.EVENT = 'fire'

export {
    FireHandler
}