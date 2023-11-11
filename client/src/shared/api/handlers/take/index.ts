import { takesAPI } from "shared/api/events";
import { Handler } from "..";
import { TTake } from '@ctypes/socket/server-to-client'

class TakeHandler extends Handler {

    handle(message: TTake) {

        const TAKE_ID: number = Date.now()

        const from_pos = message.payload.position

        const to_pos = message.payload.fort

        // const weapon = determinantWeapon(weaponSymbolLevel.symbol, weaponSymbolLevel.level)

        console.log('TakeHandler addTake')

        takesAPI.events.addTake({
            id: TAKE_ID,
            from_pos,
            to_pos
        })

        setTimeout(() => {
            takesAPI.events.delTakeById({ take_id: TAKE_ID })
        }, 2000)
    }
}

TakeHandler.EVENT = 'take'

export {
    TakeHandler
}