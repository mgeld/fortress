import { firesAPI } from "shared/api/events";
// import { fromToDirectionPos } from "shared/lib/fromToDirectionPos";
import { Handler } from "..";
import { TFire } from '@ctypes/socket/server-to-client'
// import { determinantWeapon } from "entities/weapon/lib/determinant-weapon";

class FireHandler extends Handler {

    handle(message: TFire) {

        console.log('FireHandler handle')

        const FIRE_ID: number = Date.now()

        const from_pos = message.payload.pos

        // Куда попало поставляется с бэка. Бэк получает эти данные от клиента, который выстрелил
        const hit_pos = message.payload.hitPointer?.pos
        const direction = message.payload.direction
        // const weaponSymbolLevel = message.payload.weapon

        // const weapon = determinantWeapon(weaponSymbolLevel.symbol, weaponSymbolLevel.level)

        firesAPI.events.addFire({
            id: FIRE_ID,
            from_pos,
            // to_pos: fromToDirectionPos(from_pos, direction, weapon.distance),
            to_pos: message.payload.to_pos,
            hit_pos,
            direction
        })

        setTimeout(() => {

            firesAPI.events.delFireById({ fire_id: FIRE_ID })
            if (message.payload.hitPointer?.userId) {

                console.log('message.payload.hitPointer?.health', message.payload.hitPointer?.health)
                firesAPI.events.hitFireInTarget({
                    hitUserId: message.payload.hitPointer.userId,
                    health: message.payload.hitPointer?.health || 0
                })
            }

        }, 500)
    }
}

FireHandler.EVENT = 'fire'

export {
    FireHandler
}